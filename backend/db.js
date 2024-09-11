const mongoose =require('mongoose');
const mongoURI="mongodb://localhost:27017"
const connecToMongo=()=>
{
    mongoose.connect(mongoURI,()=>
    {
        console.log("connected to Mongo Successfully")
    })
}
module.exports=connecToMongo;