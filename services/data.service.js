const db = require('./db')
const jwt=require('jsonwebtoken')
let user={
    1000:{uname:"abijith",acno:1000,password:"userone",balance:5000,transaction:[]},
    1001:{uname:"neer",acno:1001,password:"usertwo",balance:6000,transaction:[]},
    1002:{uname:"amal",acno:1002,password:"userthree",balance:8000,transaction:[]},
    1003:{uname:"varun",acno:1003,password:"userfour",balance:7000,transaction:[]}
  }
  const register = (uname,acno,password,balance) => {
   return db.User.findOne({acno})
   .then(user =>{
     console.log(user)
     if (user) {
      return {
             statusCode:422,
             status:false,
             message:"user already exists...plz log in"
           }

       
     }
     else
     {
       const newUser=new db.User({
        uname,
             acno,
             password,
             balance,
             transaction:[]
       })
       newUser.save()
       return{
             statusCode:200,
             status:true,
             message:"registration successful"
           }
     }
   })
      console.log("register called");
      //return
    //let accDetails=this.user
    // if(acno in user )
    // {
    //   return {
    //     statusCode:422,
    //     status:false,
    //     message:"user already exists...plz log in"
    //   }

    // }
    // else{
    //   user[acno]={
    //     uname,
    //     acno,
    //     password,
    //     balance,
    //     transaction:[]
    //   }
    //   console.log(user)
    //  // this.savedetails()
    //   return{
    //     statusCode:200,
    //     status:true,
    //     message:"registration successful"
    //   }
    // }

  }

  const login=(acno,password)=>{
    //let accdetails=this.user
    return db.User.findOne({acno,password})
    .then(user=>{
      if (user) {
        const token=jwt.sign({
          currentNo:acno
        },'supersecretkey123123')
        return {
          statusCode:200,
          status:true,
          message:"login successful",
          token,
          currentUser:user.uname
          
        }
        
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"invalid username and password"
        }
      }

      })
    }
    
  //   if(acno in user)
  //   {
  //     if(pswd==user[acno]["password"])
  //     {
  //       currentUser=user[acno]["uname"]
  //       AccountNum=acno
  //       //req.session.currentNo=user[acno]
  //       //create token
  //       const token=jwt.sign({
  //         currentNo:acno
  //       },'supersecretkey123123')
  //      // this.savedetails()
  //       return {
  //         statusCode:200,
  //         status:true,
  //         message:"login successful",
  //         token
  //       }
  //       //alert("login sucessful")
  //      // this.router.navigateByUrl('dashboard')
  //     }
  //     else{
  //       //alert("invalid password")
  //       return {
  //         statusCode:422,
  //         status:false,
  //         message:"login failed"
  //       }
  //     }
  //   }
  //   else
  //   {
  //     //alert("invalid user")
  //     return {
  //       statusCode:422,
  //       status:false,
  //       message:"invalid user"
  //     }
  //   }

  // }

  const deposit=(acno,password,amount)=>{
    
    var  amt=parseInt(amount)
    return db.User.findOne({acno,password})
    .then(user=>{
      if (!user) {
        return{
          statusCode:422,
          status:false,
          message:"invalid  credentials"
        }
        
        
      }
      
        user.balance+=amt
       // user.save()
        user.transaction.push({
          amount:amt,
          type:"CREDIT"
        })
        user.save()
        return {
          statusCode:200,
          status:true,
          message:amt + "deposited successfully & new balance is"+ user.balance,
        }

      

    })
   // let accdetails=this.user
    // if(acno in user)
    // {
    //   if(password==user[acno]["password"])
    //   {
        
    //     user[acno]["balance"]+=amt
    //     user[acno]["transaction"].push({
    //       amount:amt,
    //       type:"CREDIT"
    //     })
    //     //this.savedetails()
    //     //console.log(accdetails)
    //     return {
    //       statusCode:200,
    //       status:true,
    //       message:amt + "deposited successfully & new balance is"+ user[acno]["balance"]
    //     }
    //     //return user[acno]["balance"]
        
        
        
    //   }
    //   else{
    //     return{
    //       statusCode:422,
    //       status:false,
    //       message:"invalid  password"
    //     }
        
    //   }
    // }
    // else{
    //   return{
    //     statusCode:422,
    //     status:false,
    //     message:"invalid  username"
    //   }
      
    // }


  }

 const withdraw=(req,acno,password,amount)=>{
    var  amt=parseInt(amount)
    return db.User.findOne({acno,password})
    .then(user=>{
      if (!user) {
        
        return{
          statusCode:422,
          status:false,
          message:"invalid credentials"
        }
        
      }
      if (user.balance<amt) {
        return{
          statusCode:422,
          status:false,
          message:"insufficient balance"
        }
        
      }
      if (req.currentacc!=user.acno) {

        return{
          statusCode:422,
          status:false,
          message:"operation denied"
        }
        
      }
      user.balance-=amt
      // user.save()
       user.transaction.push({
         amount:amt,
         type:"DEBIT"
       })
       user.save()
       return{
        statusCode:200,
        status:true,
        message:amt + "DEBITED successfully & new balance is"+ user.balance,

       }
    })
   
    // if(acno in user)
    // {
    //   if(password==user[acno]["password"])
    //   {
    //     if (user[acno]["balance"]>amt) 
    //     {
    //       user[acno]['balance']-=amt
    //       user[acno]["transaction"].push({
    //         amount:amt,
    //         type:"DEBIT"
    //       })

    //       //this.savedetails()
    //       //console.log(accdetails)
    //       //return accdetails[acno]["balance"]
    //       return{
    //         statusCode:200,
    //         status:true,
    //         message:amt +"debited successfully & balance is:" + user[acno]["balance"]
    //       }
          
    //     }
    //     else
    //     {
    //       //alert("insufficient balance")
    //       return{
    //         statusCode:422,
    //         status:false,
    //         message:"insufficient balance"
    //       }
    //     }
      
        
    //   }
    //    else{
    //     //alert("invalid password")
    //     return{
    //       statusCode:422,
    //       status:false,
    //       message:"invalid password"
    //     }
        
    //   }

    // }
    // else{
    //   //alert("invalid user")
    //   return{
    //     statusCode:422,
    //     status:false,
    //     message:"invalid user"
    //   }
    // }

  }
 const getTransaction=(acno)=>{
   return db.User.findOne({acno})
   .then(user=>{
     if (user) {
      
      return{
        statusCode:200,
        status:true,

        transaction:user.transaction
        }
    }
    else
      {
        return{
          statusCode:422,
          status:false,
          message:"invalid credentials"
        }
      
        
      }
       

      

       
     }
   )
  //  if (acno in user)
  //  {
  //    return{
  //      statusCode:200,
  //      status:true,
  //      transaction:user[acno].transaction
  //    }
  //  }
  //  else{
  //    return{
  //      statusCode:422,
  //      status:false,
  //      message:"invalid"
  //    }

  //  }
  //   //return user[acno].transaction
}  

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if (user) {
      return{
        statusCode:200,
        status:true,

       message:"Account Deleted successfully"
        }
      
    }
    else{
      return{
        statusCode:422,
        status:false,
        message:"invalid operations"
      }

    }
  })
}

  module.exports={
      register,
      login,
      deposit,
      withdraw,
      getTransaction,
      deleteAcc
  }
