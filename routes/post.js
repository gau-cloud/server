var express = require('express')
var router = express.Router();
const upload = require('../modules/multer')
const postController = require('../controllers/post')
const authUtil = require('../middlewares/auth').checkToken

// 5. 게시글 등록
router.post('/',authUtil,upload.single('data'),postController.createPost)

// 6. 게시글 불러오기 - 좋아요 순
router.get('/likes/:month',authUtil,postController.getPostArrangedByLikesCount)

// 7. 게시글 불러오기 - 최신순
router.get('/newest/:month',authUtil,postController.getPostArrangedByCreatedAt)

// router.get('/all',authUtil,postController.getAllPost)

// 8. 게시글 수정
router.put('/:postIdx',authUtil,postController.updatePost)

// 9. 게시글 삭제
router.delete('/:postIdx',authUtil,postController.deletePost)

// 10. 게시글 좋아요
router.post('/like/:postIdx',authUtil,postController.createPostLike)

// 11. 게시글 좋아요 해제
router.delete('/dislike/:postIdx',authUtil,postController.deletePostLike)

// 12. 게시글 댓글 달기
router.post('/comment/:postIdx',authUtil,postController.createPostComment)

// 13. 게시글 댓글 수정
router.put('/comment/:postCommentsIdx',authUtil,postController.updatePostComment)

// 14. 게시글 댓글 삭제
router.delete('/comment/:postCommentIdx',authUtil,postController.deletePostComment)

// 15. 게시글 댓글 좋아요
router.post('/comments/like/:postCommentsIdx',authUtil,postController.createPostCommentLike)

// 16. 게시글 댓글 좋아요 해제
router.delete('/comments/dislike/:postCommentsIdx',authUtil,postController.deletePostCommentLike)

// 17. 개별 게시글
router.get('/comments/:postIdx',authUtil,postController.getPostComments)

router.post('/notice/:postIdx',authUtil,postController.createNotice)

// router.post('/notice',authUtil,postController.createNotice)

// router.get('/notice',authUtil,postController.getNotice)

// router.delete('/notice/:noticeIdx',authUtil,postController.deleteNotice)


module.exports = router;