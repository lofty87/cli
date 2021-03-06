type Options = {
  origin: string;
  allowMethods: 'HEAD,GET,POST,PATCH,DELETE' | string;
  exposeHeaders: string;
  allowHeaders: string;
  maxAge: string;
  credentials: string;
  keepHeadersOnError: string;
};

declare module '@koa/cors' {
  const cors: (options?: Partial<Options>) => any;

  export default cors;
}
