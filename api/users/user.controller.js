const { create,getUserByUserId,getUsers,updateUser,deleteUser,getUserByUserEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
var nodemailer = require('nodemailer');
module.exports= {
    createUser: (req,res) => {
        const body = req.body;
        console.log(body);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(err, results)=> {
             if(err){
                 console.log(err);
                 return res.status(500).json({
                     success: 0,
                     message: "Database Connection error"
                 });
             }
             var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'sandeepsinghgour0@gmail.com',
                    pass: "SANDY@1999"
                }
            });
            var mailOptions = {
                from: 'sandeepsinghgour0@gmail.com',
                to: body.email,
                subject: "Greeting User",
                text: "Welcome User :) "
            }
            transporter.sendMail(mailOptions, function(error, info) {
                if(error){
                   console.log(error); 
                }
                else {
                    console.log('email has been sent', info.response);
                }
            })
            
             return res.status(200).json({
                 success: 1,
                 data: results
             });

        });
           //https://myaccount.google.com/lesssecureapps


    },
    getUserByUserId: (req,res) => {
        const job = req.params.job;
        getUserByUserId(job, (err, results)=> {
            if (err){
                console,log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
         
            });


        })
    },
    getUsers: (req,res) => {
    getUsers((err, results) => {
        if(err){
            console.log(err);
            return;
        }
        return res. json({
            success: 1,
            data: results
      
        });

    })

    },
    updateUser: (req,res) => {
        const body = req.body;
      //  console.log(body);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body,(err, results)=> {
             if(err){
                 console.log(err);
                 return false;
             }
             if(!results){
                 return res.json({
                     success: 0,
                     message: "Failed to update user"
                 });
             }
             return res.json({
                 success: 1,
                 message: "updated successfully"
             });

        });
    },
    deleteUser: (req,res) => {
        const data = req.body;
        deleteUser(data,(err, results)=> {
             if(err){
                 console.log(err);
                 return;
             }
             if (!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
         
            });

        });



    },
    login: (req,res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) =>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results }, "qwe1234", { expiresIn: "1h"});
                return res.json({
                    success: 1,
                    message: " login successfully",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "Invalid email or passwords"
                });
            }
        })
    }

}