const internModel = require('../Models/internModel')


let postcreate = async function(req,res){
    let data  = req.body
    let result = await internModel.create(data)
    res.send(result)
}


module.exports.x1 = postcreate