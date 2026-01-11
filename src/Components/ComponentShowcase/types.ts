export interface RouteItem {
  key: string;
  label: string;
  component: React.ComponentType;
}

export interface TabRoute {
  key: string;
  label: string;
  routes: RouteItem[];
}
