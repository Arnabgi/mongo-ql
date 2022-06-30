//const users = require('../data.js');
const users = require('../Model/usermodel');
const reslovers ={
    Query : {
        async getAllUsers(root, args, context, info){
            let user_data = await users.find({});
            console.log(user_data);
            return user_data;
        },
        async getUser(root, args, context, info){
            let userid = await users.findOne({ _id : args._id });
            //console.log(userid);
            return userid;
        }
    },
    Mutation : {
        async add(parent,args){
            const {name,email,password} = args;
            const user = new users({
                name,
                email,
                password
            })
            await user.save();
            return user;
        }
    }
}
module.exports = reslovers;