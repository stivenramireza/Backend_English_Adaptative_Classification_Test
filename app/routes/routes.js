/**
 * /app/routes/routes.js
 * Export an express route.
 */

 const express = require('express');
 const jwt = require('jsonwebtoken');
 const User = require('./../models/user');
 const mongoose = require('mongoose');

 //to encrypt
const bcrypt = require('bcrypt');



 // It will contain all the end points
 const router = express.Router();

 router.post('/user/register', (req, res, next) => {
     let hasErrors = false;
     let errors = [];

     if(!req.body.firstname){
         errors.push({'firstname': "First Name not received"});
         hasErrors = true;
     }
     if(!req.body.lastname){
        errors.push({'lastname': "Last Name not received"});
        hasErrors = true;
     }
     if(!req.body.username){
        errors.push({'username': "Username Name not received"});
        hasErrors = true;
     }
     if(!req.body.doctype){
        errors.push({'doctype': "Doctype not received"});
        hasErrors = true;
     }
     if(!req.body.docnumber){
        errors.push({'docnumber': "Docnumber not received"});
        hasErrors = true;
     }
     if(!req.body.birthdate){
        errors.push({'birthdate': "Birth Date not received"});
        hasErrors = true;
     }
     if(!req.body.maritalstatus){
        errors.push({'maritalstatus': "Marital Status not received"});
        hasErrors = true;
     }
     if(!req.body.email){
        errors.push({'email': "Email not received"});
        hasErrors = true;
     }
     if(!req.body.password){
        errors.push({'password': "Password not received"});
        hasErrors = true;
     }
     if(hasErrors){
         res.status(422).json({
             message: "Invalid input",
             errors: errors
         });
     }else{
        bcrypt.hash(req.body.password, 10, (err, hashed_password) => {
            if(err){
                errors.push({
                    hash: err.message
                });
                return res.status(500).json(errors);
            }else{
                const new_user = new User({
                    //assign request fields to the user attributes
                    _id : mongoose.Types.ObjectId(),
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    doctype: req.body.doctype,
                    docnumber: req.body.docnumber,
                    birthdate: req.body.birthdate,
                    maritalstatus: req.body.maritalstatus,
                    email: req.body.email,
                    password: hashed_password
                  });
                  //save in the database
                  new_user.save().then(saved_user => {
                  //return 201, message and user details
                    res.status(201).json({
                      message: 'User created!',
                      user: saved_user,
                      errors: errors
                    });
                  }).catch(err => {
                  //failed to save in database
                    errors.push(new Error({
                      db: err.message
                    }))
                    res.status(500).json(errors);
                  });
            }
        });  
     }
 });
 
 router.post('/user/login', (req, res, next) => {
    let hasErrors = false ;
    let errors = [];
  
    //validate presence of email and password
    if(!req.body.email){
        errors.push({'email': 'Email not received'})
        hasErrors = true;
    }
    if(!req.body.password){
        errors.push({'password': 'Password not received'})
        hasErrors = true;
    }

    if(hasErrors){
        //return error code an info
        res.status(422).json({
            message: "Invalid input",
            errors: errors
        });

    }else{
        //check if credentials are valid
        User.findOne({email: req.body.email}).then((found_user, err) => {
            if(!found_user){
                res.status(401).json({
                    message: "Auth error, email not found"
                });
            }else{
                bcrypt.compare(req.body.password, found_user.password, (err, isValid) => {
                    if(err){
                        //if compare method fails, return error
                        res.status(500).json({
                          message: err.message
                        }); 
                    }
                    if(!isValid){
                        //return error, incorrect password
                        res.status(401).json({
                          message: "Authentication error."
                        }) 
                    }else{
                        //generate JWT token. jwt.sing() receives payload, key and opts.
                        const token = jwt.sign(
                            {
                                email: req.body.email,
                            },  
                            (process.env.JWT_KEY || 'mykey'), 
                            {
                                expiresIn: "1h"
                            }
                        );
                        //validation OK
                        res.status(200).json({
                            message: 'User Authenticated.',
                            token: token,
                            errors: errors
                        });
                    }
                });
            }

        });
    }  
  });

 module.exports = router;


