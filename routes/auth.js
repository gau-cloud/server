var express = require('express')
var router = express.Router();
const upload = require('../modules/multer')
const userController = require('../controllers/user')
const authUtil = require('../middlewares/auth').checkToken

// 1. 회원가입
router.post('/signup',upload.single('data'),userController.signup)

// 2. 로그인
router.post('/signin', userController.signin)

// 3. 내가 좋아한 게시글 불러오기
router.get('/post-likes',authUtil,userController.getPostLikes)

// 4. 내가 좋아한 댓글 불러오기   => 보류
router.get('/post-comments-likes',authUtil,userController.getPostCommentsLikes)

// 5. 내가 올린 게시글 불러오기
router.get('/post-mine',authUtil,userController.getPostOfUser)

router.post('/jwtauth', authUtil, userController.getJwtAuth)

router.get('/test',authUtil,userController.test)

module.exports=router;