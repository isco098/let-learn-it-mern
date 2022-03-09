const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

const User = require('../models/User');

/**
 * Check user login
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }
        res.json({
            success: true,
            user: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
})

/**
 * POST api/auth/register
 */
router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({success: false, message: 'Tài khoản và mật khẩu ko được để trống'});
    }
    try {
        // kiểm tra user đã tồn tại hay chưa
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({success: false, message:'Tài khoản đã tồn tại'});
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({username, password: hashedPassword});
        await newUser.save();

        // return token
        const accessToken = jwt.sign(
            {userId: newUser._id}, 
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({success: true, message:"Tạo tài khoản thành công", accessToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

/**
 * POST api/auth/login
 */
router.post('/login', async(req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            success: false, 
            message: 'Tài khoản và mật khẩu ko được để trống',
        });
    }
    try {
        /** kiểm tra username có tồn tại hay ko */
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false, 
                message:'Tài Khoản hoặc mật khẩu không chính xác'
            });
        }

        /** kiểm tra mật khẩu có đúng với username hay ko */
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid){
            return res.status(400).json({
                success:false, 
                message:'Tài Khoản hoặc mật khẩu không chính xác'
            }); 
        }

        /** Login success */
        const accessToken = jwt.sign(
            {userId: user._id}, 
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true, 
            message:"Đăng nhập thành công", 
            accessToken
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
});

module.exports = router;
