import { config } from '../config/constants';
import mongoose from 'mongoose';

export class mongoConnection{
    public async connect(): Promise<void>{
        try{
            await mongoose.connect(config.MONGO_CONNECTION,{useNewUrlParser:true, useUnifiedTopology:true})
            console.log('Database Connected')
        }catch(e){
            console.error(e.message)
            process.exit(1)
        }
    }
}