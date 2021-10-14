const mongoose=require('mongoose')
//connect server to db

mongoose.connect("mongodb://localhost:27017/bankApp",{
    useNewUrlParser:true
})

//Modal Creation
const User=mongoose.model('User',{
    uname:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]

})
module.exports={
    User
}