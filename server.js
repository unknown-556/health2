import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import http from 'http'; // Importing http module for Socket.io
import { Server } from 'socket.io'; // Importing Socket.io
import { createArticle, updateArticle, addComment, addLike, removeLike } from "./src/controllers/postController.js";
import { auth } from './src/middleware/auth.js';


import router from './src/routes/index.js';
import connectDB from './database.js';
import upload from './src/config/multer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app); // Creating a server instance using http module
const io = new Server(server); // Initializing Socket.io with the created server instance

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/betta', router);
app.use(express.static(join(__dirname, 'public')));

app.post('/article', auth, upload.single('img'), createArticle);
app.put('/article/:id', auth, updateArticle);
app.post('/articles/:id/comments', auth, addComment);
app.post('/articles/:id/like', auth, addLike);
app.post('/articles/:id/unlike', auth, removeLike);

app.get('/api/betta', (req, res) => {
    return res.redirect('home-page.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
});

export default {
   server,
   io
};



const startServer = async () => {
    const PORT = process.env.PORT || 5505;
    connectDB();
    try {
        server.listen(PORT, () => {
            console.log(`APP IS RUNNING ON PORT: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

app.get('/', (req, res) => {
     return res.redirect('home.html')
    // res.send('API IS RUNNING');
});
