import { mongoConnection } from './database/mongoConnection';
import express, {Request, Response} from 'express';
import { URLController } from './controller/URLController';

const api = express();
api.use(express.json());

const database = new mongoConnection();
database.connect(); 

const urlController = new URLController();
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)


api.listen(5000, ()=>console.log('Listening...'));