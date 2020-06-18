const url = 'http://localhost:4454';

export const endpoints = {
  servers : {
    loadServers: `${url}/servers`,
    loadServer: (id: number) => `${url}/servers/${id}`,
    turnOnServer: (id: number) => `${url}/servers/${id}/on`,
    turnOffServer: (id: number) => `${url}/servers/${id}/off`,
    rebootServer: (id: number) => `${url}/servers/${id}/reboot`
  }
};
