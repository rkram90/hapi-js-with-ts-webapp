import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { writeFileToServer, appendTextToFile } from './controllers/automate.controller';
const Joi = require('@hapi/joi');

export const routes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request: Request, h: ResponseToolkit) => {
            return 'hello world';
            //h.view('index', { name: 'Damianek' })
        }
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => h.view('index', { name: 'Damianek' })
    })

    //automate-build
    server.route({
        method: 'POST',
        path: '/automate-build',
        handler: async(request: Request, h: ResponseToolkit) => {
            let payload = request.payload;
            let stringPayload = JSON.stringify(payload);
            let reqDataObj = JSON.parse(stringPayload);
           
            let fileName = reqDataObj.file_name;
            let addScript = reqDataObj.add_script;
            let deployLoc = reqDataObj.deploy_location;
            console.log(fileName);
            //create new file with script
            await writeFileToServer(addScript,"./deploy/"+fileName+".js");

            //append data to exiting file
            await appendTextToFile("./deploy/build.bazel",fileName);
            
            return request.payload;
        }
    })
};
