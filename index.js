import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { User } from './models/user.model.js'; 
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js'; 
import {checkforauthenticationcookie} from './middlewares/authenticaion.js';
const app = express();
app.set('view engine', 'ejs');
dotenv.config();
const port =  3000;
const MongoDB = process.env.MONGO_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforauthenticationcookie("token"));
mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



app.use('/',userRouter)
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
