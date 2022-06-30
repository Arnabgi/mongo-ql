const mongoose = require('mongoose');

//database connection......
// mongoose.connect('mongodb://localhost:27017/test',(err)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Mongo Database connected...`);
//     }
// });

const connect = mongoose.connect('mongodb://localhost:27017/test').then(()=>{
    console.log(`Mongo Database connected...`);
})
.catch((e)=>{
    console.log(e);
});

module.exports = connect;