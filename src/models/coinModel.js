const mongoose=require('mongoose')

const coinschema=new mongoose.Schema({
    symbol:String,
    name:String, 
    marketCapUsd: String,
    priceUsd:String 
} )


module.exports=mongoose.model('coins',coinschema)