const fastify = require('fastify')({ logger: true });

fastify.get('/', async () => {
  return 'OK';
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
