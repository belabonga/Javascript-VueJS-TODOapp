const { comparePass, signToken } = require('../../helpers/helper')
    , { User }                   = require('../../models/')
    , { OAuth2Client }           = require("google-auth-library")
    , chalk                      = require('chalk');

require('dotenv').config();

class Controller {
    //? LOGIN
    // POST /login
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // CHECK EMAIL AVAILABILITY
            const checkUser = await User.findOne({
                where: { email },
            });

            
            if (!checkUser) {
                throw { name: "CREDENTIAL_INVALID" };
            }
            
            // CHECK & COMPARE PASSWORD
            const checkPassword = comparePass(password, checkUser.password);
            
            // CHECK AND THROW ERROR
            if (!checkPassword) {
                throw { name: "CREDENTIAL_INVALID" };
            }

            // CREATE TOKEN
            const payload = {
                id: checkUser.id,
            };

            // GET ACCESS TOKEN FROM .ENV FILE
            // env code : RAHASIABANGETLOHINI
            const access_token = signToken(payload);

            // SEND DATA
            res.status(200).json({
                access_token : access_token,
                message : `User ${checkUser.username} has successfully logged in`,
                username : checkUser.username,
            });

            console.log(chalk.green('SUCCESS FROM CONTROLLER : POST /login'));
        } catch (error) {
            console.log(chalk.red('ERROR FROM LOGIN CONTROLLER : '), error);
            next(error);
        }
    }

    //?  REGISTER
    // POST /register
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;

            const data = await User.create({
                username,
                email,
                password,
                role: `admin`,
                phoneNumber,
                address,
            });

            res.status(201).json({
                message: "New user has been created successfully",
                data: {
                    id: data.id,
                    email: data.email,
                    username: data.username,
                },
            });

            console.log(chalk.green('SUCCESS FROM CONTROLLER : POST /login'));
        } catch (error) {
            console.log(chalk.red('ERROR FROM REGISTER CONTROLLER : '), error);
            next(error);
        }
    }
}

module.exports = Controller