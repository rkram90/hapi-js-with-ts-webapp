import { Server } from '@hapi/hapi';
import { routes } from './routes';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

export const init = async () =>{
    
    const server = new Server({
        port: 3300,
        host: 'localhost'
    });

    await server.register(Inert);
    await server.register(Vision);

    routes(server);

    server.views({
        engines: {
          html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
      })
    
    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', err =>{
    console.log(err);
    process.exit(0);
})