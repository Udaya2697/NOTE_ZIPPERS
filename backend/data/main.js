const express=require('express');
const notes=require("./notes");
const dotenv=require('dotenv');
const connectDb =require("../config/db")
const userRoutes=require("../routes/userRoutes");
const noteRoutes=require('../routes/noteRoutes')
const professionalnoteRoutes=require('../routes/professionalNoteRoutes')
const {notFound,errorHandler}=require("../middlewares/errorMiddlewaers")
const cors = require("cors")
var nodemailer=require('nodemailer')
const path=require('path')

const app =express();
dotenv.config();
connectDb();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}))

//  app.get("/",(req,res)=> {
//     res.send("API in running..");
//  });

//app.get('/api/notes',(req,res)=>{
//console.log(notes)
//    res.send(notes)
 //});



app.use(userRoutes);
app.use('/api/notes',noteRoutes)
app.use('/prof',professionalnoteRoutes)
//--------------depolyment--------------
 __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//--------------depolyment--------------


app.use(notFound);
app.use(errorHandler);


const PORT=process.env.PORT || 5000;



app.listen(PORT,console.log(`Server Statred on port ${PORT}`));