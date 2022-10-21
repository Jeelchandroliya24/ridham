const express = require('express');
require('./DataBase/config');
const user = require("./DataBase/User");
const app = express();

const cors = require("cors");
const bcrypt = require('bcryptjs');
const User = require('./DataBase/User');

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  // return console.log(req.body);
 //  const Password = req.body.password;
  let User = new user({ Email: req.body.email, Password: req.body.password, Role: req.body.role, Status: req.body.status });

   //Encrypt Password
  //     const salt = await bcrypt.genSalt(10);
  //      User.Password = await bcrypt.hash(Password, salt);
  let result = await User.save();
   result = result.toObject();
  delete result.password
  resp.send(result);
    
});


app.post("/login", async (req, resp) => {
  
  if (req.body.password && req.body.email){
  let user = await User.findOne(req.body);
  if(user)
  {
    resp.send(user)
  }else{
    resp.send({result:"No user found"})
  }
}else{
  resp.send({result:"No user found"})

}

})



app.listen(5000);