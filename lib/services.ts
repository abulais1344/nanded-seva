import {
  Zap, AirVent, Droplets, Filter, HardHat, PaintBucket,
  WashingMachine, Car, MapPin, Plane, Navigation, User,
  Settings,
} from 'lucide-react';
import type { ElementType } from 'react';

export const ICON_MAP: Record<string, ElementType> = {
  'zap':             Zap,
  'wind':            AirVent,
  'droplets':        Droplets,
  'filter':          Filter,
  'hammer':          HardHat,
  'paintbrush':      PaintBucket,
  'washing-machine': WashingMachine,
  'user':            User,
  'car':             Car,
  'navigation':      Navigation,
  'plane':           Plane,
  'map-pin':         MapPin,
};

export const COLOR_MAP: Record<string, string> = {
  'zap':             '#F59E0B',
  'wind':            '#06B6D4',
  'droplets':        '#3B82F6',
  'filter':          '#10B981',
  'hammer':          '#8B5CF6',
  'paintbrush':      '#EC4899',
  'washing-machine': '#6366F1',
  'user':            '#0F3460',
  'car':             '#34C77B',
  'navigation':      '#F97316',
  'plane':           '#0EA5E9',
  'map-pin':         '#EF4444',
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getIcon(icon: string | null): ElementType {
  return (icon && ICON_MAP[icon]) ? ICON_MAP[icon] : Settings;
}

export function getColor(icon: string | null): string {
  return (icon && COLOR_MAP[icon]) ? COLOR_MAP[icon] : '#6B7280';
}
