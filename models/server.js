import express from "express";
import 'dotenv/config';
import cors from 'cors'
import router from '../routes/users.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.middlewares();
        this.usuariosPath = '/api/users';
    }

    routes() {
        this.app.use(this.usuariosPath, router);
    }


    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }
}

export default Server;
