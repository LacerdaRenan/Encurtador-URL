import { URLModel } from "../database/model/URL";
import { Request, Response, urlencoded } from "express";
import shortId from "shortid";
import {config} from '../config/constants';

 export class URLController{
    public async shorten(req:Request, res:Response):Promise<void>{
        //Ver se a url já não existe
        const{originURL}=req.body
        const url = await URLModel.findOne({originURL})
        if(url){
            res.json(url)
            return;
        }
        //Criar hash para url
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        //salvar url no banco
        const newUrl = URLModel.create({hash, shortURL, originURL})
        //Retornar a url salva
        res.json(newUrl)
    }

    public async redirect(req:Request, res:Response):Promise<void>{
        //Pegar o hash
        const {hash} = req.params;
        //Encontrar a url original
        const url = await URLModel.findOne({hash});

        if(url){
            res.redirect(url.originURL);
            return;
        }

        //Redirecionar
        res.status(400).send('Not found');
    }
}

