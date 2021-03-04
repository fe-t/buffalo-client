export interface Material {
  id: string;
  name: string;
  zhName: string;
  props?: object;
}

export interface CanvasComponent {
  id: string;
  name: string;
  zhName: string;
  materialId: string;
  props?: object;
}
