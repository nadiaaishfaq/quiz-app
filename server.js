import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv';
import router from './router/route.js';

// import connection file
import connect from './database/conn.js';

const app = express()

//app middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json())
config()

//application port
const port = process.env.PORT || 8080;



//routes
app.use('/api', router)  //apis

app.get('/', (req,res) => {
    try {
        console.log(hello)
        res.json({ message: 'Server is connected and responding with a JSON response.' });
    } catch (error) {
        res.json(error)
    }
})


// start server only when we have valid connection
connect().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log(`server connected to ${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to server")
    }
}).catch(error => {
    console.log("Invalid Database Connection")
})

