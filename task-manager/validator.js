class validator{

    static validateTaskInfo(taskbody){

        if(taskbody.hasOwnProperty("title")&&taskbody.hasOwnProperty("description")){
            return {
                "status":true,
                "message":"validated"
            }
        }
        else{
            return {
                "status":false,
                 "message":"title or description is manadatory field"
            }
        }
    }
    static validateUserInfo(userbody){

        if(taskbody.hasOwnProperty("userName")&&taskbody.hasOwnProperty("password")){
            return {
                "status":true,
                "message":"validated"
            }
        }
        else{
            return {
                "status":false,
                 "message":"title or description is manadatory field"
            }
        }
    }
    static validateUser(users,userName,password){
        return users.some(user => user.userName === userName && user.password === password);

    }
}
module.exports=validator;