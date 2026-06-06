export interface WaveCamera {

  id: string

  name: string

  status: string

}

export default class WaveApiService {

  async getCameras() {

  return [

    {
      id:"001",
      name:"Garita Tranquera",
      status:"online"
    },

    {
      id:"002",
      name:"Frente COM",
      status:"alarm"
    }

  ];

}

}