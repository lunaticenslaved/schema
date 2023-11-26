export type EndpointsMap = Record<string, string>;

export class Endpoints<Obj extends EndpointsMap> {
  map: Obj;

  constructor(map: Obj) {
    this.map = map;
  }

  clone() {
    return new Endpoints({ ...this.map });
  }

  setHost(key: keyof Obj, host: string) {
    // TODO is there better fix?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.map[key] = host as any;
  }

  createPath(key: keyof Obj, path: string) {
    return `${this.map[key]}/${path}`.replaceAll(/[a-z0-9](\/)+[a-z0-9]/gi, match =>
      match.replaceAll(/(\/){2,}/gi, '/'),
    );
  }
}

export const endpoints = new Endpoints({
  authApi: 'https://auth.lunaticenslaved.space/api',
});
