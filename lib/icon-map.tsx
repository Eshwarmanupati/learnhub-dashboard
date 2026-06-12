import {
  Brain,
  Rocket,
  Network,
  Code,
  BookOpen,
  Palette,
  Database,
  Shield,
  Cpu,
  Globe,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Rocket,
  Network,
  Code,
  BookOpen,
  Palette,
  Database,
  Shield,
  Cpu,
  Globe,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? BookOpen;
}
