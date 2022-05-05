const internModel = require("../models/internModel")
const collageModel = require("../models/collegeModel")


let postcreate = async function(req,res){
    let requestBody = req.body;
        let collegeID = await collageModel.findOne({ name: requestBody.collegeName }).select({name:1 , _id:1 , fullname:0, logolink:0});
        requestBody['collegeId'] = collegeID;
        let Data = await internModel.create(requestBody);
        res.status(201).send({ status: true, msg: "Created", Data: Data });
}



let postcreate2 = async function(req,res){
    let data  = req.body
    let result = await collageModel.create(data)
    res.send(result)
}

module.exports.x1 = postcreate
module.exports.x2 = postcreate2


