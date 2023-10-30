import express from "express";
import dotenv from 'dotenv';
import sequelize from "./config/database.js";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

sequelize.sync({ force: true }).then(() => {
    console.log('Database connected');
}).catch((error) => {   
    console.error('Database connection error:', error);
});

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({origin:"http://localhost:8000", credentials:true}))

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use('/',  userRoutes);

app.get('/',(req,res)=> res.send("server is ready"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
