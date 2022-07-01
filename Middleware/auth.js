const jwt = require('jsonwebtoken');
module.exports ={
    data : async(reslove,root,args, context, info) => {
        try {
            const fieldName = info['fieldName'];
            if(fieldName == 'getUser'){
                let req = context.req;
                let token = req.headers['authorization'].split(" ")[1];
                const verify_token = await jwt.verify(token,process.env.JWT_SECRET_KEY);
                //context.verify_token = verify_token;
                return reslove(root,args, context, info);
            }
            else{
                return reslove(root,args, context, info);
            }

        } catch (error) {
            throw new Error("Authorization failed");
        }
    }
}