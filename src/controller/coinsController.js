const coinsModel=require('../models/coinModel')
const axios=require('axios')
const { model } = require('mongoose');

let getcoins=async function(req,res){
    try{
        let header=req.headers["authorization"]
        if(!header){return res.status(400).send({status:false,msg:"header is not exist"})}
        let option={
        method:'get',
        url:"https://api.coincap.io/v2/assets",
        authorization:header
     }
    let result=await axios(option)
    console.log(result.data)
    const result1=result.data.data
    const rsl=result1.sort((a, b)=>{
        const {changePercent24Hr:p1}=a
        const {changePercent24Hr:p2}=b
        return p1-p2   
    })

   
    console.log("====================================================")
    console.log(result1.length)
   
    await coinsModel.deleteMany()
    await coinsModel.create(rsl)
    console.log(rsl.length)
   // const getdata=await coinsModel.find()
   let getone=[]
   for(let i=0; i<rsl.length; i++)
    { let getone1=await coinsModel.findOneAndUpdate({name:rsl[i].name},{$set:{marketCapUsd:rsl[i].marketCapUsd}},{upsert:true,new:true}).lean()
    getone1.changePercent24Hr=rsl[i].changePercent24Hr
     getone.push(getone1)
   }
    return res.status(200).send({getone})
}catch(err){return res.status(500).send({status:false,msg:err.message})}
   
    
}

const gettest= function(req,res){
    console.log("hello world")
    return res.send("hello world")
}

module.exports.gettest=gettest
module.exports.getcoins=getcoins

