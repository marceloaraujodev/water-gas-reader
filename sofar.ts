//-------- uploadController

// import { Request, Response } from 'express';

// export const upload = (req: Request, res: Response):void => {

//   res.status(200).json({
//     success: true,
//     message: 'Welcome to the Water-Gas-Reader API',
//     // // requirements 
//     // { 
//     //   tempLink: 'link', 
//     //   GUID: '35321', 
//     //   numberFromLLM: 45674 
//     // }
//   })
// }

// //-------------- upload.ts under routes
// import express from 'express';
// const router = express.Router();

// // Import routes
// import { upload } from '../controllers/uploadController';

// // Define routes
// router.route('/upload').get(upload);

// export default router;


// //------ app.ts
// import express from 'express';
// import fileUpload from 'express-fileupload';

// // routes import
// import upload from './routes/upload';

// const app = express();

// // files 
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "/tmp/", 
// }));

// //middleware 
// app.use('/api/v1/', upload)

// export default app;


////------ index.ts

// import app from './app';
// import dotenv from 'dotenv';

// dotenv.config();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });