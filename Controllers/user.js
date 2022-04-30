const userModel = require('../Models/user');
const { default: mongoose } = require('mongoose');

async function getAllUsers(req, res, next) {
    try {

        let response = await userModel.find({});
        res.json(response);

    } catch (error) {
        res.status(500).json(error);
    }
}

async function createUser(req, res, next) {
    //fetch info from request body
    try {
        console.log("req.body", req.body);
        let userDetail = req.body;
        let response = await userModel.insertMany([userDetail]);
        res.json(response);

    } catch (error) {
        res.json(error);
    }
}

async function deleteUser(req, res, next) {
    let userId = req.params.userId;
    let response = await userModel.deleteOne({ userId: userId });
    res.json(response);
}

async function signIn(req, res, next) {

    //Validate email and password
    const userDetail = await userModel.findOne({ email: req.body.email });
    console.log(userDetail, req.body.password)
    const isValidPassword = encryptDecrypt.decryptPassword(req.body.password, userDetail.password);

    if (isValidPassword) {
        let userData = {
            "email": req.body.email,
            "firstName": userDetail.firstName,
            "lastName": userDetail.lastName,
            "roleName": "ADMIN"

        }

        //Generate JWT token and send back to frontend
        let JWTtoken = JWTService.generateToken(userData);
        res.json({
            status: 'success',
            token: JWTtoken
        })
    } else {
        res.json({ message: "password is not valid" });
    }

}

async function signUp(req, res, next) {
    let userDetail = req.body;
    console.log(userDetail)
    const encryptPassword = encryptDecrypt.encryptPassword(userDetail.password);
    console.log(encryptPassword);
    userDetail.password = encryptPassword;
    console.log(userDetail);
    const response = await userModel.insertMany([userDetail]);
    res.json(response);
}


module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    signIn,
    signUp
}


