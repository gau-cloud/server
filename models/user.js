const pool = require('../modules/pool');
const table_user = 'user';
const table_post = 'post';
const crypto = require('crypto');

const user ={
    signup:async(id,hashedPw,salt,name,data)=>{
        const fields = 'id,password,salt,name,data'

        const query = `INSERT INTO ${table_user}(${fields}) VALUES ('${id}','${hashedPw}','${salt}','${name}','${data}')`

        try{
            const result = await pool.queryParam(query);
            return result
        }catch(err){
            throw err;
        }
    },
    signin:async(id,password)=>{
        const query = `SELECT * FROM ${table_user} WHERE id="${id}"`
        try {
            const userData = await pool.queryParam(query);
            const hashedPw = crypto.pbkdf2Sync(password, userData[0].salt, 1, 32, 'sha512').toString('hex')

            if (userData[0].password === hashedPw) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    },
    getPostLikes:async(userIdx)=>{

    },
    getPostCommentsLikes:async()=>{

    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table_user} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (error) {
            throw error
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table_user} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (error) {
            if (error.errno = 1062) {
                console.log('checkUser ERROR :', err.errno, err.code);
                return -1;
            }
            console.log('checkUser :', error)
        }
    },
    test:async()=>{
        const query = `SELECT * FROM ${table_user}`
        try{
            const result = await pool.queryParam(query)
            return result;
        }catch(err){
            throw err;
        }
    }
}

module.exports=user;