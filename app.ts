import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';



import todoRoutes from './routes/todoRoutes';

const app = express();
dotenv.config();

// app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use('/',todoRoutes)

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-list';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

let PORT=3002;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://Localhost:${PORT}`);
})


