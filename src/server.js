const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const port = process.env.PORT ?? 5000;
  const host = process.env.HOST ?? 'localhost';

  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
