export interface NavItem {
  id: string;
  label: string;
  path: string;
  //   icon: React.ComponentType<{ className?: string }>;
  isTerminal?: boolean; // Custom flag for your 10x style indicators
}

export interface AmbientDot {
  col: number;
  row: number;
  color: string;
  twinkleSpeed: number;
  phase: number;
}
