// import { IMessage } from "./interfaces/message";
import mapService from './services/map/map';
import { IHero } from './interfaces/hero';
import heroesService from './services/hero/heroService';

const express = require('express');
const http = require('http')

const socketIO = require('socket.io');
const PORT = 4000;

const app = express();

const server = http.createServer(app)

const io = socketIO(server)

io.set('origins', '*:*');

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
})


server.listen(PORT, () => { 
    console.log(`listen at ${PORT} port`);
})