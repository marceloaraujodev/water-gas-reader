import app from './app';
import dotenv from 'dotenv';

dotenv.config();

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// app.post('/api/v1/upload', (req, res) => {

//   res.send('upload route')

// })

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
