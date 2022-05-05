const collegeModel = require("../Models/collegeModel");
const internModel = require("../Models/internModel");

const createCollege = async function (req, res) {
  try {
    let body = req.body;
    let savedData = await collegeModel.create(body);
    res.status(201).send({ msg: savedData });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

const getCollege = async function (req, res) {
  try {
    let interns = req.interns;
    let collegeNames = req.collegeNames;
    const { name, fullName, logolink } = collegeNames;

    // Final list of College details with students name who applied for internship
    const finalData = {
      name: name,
      fullName: fullName,
      logolink: logolink,
      interests: interns.length
        ? interns
        : { message: "No one applied for internship in this college" },
    };

    return res.status(200).send({ status: true, data: finalData });
  } catch (err) {
    console.log("This is the error : ", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};
module.exports = { createCollege, getCollege };
