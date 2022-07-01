//const users = require('../data.js');
const { update } = require('../Model/usermodel');
const users = require('../Model/usermodel');
const service = require('../Services/log');
const bcrypt = require('bcrypt');
const reslovers ={
    Query : {

        async getAllUsers(root, args, context, info){
            let user_data = await users.find({});
            if(user_data){
                return {"data" : user_data, "message":{"status" : 200, "message" : "Data fetched successfully"}};
            }
            else{
                return {"data" : user_data, "message":{"status" : 401, "message" : "Failed to data fetched"}};
            }
        },

        async getUser(root, args, context, info){
            let userid = await users.findOne({ _id : args._id });
            if(!userid){
                //console.log(userid);
                return {"data" : userid, "message":{"status" : 401, "message" : "Failed to data fetched"}};
            }
            else{
                console.log("userid====",userid);
                return {"data" : userid, "message":{userid, "status" : 200, "message" : "Data fetched successfully"}};
            }
        }
    },



    Mutation : {
        // async add(parent,args){
        //     const {name,email,password} = args;
        //     const user = new users({
        //         name,
        //         email,
        //         password
        //     })
        //     await user.save();
        //     return user;
        // },

        async add(parent,args){
            const salt = await bcrypt.genSalt(10);
            let token = process.env.JWT_SECRET_KEY;
            try {
                const data ={
                    name : args.name,
                    email : args.email,
                    password : await bcrypt.hash(args.password,salt)
                }
                let save_data = await service.insertData(data,token);
                if(save_data){
                    //console.log(save_data);
                    return {"status":200,"message":"User created successfully","data":save_data};
                }
                else{
                    return {"status":401,"message":"User created failed"};
                }
                
            } catch (error) {
                return {"status":401,"message":error};
            }
           
        },

        async delete(parent,args){
            const delete_user = await users.findByIdAndDelete({_id : args._id});
            if(!delete_user){
                return {"status":401,"message":"User deleted failed"};
            }
            else{
                return {"status":200,"message":"User deleted successfully"};
            }
        },

        async update(parent,args){
            const update_user = await users.findByIdAndUpdate({_id : args._id},{
                name : args.name,
                email : args.email,
                password : args.password
            });
            if(!update_user){
                 return {"status":401,"message":"User updated failed"};
            }
            else{
                return {"status":200,"message":"User updated successfully"};
            }
        },

        async logIn(parent,args){
            try {
                const logToken = process.env.JWT_LOGIN_KEY;
                const logValue = {
                    email : args.email,
                    password : args.password
                }
               const login = await service.signIn(logValue,logToken);
               if(login){
                return {"status":200,"message":"Login successfully","data":login};
               }
               else{
                return {"status":401,"message":"Login failed"};
               }
            } catch (error) {
                return {"status":401,"message":error};
            }
        }
    }
}
module.exports = reslovers;