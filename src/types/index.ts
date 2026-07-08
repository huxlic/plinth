
export interface NavItem {
  id: string;
  label: string;
  path: string;
  isTerminal: boolean; // Custom flag for your 10x style indicators
  element: React.JSX.ElementType
}

export interface AmbientDot {
  col: number;
  row: number;
  color: string;
  twinkleSpeed: number;
  phase: number;
}
