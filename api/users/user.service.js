const pool = require('../../config/database');

module.exports = {
create: (data ,callBack)=>{
pool.query(
    `insert into registration(id, firstName, lastName, gender, email, password, job)
    values(?,?,?,?,?,?,?)`,
    [
        data.id,
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.job
        
    ],
    (error,results,fields)=>{
        if(error){
           return callBack(error);
        }
        return callBack(null,results)
    }
)
},
getUsers: callBack => {
    pool.query(
    `select * from registration `,
    [],
    (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
    }

    );
},
getUserByUserId: (job, callBack) => {
    pool.query(
    `select firstName, job from registration WHERE job = ? `,
    [job],
    (error, results, fields) => {
        if(error){
           return callBack(error);
        }
        return callBack(null, results);
    }

    );
},
updateUser: (data ,callBack)=>{
    pool.query(
        `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, job=? where id = ?`,
        
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.job,
            data.id
        ],
        (error,results,fields)=>{
            if(error){
               return callBack(error);
            }
            return callBack(null,results);
        }
    )
},
deleteUser: (data, callBack) => {
    pool.query(
    `delete from registration WHERE id = ? `,
    [data.id],
    (error, results, fields) => {
        if(error){
           return callBack(error);
        }
       // console.log(results)
        return callBack(null, results);
    }

    );
},
getUserByUserEmail: (email,callBack) => {
    pool.query(
        `select * from registration WHERE email = ?`,
        [email],
        (error, results, fields) => {
            if (error){
               return callBack(error);
            }
            //console.log(results[0])
            return callBack(null,results[0]);
        }
    );
}

};