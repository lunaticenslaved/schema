const map = {
  authApi: 'https://auth.lunaticenslaved.space/api',
};

function create(host: keyof typeof map, path: string) {
  return `${map[host]}/${path.replace(/^[//]/, '')}`;
}

function setEndpoint(host: keyof typeof map, path: string) {
  map[host] = path;
}

export const Endpoint = {
  create,
  setEndpoint,
};
