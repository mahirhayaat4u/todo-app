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
        origin:"https://todo-app-taupe-nine.vercel.app/",
        credentials:true,
        // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow methods
        // allowedHeaders: ['Content-Type', 'Authorization']  // Allow headers

    })
    
)

// app.options('*', cors({
//     origin: "https://todo-app-taupe-nine.vercel.app/",  // Your frontend URL
//     credentials: true
// }));



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