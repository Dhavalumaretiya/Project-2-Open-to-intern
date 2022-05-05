const { check, validationResult } = require("express-validator/check");
const internModel = require("../internModel");
const collegeModel= require("../collegeModel")


exports.validateIntern = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is a rquired field")
    .not()
    .isNumeric()
    .withMessage("invalid name : numbers not allowed")
    .isLength({ min: 4, max: 20 })
    .withMessage("name must be within 4 to 20 characters"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is a required field")
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email"),
  check("mobile")
    .trim()
    .not()
    .isEmpty()
    .withMessage("mobile is a required field")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("invalid number"),
  check("collegeName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("collegeName is a rquired field")
    .not()
    .isNumeric()
    .withMessage("invalid collegeName : numbers not allowed"),
  
];

exports.internValidationResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400).send({ status: false, msg: error });
};

exports.validateInternDB = async (req,res,next) =>{
  let data = req.body;
   

  let numberCheck = await internModel.findOne({ mobile: data.mobile });

  if (numberCheck)
    return res
      .status(400)
      .send({ status: false, msg: "Mobile Number Already Exists" });

  let emailCheck = await internModel.findOne({ email: data.email });

  if (emailCheck)
    return res
      .status(400)
      .send({ status: false, msg: "EmailId Already Exists" });

  let collegeCheck = await collegeModel.findOne({
    name: data.collegeName,
    isDeleted: false,
  });

 
  if (!collegeCheck) {
    return res.status(400).send({
      status: false,
      message: `${data.collegeName} college doesn't exists.`,
    });
  }
  req.collegeCheck = collegeCheck
  next()

}

//name , email , mobile , collegeId , isDeleted
