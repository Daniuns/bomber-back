// import { IMessage } from "./interfaces/message";
import mapService from './services/map/map';
import { IHero } from './interfaces/hero';
import heroesService from './services/hero/heroService';
import cors from 'cors';
import { allowCors } from './middlewares/allowCors';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.use(allowCors);

const io = require("socket.io")(server, {origin: '*:*'});
    // io.origins(['https://app-bomber.herokuapp.com:3000']);
    server.listen(4000);

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


    // socket.on('attListMessages', (message: IMessage) => {
    //     addMessage(message)
    //     io.sockets.emit('attListMessages', listMessages);
    // })


    socket.on('disconnect', () => {
        console.log('User disconnected.', socket.id);
        heroesService.disconnected(socket.id);
        io.sockets.emit('heroesList', heroesService.getHeroes());
    });
});
