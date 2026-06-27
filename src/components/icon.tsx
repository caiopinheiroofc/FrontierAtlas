import {
  BadgeDollarSign,
  Bike,
  Boxes,
  Compass,
  Gamepad2,
  Home,
  Hotel,
  LucideIcon,
  Map,
  Search,
  Shirt,
  Smartphone,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  BadgeDollarSign,
  Bike,
  Boxes,
  Compass,
  Gamepad2,
  Home,
  Hotel,
  Map,
  Search,
  Shirt,
  Smartphone,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
};

export function AtlasIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Compass;
  return <Icon className={className} />;
}
