export interface Camera {
  id: number;
  waveId?: string;
  name: string;
  x: number;
  y: number;

  status: "online" | "offline" | "alarm" | "warning";

  preview: string;
}
