const express = require('express');
const router = express.Router();

const coinsController=require("../controller/coinsController")


router.get("/assets",coinsController.getcoins)
router.get("/test",coinsController.gettest)


module.exports=router;