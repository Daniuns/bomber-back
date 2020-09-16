// import { IMessage } from "./interfaces/message";
import mapService from './services/map/map';
import { IHero } from './interfaces/hero';
import heroesService from './services/hero/heroService';
import https from 'http';
// import cors from 'cors';
import { allowCors } from './middlewares/allowCors';

const express = require('express');
const app = express();
app.use(allowCors);
    
const server = app.listen(8080, () => {
    console.log(`server started: PORT: 8080`);
});

const io = require("socket.io")(server, {origin: '*:*'});
    // io.origins(['https://app-bomber.herokuapp.com:3000']);

    app.get('/test', function(req: any, res:any) {
        res.send('Everything Ok!');
      });



    process.on('unhandledRejection', () => { /* ignore */ });


io.on('connection', (socket: any) => {
    console.log('new user connected.', socket.id);

    io.sockets.emit('receiveMap', mapService.generateMap());
    io.sockets.emit('createHero', heroesService.createHero(socket.id));
    io.sockets.emit('heroesList', heroesService.getHeroes());
    socket.on('attHero', async (hero: IHero) => {
        console.log('atualiza esse hero', hero);
        await heroesService.setHero(hero);
        io.sockets.emit('heroesList', heroesService.getHeroes());
    });
    // io.sockets.emit('enteredAt', new Date().getTime());

    socket.on('disconnect', () => {
        console.log('User disconnected.', socket.id);
        heroesService.disconnected(socket.id);
        io.sockets.emit('heroesList', heroesService.getHeroes());
    });
});
