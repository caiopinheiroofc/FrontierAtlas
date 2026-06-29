"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type SmartMapZoneGroup } from "@/lib/smart-map";

const SCRIPT_ID = "frontier-atlas-google-maps";

type GoogleMapsLibrary = {
  Map: new (
    element: HTMLDivElement,
    options: Record<string, unknown>,
  ) => {
    fitBounds: (bounds: { isEmpty: () => boolean }, padding?: number) => void;
  };
  Marker: new (options: Record<string, unknown>) => {
    addListener: (eventName: string, handler: () => void) => void;
  };
  Polyline: new (options: Record<string, unknown>) => unknown;
  InfoWindow: new () => {
    setContent: (content: string) => void;
    open: (options: Record<string, unknown>) => void;
  };
  LatLngBounds: new () => {
    extend: (position: { lat: number; lng: number }) => void;
    isEmpty: () => boolean;
  };
  SymbolPath: {
    CIRCLE: unknown;
  };
};

type GoogleMapsWindow = Window & {
  google?: {
    maps?: GoogleMapsLibrary;
  };
  __frontierGoogleMapsPromise__?: Promise<void>;
};

type GoogleSmartMapProps = {
  zones: SmartMapZoneGroup[];
  activeZoneSlug?: string;
  customRoutePoints?: Array<{ lat: number; lng: number }>;
  customRouteLabel?: string;
  customRouteAccent?: string;
  customOrigin?: {
    title: string;
    coordinate: { lat: number; lng: number };
  };
};

type RouteSnapshot = {
  encodedPolyline: string;
  duration: string | null;
  distanceMeters: number | null;
};

export function GoogleSmartMap({
  zones,
  activeZoneSlug,
  customRoutePoints,
  customRouteLabel,
  customRouteAccent,
  customOrigin,
}: GoogleSmartMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeData, setRouteData] = useState<RouteSnapshot | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const missingApiKey = !apiKey;

  const points = useMemo(
    () =>
      zones.flatMap((zone) =>
        zone.stores
          .filter((item) => item.coordinate)
          .map((item) => ({
            zone,
            item,
          })),
      ),
    [zones],
  );

  const activeZone = useMemo(
    () => zones.find((zone) => zone.slug === activeZoneSlug) || zones[0] || null,
    [activeZoneSlug, zones],
  );

  const activeRoutePoints = useMemo(
    () => activeZone?.stores.map((item) => item.coordinate).filter(Boolean) ?? [],
    [activeZone],
  );
  const preferredRoutePoints = customRoutePoints?.length ? customRoutePoints : activeRoutePoints;
  const canComputeRoute = preferredRoutePoints.length >= 2;
  const visibleRouteData = canComputeRoute ? routeData : null;
  const visibleRouteError = canComputeRoute ? routeError : null;

  useEffect(() => {
    if (!canComputeRoute) {
      return;
    }

    let cancelled = false;

    fetch("/api/maps/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points: preferredRoutePoints }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("route_request_failed");
        }
        return (await response.json()) as RouteSnapshot;
      })
      .then((data) => {
        if (cancelled) return;
        setRouteError(null);
        setRouteData(data);
      })
      .catch(() => {
        if (cancelled) return;
        setRouteData(null);
        setRouteError("Não foi possível calcular a rota sugerida deste eixo agora.");
      });

    return () => {
      cancelled = true;
    };
  }, [canComputeRoute, preferredRoutePoints]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled) return;
        renderMap(
          mapRef.current,
          zones,
          activeZoneSlug,
          customOrigin,
          customRouteAccent,
          canComputeRoute ? visibleRouteData?.encodedPolyline || null : null,
        );
      })
      .catch(() => {
        if (cancelled) return;
        setMapError("Não foi possível carregar o Google Maps neste momento.");
      });

    return () => {
      cancelled = true;
    };
  }, [activeZoneSlug, apiKey, canComputeRoute, customOrigin, customRouteAccent, visibleRouteData?.encodedPolyline, zones]);

  if (!points.length) {
    return (
      <div className="rounded-[30px] border border-dashed border-black/10 bg-white p-10 text-center shadow-[0_25px_80px_-55px_rgba(10,10,10,0.4)]">
        <p className="text-lg font-bold text-[#0a0a0a]">Ainda faltam coordenadas úteis para desenhar o mapa.</p>
        <p className="mt-2 text-sm text-[#687264]">Assim que tivermos lojas com latitude e longitude válidas, o mapa aparece aqui.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[34px] border border-black/6 bg-white shadow-[0_25px_80px_-55px_rgba(10,10,10,0.45)]">
      <div className="flex items-center justify-between gap-4 border-b border-black/6 px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">Google Maps ativo</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">Mapa inteligente da rota</h2>
        </div>
        <div className="rounded-full bg-[#eff4e8] px-4 py-2 text-sm font-semibold text-[#4d564a]">
          {points.length} pontos visíveis
        </div>
      </div>

      <div ref={mapRef} className="h-[460px] w-full bg-[#edf3e7]" />

      {missingApiKey ? (
        <div className="border-t border-black/6 bg-[#fff7e8] px-5 py-4 text-sm text-[#7b5b17]">
          Adicione a chave do Google Maps para renderizar o mapa real.
        </div>
      ) : visibleRouteError ? (
        <div className="border-t border-black/6 bg-[#fff7e8] px-5 py-4 text-sm text-[#7b5b17]">
          {visibleRouteError}
        </div>
      ) : mapError ? (
        <div className="border-t border-black/6 bg-[#fff7e8] px-5 py-4 text-sm text-[#7b5b17]">
          {mapError}
        </div>
      ) : (
        <div className="border-t border-black/6 bg-[#f8faf4] px-5 py-4 text-sm text-[#62705d]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Cada eixo é desenhado com sua própria cor. Os pins acompanham a ordem sugerida das lojas dentro do cluster.
            </span>
            {canComputeRoute && visibleRouteData?.distanceMeters ? (
              <span className="font-semibold text-[#22331f]">
                {customRouteLabel ?? "Rota sugerida"}: {formatDistance(visibleRouteData.distanceMeters)} • {formatDuration(visibleRouteData.duration)}
              </span>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

function loadGoogleMaps(apiKey: string) {
  const mapsWindow = window as GoogleMapsWindow;

  if (mapsWindow.google?.maps) {
    return Promise.resolve();
  }

  if (mapsWindow.__frontierGoogleMapsPromise__) {
    return mapsWindow.__frontierGoogleMapsPromise__;
  }

  mapsWindow.__frontierGoogleMapsPromise__ = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("google-maps-load-error")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("google-maps-load-error"));
    document.head.appendChild(script);
  });

  return mapsWindow.__frontierGoogleMapsPromise__;
}

function renderMap(
  container: HTMLDivElement | null,
  zones: SmartMapZoneGroup[],
  activeZoneSlug?: string,
  customOrigin?: { title: string; coordinate: { lat: number; lng: number } },
  customRouteAccent?: string,
  encodedPolyline?: string | null,
) {
  if (!container) return;

  const googleMaps = (window as GoogleMapsWindow).google;
  if (!googleMaps?.maps) return;

  const map = new googleMaps.maps.Map(container, {
    center: { lat: -25.5107, lng: -54.6092 },
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: "greedy",
    styles: [
      { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      { featureType: "transit", stylers: [{ visibility: "off" }] },
    ],
  });

  const bounds = new googleMaps.maps.LatLngBounds();
  const infoWindow = new googleMaps.maps.InfoWindow();

  zones.forEach((zone) => {
    const path = zone.stores
      .map((item) => item.coordinate)
      .filter(Boolean)
      .map((coordinate) => ({ lat: coordinate!.lat, lng: coordinate!.lng }));

    if (path.length >= 2) {
      new googleMaps.maps.Polyline({
        map,
        path,
        strokeColor: colorFromAccent(zone.accent),
        strokeOpacity: 0.45,
        strokeWeight: 3,
      });
    }

    zone.stores.forEach((item, index) => {
      if (!item.coordinate) return;
      const position = item.coordinate;
      bounds.extend(position);

      const marker = new googleMaps.maps.Marker({
        map,
        position,
        title: item.store.name,
        label: {
          text: String(index + 1),
          color: "#0a0a0a",
          fontWeight: "700",
        },
        icon: {
          path: googleMaps.maps.SymbolPath.CIRCLE,
          fillColor: colorFromAccent(zone.accent),
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 12,
        },
      });

      marker.addListener("click", () => {
        infoWindow.setContent(`
          <div style="padding:6px 8px;max-width:220px">
            <div style="font-weight:800;font-size:15px;color:#0a0a0a">${escapeHtml(item.store.name)}</div>
            <div style="margin-top:6px;font-size:12px;color:#647063">${escapeHtml(zone.title)}</div>
            <div style="margin-top:8px;font-size:13px;color:#233126">${escapeHtml(item.store.shortDescription)}</div>
          </div>
        `);
        infoWindow.open({ map, anchor: marker });
      });
    });
  });

  if (customOrigin) {
    bounds.extend(customOrigin.coordinate);

    const originMarker = new googleMaps.maps.Marker({
      map,
      position: customOrigin.coordinate,
      title: customOrigin.title,
      label: {
        text: "P",
        color: "#ffffff",
        fontWeight: "700",
      },
      icon: {
        path: googleMaps.maps.SymbolPath.CIRCLE,
        fillColor: "#111827",
        fillOpacity: 1,
        strokeColor: "#d9ff1f",
        strokeWeight: 3,
        scale: 14,
      },
    });

    originMarker.addListener("click", () => {
      infoWindow.setContent(`
        <div style="padding:6px 8px;max-width:220px">
          <div style="font-weight:800;font-size:15px;color:#0a0a0a">${escapeHtml(customOrigin.title)}</div>
          <div style="margin-top:6px;font-size:12px;color:#647063">Origem operacional da rota</div>
        </div>
      `);
      infoWindow.open({ map, anchor: originMarker });
    });
  }

  if (encodedPolyline) {
    const activeZone = zones.find((zone) => zone.slug === activeZoneSlug);
    new googleMaps.maps.Polyline({
      map,
      path: decodePolyline(encodedPolyline),
      strokeColor: customRouteAccent || (activeZone ? colorFromAccent(activeZone.accent) : "#0a0a0a"),
      strokeOpacity: 1,
      strokeWeight: 6,
    });
  }

  if (!bounds.isEmpty()) {
    map.fitBounds(bounds, 48);
  }
}

function colorFromAccent(accent: string) {
  if (accent.includes("#d9ff1f")) return "#d9ff1f";
  if (accent.includes("#ffb56b")) return "#ffb56b";
  if (accent.includes("#7dd3fc")) return "#7dd3fc";
  if (accent.includes("#a78bfa")) return "#a78bfa";
  if (accent.includes("#bef264")) return "#bef264";
  if (accent.includes("#d4d4d8")) return "#d4d4d8";
  return "#27d76c";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function decodePolyline(encoded: string) {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates: Array<{ lat: number; lng: number }> = [];

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push({
      lat: lat / 1e5,
      lng: lng / 1e5,
    });
  }

  return coordinates;
}

function formatDistance(distanceMeters: number) {
  const km = distanceMeters / 1000;
  if (km < 1) return `${Math.round(distanceMeters)} m`;
  return `${km.toFixed(1).replace(".", ",")} km`;
}

function formatDuration(duration: string | null) {
  if (!duration) return "tempo em cálculo";
  const seconds = Number(duration.replace("s", ""));
  if (!Number.isFinite(seconds)) return duration;

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}min` : `${hours}h`;
}
