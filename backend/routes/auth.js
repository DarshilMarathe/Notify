const express = require("express");
const {body,validationResult}= require("express-validator")

const User = require("../models/User");

const router = express.Router()


// router.post('/',(req,res)=>{
//     console.log(req.body);
//     const user =  User(req.body);
//     user.save();
//     res.send(req.body);
// })


// Create user using: POST "/api/auth/createuser"    Doesnt require AUTH lofin 
router.post('/createuser',[
    body('name').isLength({min : 3}),
    body('email' , 'Enter a valid mail').isEmail(),
    body('password').isLength({min : 5})
],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) { //error not empty 
      return res.status(400).json({errors:errors.array()});
    // return res.send("ERR") -- my code
    }  
  
    // console.log(req.body);

    // // const user = User(req.body);
    // // user.save();

    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error:"Please entxer a unique email",message:err.message})})


    // res.send(req.body);//  --> as already sent in res.json
})


module.exports = router