import { NextResponse } from "next/server";

type Coordinate = {
  lat: number;
  lng: number;
};

type Body = {
  points: Coordinate[];
};

export async function POST(request: Request) {
  const apiKey =
    process.env.GOOGLE_MAPS_SERVER_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_google_maps_api_key" },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const uniquePoints = dedupePoints(body.points || []);

  if (uniquePoints.length < 2) {
    return NextResponse.json({ error: "at_least_two_points_required" }, { status: 400 });
  }

  const [origin, ...rest] = uniquePoints;
  const destination = rest.at(-1)!;
  const intermediates = rest.slice(0, -1).map((point) => ({
    location: {
      latLng: {
        latitude: point.lat,
        longitude: point.lng,
      },
    },
  }));

  const payload = {
    origin: toWaypoint(origin),
    destination: toWaypoint(destination),
    intermediates,
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    polylineQuality: "OVERVIEW",
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: "pt-BR",
    units: "METRIC",
  };

  const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "google_routes_request_failed", details: errorText },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    routes?: Array<{
      duration?: string;
      distanceMeters?: number;
      polyline?: { encodedPolyline?: string };
      legs?: Array<{
        distanceMeters?: number;
        duration?: string;
      }>;
    }>;
  };

  const route = data.routes?.[0];
  if (!route?.polyline?.encodedPolyline) {
    return NextResponse.json({ error: "route_not_found" }, { status: 404 });
  }

  return NextResponse.json({
    duration: route.duration || null,
    distanceMeters: route.distanceMeters || null,
    encodedPolyline: route.polyline.encodedPolyline,
    legs:
      route.legs?.map((leg) => ({
        distanceMeters: leg.distanceMeters || null,
        duration: leg.duration || null,
      })) || [],
  });
}

function toWaypoint(point: Coordinate) {
  return {
    location: {
      latLng: {
        latitude: point.lat,
        longitude: point.lng,
      },
    },
  };
}

function dedupePoints(points: Coordinate[]) {
  const seen = new Set<string>();
  const result: Coordinate[] = [];

  for (const point of points) {
    if (!Number.isFinite(point?.lat) || !Number.isFinite(point?.lng)) continue;
    const key = `${point.lat.toFixed(6)},${point.lng.toFixed(6)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(point);
  }

  return result;
}
