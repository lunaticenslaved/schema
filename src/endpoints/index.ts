const map = {
  authApi: 'https://auth.lunaticenslaved.space/api',
};

export type EndpointKey = keyof typeof map;

function create(host: EndpointKey, path: string) {
  return `${map[host]}/${path.replace(/^[//]/, '')}`;
}

function set(host: EndpointKey, path: string) {
  map[host] = path;
}

export const Endpoint = {
  create,
  set,
};
