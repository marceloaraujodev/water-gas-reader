import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import fileUpload from 'express-fileupload';

// routes import
import uploadRoute from './routes/upload';
import confirmRoute from './routes/confirm';
import getListRoute from './routes/getList';

dotenv.config();

const app = express();
const allowedOrigins = ['https://water-gas-reader-client.onrender.com', 'http://localhost:5173'];
// 'https://water-gas-reader-client.onrender.com',

// CORS
app.use(cors({
  origin:  allowedOrigins,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type','Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "/tmp/", 
// }));

//connect routes
app.use('/api/v1', uploadRoute)
app.use('/api/v1', confirmRoute)
app.use('/api/v1', getListRoute)


export default app;