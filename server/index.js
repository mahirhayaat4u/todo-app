const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const cors=require('cors');
 const authRoutes=require("./routes/Auth")
 const todoRoute=require("./routes/TodoRoute")
const database=require('./config/database')

require('dotenv').config();
const PORT=process.env.PORT ||4000


database.connect();


app.use(express.json());
app.use(cookieParser())


const corsOptions = {
    origin: '*',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  };
  
  app.use(cors(corsOptions));

 



app.use(authRoutes)
app.use(todoRoute)

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Server is running.."
    });
});

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})