const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('crypto');
const jwt = require('../modules/jwt');

const Post = require('../models/post');
const User = require('../models/user');

const user = {
    signup:async(req,res)=>{
        var data='';
        if(req.file !== undefined){
            data = req.file.location;
        }
        const {
            id,
            password,
            name
        } = req.body;

        if(!id||!password||!name){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.BAD_REQUEST));
        }

        // user id duplicated check
        const salt = crypto.randomBytes(32).toString()
        const hashedPw = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex')

         await User.signup(id,hashedPw,salt,name,data);

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATE_USER_SUCCESS))

    },
    signin:async(req,res)=>{
        const {
            id,password
        } = req.body;
        
    if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMsg.NULL_VALUE))
    }

    console.log("service-a")
    if (await User.checkUser(id) === false) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMsg.DB_ERROR))
    }

        console.log("service-b")
        const result = await User.signin(id, password)

    if (result === false) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMsg.DB_ERROR))
    }

    console.log("service-c")
    const userData = await User.getUserById(id)
    const jwtToken = await jwt.sign(userData[0])

    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
        token: jwtToken.token
    }))
    },
    getPostLikes:async(req,res)=>{
        const userIdx = req.idx;

        const result = await Post.getUserLikePosts(userIdx)

        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.GET_USER_LIKE_POST_SUCCESS, {
            post_list: result
        }))
    },
    getPostCommentsLikes:async(req,res)=>{
        const userIdx = req.idx;

        const result = await Post.getUserLikePostComments(userIdx)

        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.GET_USER_LIKE_POST_SUCCESS, {
            result: result
        }))
    },
    getPostOfUser:async(req,res)=>{
        const userIdx = req.idx;

        const result = await Post.getUserPosts(userIdx)

        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.GET_USER_POST_SUCCESS, {
            post_list: result
        }))
    },
    test:async(req,res)=>{
        const result = await User.test();
        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.ALREADY_ID,{
            post_list:result
        }))
    },

    getJwtAuth: async(req, res)=>{

        if(!req.user) return res.json({ isAuth : false});

        return res.json({
            _id : req.user.idx,
            isAuth: true
        })
    
        
        
    }

}

module.exports=user;