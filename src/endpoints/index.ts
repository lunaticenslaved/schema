const map = {
  authApi: 'https://auth.lunaticenslaved.space/api',
};

function create(host: keyof typeof map, path: string) {
  return `${map[host]}/${path}`.replace('//', '/');
}

export const Endpoint = {
  map,
  create,
};
