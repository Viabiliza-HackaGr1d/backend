import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import socketio from 'socket.io';
import { Server } from 'http';

import 'express-async-errors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = new Server(this.app);

    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      '/files',
      express.static(resolve(__dirname, '..', 'storage', 'images'))
    );
  }

  routes() {
    this.app.use('/', routes);
  }

  socket() {
    this.io = socketio(this.server);
  }
}

export default new App().server;
