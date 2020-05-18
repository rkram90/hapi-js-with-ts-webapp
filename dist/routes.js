"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const automate_controller_1 = require("./controllers/automate.controller");
const Joi = require('@hapi/joi');
exports.routes = (server) => {
    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {
            return 'hello world';
            //h.view('index', { name: 'Damianek' })
        }
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => h.view('index', { name: 'Damianek' })
    });
    //automate-build
    server.route({
        method: 'POST',
        path: '/automate-build',
        handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
            let payload = request.payload;
            let stringPayload = JSON.stringify(payload);
            let reqDataObj = JSON.parse(stringPayload);
            let fileName = reqDataObj.file_name;
            let addScript = reqDataObj.add_script;
            let deployLoc = reqDataObj.deploy_location;
            console.log(fileName);
            //create new file with script
            yield automate_controller_1.writeFileToServer(addScript, "./deploy/" + fileName + ".js");
            //append data to exiting file
            yield automate_controller_1.appendTextToFile("./deploy/build.bazel", fileName);
            return request.payload;
        })
    });
};
