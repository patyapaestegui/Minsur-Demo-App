export interface Camera {
  id: number | string;
  waveId?: string;
  name: string;
  x: number;
  y: number;
  status: "online" | "offline" | "alarm" | "warning";
  preview: string;
}