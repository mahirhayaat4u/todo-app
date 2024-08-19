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
app.use(
    cors({
      origin: [
        // 'http://localhost:3000',  // Local development
        'https://todo-app-taupe-nine.vercel.app'  // Production URL
      ],
      credentials: true,  // Allow cookies to be sent and received
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
    })
  );

 



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