const internModel = require("../Models/internModel");

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    let collegeCheck = req.collegeCheck;

    let collegeId = collegeCheck._id;
    data.collegeId = collegeId;

    const internData = await internModel.create(data);

    return res.status(201).send({
      status: true,
      message: `Sbgfuccessfully applied for internship at ${data.collegeName}.`,
      data: internData 
    });
  } catch (err) {
    console.log("This is the error :", err.message); 
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports = { createIntern };
