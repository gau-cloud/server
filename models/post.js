const pool = require('../modules/pool');
const table_user = 'user';
const table_post = 'post';
const table_post_comments = 'post_comments'
const table_post_comments_likes = 'post_comments_likes'
const table_post_likes = 'post_likes'

const post ={
    createPost: async (title,description,userIdx,data)=>{
        const query = `INSERT INTO ${table_post}(title,description,user_idx,data) VALUES('${title}','${description}','${userIdx}','${data}')`
        try{
            const result = await pool.queryParam(query);
            return result.insertId;            
        }catch(err){
            throw err;
        }
    },
    getPostArrangedByLikesCount:async(month)=>{
        const query = 
        `SELECT * FROM post WHERE MONTH(created_at) = ${month} ORDER BY likes DESC`
        try{
         const result = await pool.queryParam(query);
         return result;
        }catch(err){
            throw err;
        }
    },
    getPostArrangedByCreatedAt:async(month)=>{
        const query = 
        `SELECT * FROM post WHERE MONTH(created_at) = ${month} ORDER BY created_at DESC`
        try{
         const result = await pool.queryParam(query);
         return result;
        }catch(err){
            throw err;
        }
    },
    getPostComments:async(postIdx,userIdx)=>{
        const query = 
        `SELECT post_comments_idx,name,description,post_comments.created_at,likes FROM post_comments JOIN user ON post_comments.user_idx=user.user_idx WHERE post_idx=${postIdx} ORDER BY created_at DESC;`
        try{
            const result = await pool.queryParam(query);
            // for(var i in result){
            //     let post_comments_idx = BigInt(result[i].post_comments_idx)
            //     const postCommentsLikesCheckQuery = `SELECT * FROM ${table_post_comments_likes} WHERE post_comments_idx=${post_comments_idx} AND user_idx=${userIdx}`
            //     const Queryresult = await pool.queryParam(postCommentsLikesCheckQuery)
            //     let flag;
            //     if(Queryresult==null||Queryresult==undefined||Queryresult==""){
            //         flag=false
            //     }else{
            //         flag=true
            //     }
            //     if(flag){
            //         result[i].post_comments_likes=true;
            //     }else{
            //         result[i].post_comments_likes=false;
            //     }
            // }
            return result;
        }catch(err){
            throw err;
        }
    },
    checkUser:async(postIdx,userIdx)=>{
        const query = `SELECT user_idx from ${table_post} WHERE post_idx=${postIdx}`
        try{
            const getUserIdx = await pool.queryParam(query)
            if(getUserIdx[0].user_idx===userIdx){
                return true;
            }else{
                return false;
            }
        }catch{
            throw err;
        }
    },
    deletePost:async(postIdx)=>{
        const queryPostCommentsLikes = 
        `
        SET SQL_SAFE_UPDATES = 0;
        DELETE ${table_post_comments_likes}
        FROM post_comments_likes JOIN post_comments ON post_comments.post_comments_idx=post_comments_likes.post_comments_idx WHERE post_idx=${postIdx};
        SET SQL_SAFE_UPDATES = 1;
        `
        const queryPostComments = `DELETE from ${table_post_comments} WHERE post_idx=${postIdx}`
        const queryPostLikes = `DELETE from ${table_post_likes} WHERE post_idx=${postIdx}`
        const queryPost = `DELETE from ${table_post} WHERE post_idx=${postIdx}`
        try{
            const queryPostCommentsLikesResult = await pool.queryParam(queryPostCommentsLikes)
            const queryPostCommentsResult = await pool.queryParam(queryPostComments)
            const queryPostLikesResult = await pool.queryParam(queryPostLikes)
            const queryPostResult = await pool.queryParam(queryPost)
            return true;
        }catch(err){
            throw err;
        }
    },
    updatePost:async(postIdx,title,description)=>{
        const query = `UPDATE ${table_post} SET title="${title}", description="${description}" WHERE post_idx=${postIdx}`
        try{
            const result = await pool.queryParam(query)
            return result.protocol41;
        }
        catch(err){
            throw err;
        }
    },
    checkPostLikes:async(postIdx,userIdx)=>{
        const query = `SELECT * FROM post_likes WHERE post_idx=${postIdx} AND user_idx=${userIdx}`
        try{
            const result = await pool.queryParam(query)
            if(result==null||result==undefined||result==""){
                return false;
            }else{
                return true;
            }
        }catch(err){
            throw err;
        }
    },
    checkPostIdx:async(postIdx)=>{
        const query = `SELECT * FROM ${table_post} WHERE post_idx=${postIdx}`
        try{
            const result = await pool.queryParam(query)
            if(result==null||result==undefined||result==""){
                return false;
            }else{
                return true;
            }
        }catch(err){
            throw err;
        }
    },
    createPostLikes:async(postIdx,userIdx)=>{
        const query = `INSERT INTO ${table_post_likes}(post_idx,user_idx) VALUES('${postIdx}','${userIdx}')`
        try{
            const insertResult = await pool.queryParam(query)
            const queryGetLikesCountFromPost = `SELECT likes FROM ${table_post} WHERE post_idx=${postIdx}`
            const likesCount = await pool.queryParam(queryGetLikesCountFromPost)
            const plusQuery = `UPDATE ${table_post} SET likes=${likesCount[0].likes}+1 WHERE post_idx=${postIdx}`
            const plusQueryResult = await pool.queryParam(plusQuery)
            return insertResult.protocol41; 
        }catch(err){
            throw err;
        }
    },
    deletePostLike:async(postIdx,userIdx)=>{
        const query = `DELETE FROM ${table_post_likes} WHERE post_idx=${postIdx} AND user_idx=${userIdx}`
        try{
            const insertResult = await pool.queryParam(query)
            const queryGetLikesCountFromPost = `SELECT likes FROM ${table_post} WHERE post_idx=${postIdx}`
            const likesCount = await pool.queryParam(queryGetLikesCountFromPost)
            const minusQuery = `UPDATE ${table_post} SET likes=${likesCount[0].likes}-1 WHERE post_idx=${postIdx}`
            const minusQueryResult = await pool.queryParam(minusQuery)
            return insertResult.protocol41
        }catch(err){
            throw err;
        }
    },
    createPostComment:async(postIdx,userIdx,description)=>{
        const query = `INSERT INTO ${table_post_comments}(post_idx,user_idx,description) VALUES(${postIdx},${userIdx},'${description}')`
        try{
            const result = await pool.queryParam(query)
            return result.protocol41;
        }catch(err){
            throw err;
        }
    },
    updatePostComment:async(postCommentsIdx,description)=>{
        const query = `UPDATE ${table_post_comments} SET description='${description}' WHERE post_comments_idx=${postCommentsIdx}`
        try{
            const result = await pool.queryParam(query)
            return result.protocol41;
        }catch(err){
            throw err;
        }
    },
    checkPostCommentsIdx:async(postCommentsIdx,userIdx)=>{
        const query = `SELECT * FROM ${table_post_comments} WHERE post_comments_idx=${postCommentsIdx} AND user_idx=${userIdx}`
        try{
            const result = await pool.queryParam(query)
            if(result==null||result==undefined||result==""){
                return false;
            }else{
                return true;
            }
        }catch(err){
            throw err;
        }
    },
    deletePostComment:async(postCommentsIdx)=>{
        const postCommentsLikesQuery = `DELETE FROM ${table_post_comments_likes} WHERE post_comments_idx=${postCommentsIdx}`
        const postCommentsQuery = `DELETE FROM ${table_post_comments} WHERE post_comments_idx=${postCommentsIdx}`
        try{
            const postCommentsLikesQueryResult = await pool.queryParam(postCommentsLikesQuery)
            const postCommentsQueryResult = await pool.queryParam(postCommentsQuery);
            return postCommentsQueryResult.protocol41
        }catch(err){
            throw err;
        }
    },
    checkPostCommentsLikeIdx:async(postCommentsIdx,userIdx)=>{
        const query = `SELECT * FROM ${table_post_comments_likes} WHERE post_comments_idx=${postCommentsIdx} AND user_idx=${userIdx}`
        try{
            const result = await pool.queryParam(query);
            if(result==null||result==undefined||result==""){
                return false;
            }else{
                return true;
            }
        }catch(err){
            throw err;
        }
    },
    createPostCommentLike:async(postCommentsIdx,userIdx)=>{
        const query = `INSERT INTO ${table_post_comments_likes}(post_comments_idx,user_idx) VALUES(${postCommentsIdx},${userIdx})`
        try{
            const result = await pool.queryParam(query)
            const queryGetLikesCountFromPostComments = `SELECT likes FROM ${table_post_comments} WHERE post_comments_idx=${postCommentsIdx}`
            const likesCount = await pool.queryParam(queryGetLikesCountFromPostComments)
            const plusQuery = `UPDATE ${table_post_comments} SET likes=${likesCount[0].likes}+1 WHERE post_comments_idx=${postCommentsIdx}`
            const plusQueryResult = await pool.queryParam(plusQuery)
            return result.protocol41
        }catch(err){
            throw err;
        }
    },
    deletePostCommentLike:async(postCommentsIdx,userIdx)=>{
        const query = `DELETE FROM ${table_post_comments_likes} WHERE post_comments_idx=${postCommentsIdx} AND user_idx=${userIdx}`
        try{
            const result = await pool.queryParam(query)
            const queryGetLikesCountFromPostComments = `SELECT likes FROM ${table_post_comments} WHERE post_comments_idx=${postCommentsIdx}`
            const likesCount = await pool.queryParam(queryGetLikesCountFromPostComments)
            const miusQuery = `UPDATE ${table_post_comments} SET likes=${likesCount[0].likes}-1 WHERE post_comments_idx=${postCommentsIdx}`
            const miusQueryResult = await pool.queryParam(miusQuery)
            return result.protocol41
        }catch(err){
            throw err;
        }
    },
    getUserPosts:async(userIdx)=>{
        const query = `SELECT post_idx,title,description,data,likes,created_at FROM ${table_post} WHERE user_idx=${userIdx}`
        try{
            const result = await pool.queryParam(query)
            return result;
        }catch(err){
            throw err;
        }
    },
    getUserLikePosts:async(userIdx)=>{
        const query = `SELECT post.post_idx,title,description,data,likes,created_at FROM ${table_post_likes} JOIN ${table_post} ON post.post_idx=post_likes.post_idx;`
        try{
            const result = await pool.queryParam(query)
            return result;
        }catch(err){
            throw err;
        }
    }
}

module.exports=post;