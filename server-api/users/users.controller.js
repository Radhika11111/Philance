// var connectionPool = require('../util/dbconnection');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var moment = require('moment')
var users = require("./users.model");
const sequelize = require('../util/dbconnection');
const Op = sequelize.Op;
var helpers = require('../helpers')
var commonFunctions = helpers.default.common;
var userApi = helpers.default.userApi;


exports.register = (req, res, next) => {
    sequelize.sync().then(() => users.findOne({ where: { email: req.body.email } }).then(_user => {
        console.log('_user : ' + _user);
        if (_user == null) {
            console.log('Not Registered');
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: "password hashing failed! detailed error as follows - " + err
                    });
                } else {
                    users.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        location: req.body.location
                    }).then((_user) => {
                        res.status(200).json({
                            message: "User # " + req.body.firstName + " " + req.body.lastName + " Registered Successfully",
                            user: _user
                        });
                    })
                }
            })
        } else {
            console.log('User Registered');
            return res.status(409).json({
                message: "User # " + req.body.firstName + " " + req.body.lastName + " already registered",
                user: _user
            })
        }

    }
    )
    )
}

exports.login = (req, res, next) => {

    sequelize.sync().then(() => users.findOne({
        where: { email: req.body.email }
    }).then(_user => {

        bcrypt.compare(req.body.password, _user.password, (err, result) => {
            if (err) {
                return res.status(409).json({
                    message: "authentication failed"
                });
            }

            if (result) {
                const token = jwt.sign(
                    {
                        email: _user.email,
                        userId: _user.userId
                    }, 'philance_secret',
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "authentication successful",
                    token: token
                });
            }
            res.status(409).json({
                message: "authentication failed"
            });
        });

    })
    )

}

exports.search = (req, res, next) => {
    //TODO: Add Validators
    var userSearchApi = userApi.search;
    var userName;

    if (Object.keys(req.body).length === 0) {                //if no seach body parameter is provided

        userSearchApi.findAllUsers((response) => {
            res.status(response.statusCode).send(response.responseData)
        })
        // sequelize.sync()
        //     .then(() => {
        //         users.findAll({
        //             attributes: ['user_id', 'location']
        //         })
        //             .then(_users => {
        //                 res.status(200).send(_users)
        //             })
        //     })

    } else {                                                  //if seach body parameter is provided
        var firstName = req.body.fname;
        var personType = req.body.pType;
        var lastName = req.body.lname;
        var location = req.body.loc;
        var distance = req.body.dist;
        if (firstName && lastName) {
            //if only first name/ last name is provided
            if ((firstName && lastName) && (personType == null && distance == null && location == null)) {
                userSearchApi.findUsersWithFirstName(req,(err,response) => {
                    if(err){
                        console.log(err)
                        res.status(response.statusCode).send(err);
                    }else{
                        res.status(response.statusCode).send(response.responseData);
                    }
                })
            }
            //if distance/location is provided    
        }
        else {
            if (((distance || location))) {
                if (distance == null) {
                    return res.status(409).send('please provide distance')
                }
                if (location == null) {
                    return res.status(409).send('please provide a location')
                }

                userSearchApi.findUsersWithLocation.onlyWithLocation(req,(err,response)=>{
                    if(err){
                        res.status(response.statusCode).send(err);
                    }else{
                        res.status(response.statusCode).send(response.responseData);
                    }
                })

            }

        }
        //TODO if firstname/ Last name is provided with distance

        // res.status(200).send(req.query);
    }
}

exports.passwordReset = (req, res, next) => {
    //   User.remove({ _id: req.params.userId })
    //     .exec()
    //     .then(result => {
    //       res.status(200).json({
    //         message: "User deleted"
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       res.status(500).json({
    //         error: err
    //       });
    //     });
    console.log("In user password reset Controller");
};


