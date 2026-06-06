import type { Camera } from "../types/Camera";

export const cameras: Camera[] = [
  {
    id: 1,
    waveId: "device-001",
    name: "Garita Tranquera",
    x: 18,
    y: 9,
    status: "online",
    preview: "https://picsum.photos/300/200",
  },

  {
    id: 2,
    waveId: "device-002",
    name: "Almacén Refractario",
    x: 7,
    y: 25,
    status: "online",
    preview: "https://picsum.photos/301/200",
  },

  {
    id: 3,
    waveId: "device-003",
    name: "Torreón 10",
    x: 8,
    y: 45,
    status: "online",
    preview: "https://picsum.photos/302/200",
  },

  {
    id: 11,
    waveId: "device-011",
    name: "Frente COM",
    x: 42,
    y: 18,
    status: "alarm",
    preview: "https://picsum.photos/303/200",
  },
];
