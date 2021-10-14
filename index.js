const express=require('express')
const dataService=require('./services/data.service')
const app=express()
const session=require('express-session')
const jwt=require('jsonwebtoken')
const cors=require('cors')

//allow resource sharing using cors
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.use(express.json())
//to generate unique id
app.use(session({
    secret:'randomsecretkey',
    resave:false,
    saveUninitialized:false
}))
//middlewar creation--application specific middleware
app.use((req,res,next)=>{
    console.log("middleware");
    next()
})
//router specific middleware
const authMiddleware=(req,res,next)=>{
    if (!req.session.currentNo) {
        const result=({
          statusCode:401,
          status:false,
          message:"please login"
        })
        res.status(result.statusCode).json(result)
      }
      else{
          next()
      }
     
      }
      //token validation middleware
      const jwtmiddleware=(req,res,next)=>{
          try{
          const token=req.headers["x-access-token"]
          const data=jwt.verify(token,'supersecretkey123123')
          req.currentacc=data.currentNo
          next()
          }
          catch{
            const result=({
                statusCode:401,
                status:false,
                message:"please login"
              })
              res.status(result.statusCode).json(result)
              
          }
      }


    
        

//resolving http method
app.get('/',(req,res)=>{
    //chumma status define cheyth nokith aan
    res.status(401).send("get method read!!!!!!")

})
app.post('/',(req,res)=>{
    console.log("post");
    res.send("post method!!!!!")
})
app.put('/',(req,res)=>{
    res.send("putt method!!!!!")
})
app.patch('/',(req,res)=>{
    res.send("patch method!!!!!")
})
app.delete('/',(req,res)=>{
    res.send("delete method!!!!!")
})
//bankApp resolving
//jwt testing api
app.post('/token',jwtmiddleware,(req,res)=>{
    res.send("currentacno:"+req.currentacc)

})

app.post('/register',(req,res)=>{
    console.log(req.body)
   const result= dataService.register(req.body.uname,req.body.acno,req.body.password,req.body.balance)
    //res.status(result.statusCode).json(result)
    .then(result=>{
        res.status(result.statusCode).json(result)
        

    })
   


})
app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
    
    
})
app.post('/deposit',jwtmiddleware,(req,res)=>{
   // console.log(req.session.currentNo);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
    
    
})
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    dataService.withdraw(req,req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
    
    
})
app.post('/transaction',jwtmiddleware,(req,res)=>{
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
   
    
})

app.listen(3000,()=>{
    console.log("server startat port 3000");
})
app.delete('/deleteAcc/:acno',jwtmiddleware,(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})
