const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('crypto');

const Post = require('../models/post');
const User = require('../models/user');

const post = {
    createPost:async(req,res)=>{

        const userIdx = req.idx;

        var data='';
        if(req.file !== undefined){
            data = req.file.location;
        }
        const{
            title,
            description
        } = req.body;

        if(!title||!description){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.BAD_REQUEST));
        }
        const insertIdx = await Post.createPost(title,description,userIdx,data);
        
        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATE_POST_SUCCESS,{
            insertIdx:insertIdx
        }))

    },
    getPostArrangedByLikesCount:async(req,res)=>{
        const userIdx = req.idx;
        const month = req.params.month;
        
        if(!month){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.BAD_REQUEST));
        }

        const result = await Post.getPostArrangedByLikesCount(month)

        for(var i in result){
            // result[i].comments = await Post.getPostComments(i+1,userIdx)
            // if(await Post.checkPostLikes(result[i].post_idx,userIdx)){
            //     result[i].post_likes = true
            // }else{
            //     result[i].post_likes = false
            // }   
        }

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_POST_SUCCESS,{
            data:result
        }))
    },
    getPostArrangedByCreatedAt:async(req,res)=>{
        const userIdx = req.idx;
        const month = req.params.month;
        
        if(!month){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.BAD_REQUEST));
        }

        const result = await Post.getPostArrangedByCreatedAt(month)

        // for(var i in result){
        //     result[i].comments = await Post.getPostComments(i+1,userIdx)
        //     if(await Post.checkPostLikes(result[i].post_idx,userIdx)){
        //         result[i].postLikes = true
        //     }else{
        //         result[i].postLikes = false
        //     }   
        // }

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_POST_SUCCESS,{
            data:result
        }))
    },
    updatePost:async(req,res)=>{
        const userIdx = req.idx
        const{
            post_idx,
            title,
            description
        } = req.body;
        
        if(!await Post.checkUser(post_idx,userIdx)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.AUTH_FAIL));
        }

        const result = await Post.updatePost(post_idx,title,description)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_POST_SUCCESS,{
            data:result
        }))
    },
    deletePost:async(req,res)=>{
        const postIdx = req.params.postIdx
        const userIdx = req.idx

        const intPostIdx = parseInt(postIdx)
        const intUserIdx = parseInt(userIdx)

        if(!await Post.checkUser(intPostIdx,intUserIdx)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.AUTH_FAIL));
        }

        const result = await Post.deletePost(intPostIdx)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST_SUCCESS,{
            data:result
        }))
    },
    createPostLike:async(req,res)=>{
        const userIdx = req.idx;
        const postIdx = req.params.postIdx;

        if(!await Post.checkPostIdx(postIdx)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.POST_NOT_EXIST));
        }

        // 좋아요 이미 돼있으면 중복 메세지 반환
        if(await Post.checkPostLikes(postIdx,userIdx)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.POST_DUPLICATED_LIKE));
        }
        
        const result = await Post.createPostLikes(postIdx,userIdx)
        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATE_POST_LIKES_SUCCESS,{
            data:result
        }))
    },
    deletePostLike:async(req,res)=>{
        const userIdx = req.idx;
        const postIdx = req.params.postIdx;

        if(!await Post.checkPostIdx(postIdx)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.POST_NOT_EXIST));
        }

        // 좋아요가 없으면 메세지 반환
        if(!await Post.checkPostLikes(postIdx,userIdx)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.POST_LIKE_NOT_EXIST));
        }

        const result = await Post.deletePostLike(postIdx,userIdx)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST_LIKE_SUCCESS,{
            data:result
        }))

    },
    createPostComment:async(req,res)=>{
        const userIdx = req.idx;
        const {
            post_idx,
            description
        } = req.body;

        if(!post_idx||!description){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE))
        }

        const result = await Post.createPostComment(post_idx,userIdx,description)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATE_POST_COMMENT_SUCCESS,{
            data:result
        }))
    },
    createPostCommentLike:async(req,res)=>{
        const userIdx = req.idx
        const postCommentsIdx = req.params.postCommentsIdx;

        // 있으면 true, 없으면 false 반환
        if(await Post.checkPostCommentsLikeIdx(postCommentsIdx,userIdx)){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.POST_COMMENTS_DUPLICATED_LIKE))
        }

        const result = await Post.createPostCommentLike(postCommentsIdx,userIdx)
        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATE_POST_COMMENT_LIKE_SUCCESS,{
            data:result
        }))
    },
    deletePostCommentLike:async(req,res)=>{
        const userIdx = req.idx
        const postCommentsIdx = req.params.postCommentsIdx;

        // 있으면 true, 없으면 false 반환
        if(!await Post.checkPostCommentsLikeIdx(postCommentsIdx,userIdx)){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.POST_COMMENTS_LIKE_NOT_EXSIT))
        }

        const result = await Post.deletePostCommentLike(postCommentsIdx,userIdx)
        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST_COMMENT_LIKE_SUCCESS,{
            data:result
        }))
    },
    updatePostComment:async(req,res)=>{
        const userIdx = req.idx;
        
        const {
            post_comments_idx,
            description
        } = req.body;

        if(!post_comments_idx||!description){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE))
        }

        if(!await Post.checkPostCommentsIdx(post_comments_idx,userIdx)){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.AUTH_FAIL))
        }

        const result = await Post.updatePostComment(post_comments_idx,description)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_POST_COMMENT_SUCCESS,{
            data:result
        }))
    },
    deletePostComment:async(req,res)=>{
        const userIdx = req.idx;
        const postCommentIdx = req.params.postCommentIdx;

        if(!await Post.checkPostCommentsIdx(postCommentIdx,userIdx)){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.AUTH_FAIL))
        }

        const result = await Post.deletePostComment(postCommentIdx)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST_COMMENT_SUCCESS,{
            data:result
        }))
    },
    getPostComments:async(req,res)=>{
        const userIdx = req.idx
        const postIdx = req.params.postIdx;

                // for(var i in result){
        //     result[i].comments = await Post.getPostComments(i+1,userIdx)
        //     if(await Post.checkPostLikes(result[i].post_idx,userIdx)){
        //         result[i].postLikes = true
        //     }else{
        //         result[i].postLikes = false
        //     }   
        // }

        const result = await Post.getPostComments(postIdx,userIdx);
        console.log(result)

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_POST_COMMENTS_SUCCESS,{
            data:result
        }))

    }
}

module.exports=post;
