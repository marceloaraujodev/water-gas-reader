import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// routes import
import uploadRoute from './routes/upload';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/", 
}));

//connect routes
app.use('/api/v1', uploadRoute)


export default app;