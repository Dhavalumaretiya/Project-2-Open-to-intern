const internModel = require("../Models/internModel")
const collageModel = require("../Models/collageModel")


let postcreate = async function(req,res){
    let data  = req.body
    let result = await internModel.create(data)
    res.send(result)
}



let postcreate2 = async function(req,res){
    let data  = req.body
    let result = await collageModel.create(data)
    res.send(result)
}

module.exports.x1 = postcreate
module.exports.x2 = postcreate2