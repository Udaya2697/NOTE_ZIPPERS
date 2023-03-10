const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken");
const Note = require("../models/noteModels.js");
var cron = require("node-cron");
var nodemailer=require('nodemailer');

exports.registerUser = async (req, res) => {
  const { name, email, password, } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    return res.send({ error: "user exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurd!");
  }
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email: email });
  //console.log(await user.matchPassword(password))
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      pic: user.pic,
    });
  } else {
    res.status(501)
    throw new Error("Invaid Email or Password!");
  }
};

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

exports.getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});
exports.Sendmail = async (req, res) => {
    console.log(req.body.time)
   
    const note = await Note.findById(req.body.note  );
    console.log(req.params.id)
    console.log(note)
    console.log(note.content)
    console.log(note.category)
    const user = await User.findById(req.body.id);
    console.log(user.email)
  let timeString = "";
  if (req.body.time === "10h") {
    let date = new Date();
    timeString = ` * */10 * * *`;
  }else if(req.body.time === "1d"){
    let date = new Date();
    timeString = ` * */24 * * *`;
  }else if(req.body.time === "3d"){
    let date = new Date();
    timeString = ` * */72 * * *`;
  }else if(req.body.time === "1w"){
    let date = new Date();
    timeString = ` * * * * */1`;
  }
  console.log(timeString)
    cron.schedule(
    timeString,
    () => {
        var transport=nodemailer.createTransport(
            {
              service:'gmail',
              auth:{
                user:'udayakumarsr2002@gmail.com',
                pass:'sqstonvefslqlvfz'
              }
            }
          )
          
          var mailOptions={
            from:'udayakumarsr2002@gmail.com',
            to:`${user.email}`,
            subject:'remainder mail',
            html:`<h1>HELLO,${user.name}<h1><br>
            <h2>This is your remainder to complete your Assigned task with in the given period of time.<h2><br>
            <h3>${note.title},${note.content},${note.category}<h3>`
          }
          
          transport.sendMail(mailOptions,function(error,info){
              if(error){
                console.log(error)
              }else{
                console.log("Email sent"+info.response)
              }
          })
    },
    {
      scheduled:true,
    }
  );

}
;


