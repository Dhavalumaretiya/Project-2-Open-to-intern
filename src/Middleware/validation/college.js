const { check, validationResult } = require("express-validator/check");
const collegeModel = require("../../Models/collegeModel");
const internModel = require("../../Models/internModel");

exports.validateCollegeCreate = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is a required field")
    .not()
    .isNumeric()
    .withMessage("invalid name : numbers not allowed")
    .isLength({ min: 3, max: 20 })
    .withMessage("name must be within 4 to 20 characters"),
  check("fullName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("fullName is a required field")
    .not()
    .isNumeric()
    .withMessage("invalid name : numbers not allowed")
    .isLength({ min: 5, max: 50 })
    .withMessage("fullName must be within 3 to 50 characters"),
  check("logolink")
    .trim()
    .not()
    .isEmpty()
    .withMessage("logolink is a required field")
    .isURL()
    .withMessage("not a valid url"),
  check("isDeleted")
    .trim()
    .isBoolean()
    .withMessage("enter a valid bolean value"),
];

exports.collegeValidationResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400).send({ status: false, msg: error });
};

exports.validatedCollegeCreateDB = async (req, res, next) => {
  const body = req.body;
  const { name, fullName, logolink, isDeleted } = body;

  if (name.split(" ").length > 1) {
    return res
      .status(400)
      .send({ status: false, msg: "please provide the Valid Abbreviation" });
  }

  // Cheking duplicate Entry Of College
  let duplicateEntries = await collegeModel.find();
  let duplicateLength = duplicateEntries.length;

  if (duplicateLength != 0) {
    // Checking duplicate name
    const duplicateName = await collegeModel.findOne({ name: name });
    if (duplicateName) {
      return res
        .status(409)
        .send({ status: false, msg: "College  Name already exists" });
    }
    // Checking duplicate fullName
    const duplicateCollegeName = await collegeModel.findOne({
      fullName: fullName,
    });
    if (duplicateCollegeName) {
      return res
        .status(409)
        .send({ status: false, msg: "College Full Name already exists" });
    }

    // Duplicate Logo Link
    const duplicateLogolink = await collegeModel.findOne({
      logolink: logolink,
    });
    if (duplicateLogolink) {
      return res.status(409).send({
        status: false,
        msg: "The logo link which you have entered belong to some other college",
      });
    }
  }
  // isDeleted should be false
  if (isDeleted === true) {
    return res
      .status(400)
      .send({ status: false, msg: "New entries can't be deleted" });
  }
  next();
};

exports.validateCollegeDB = async (req, res, next) => {
  let collegeName = req.query.collegeName;
  const collegeNames = await collegeModel.findOne({ name: collegeName });
  if (!collegeNames) {
    return res.status(404).send({
      status: false,
      message: "College Not Found",
    });
  }

  const collegeId = collegeNames._id;

  const interns = await internModel
    .find({ collegeId: collegeId })
    .select({ _id: 1, email: 1, name: 1, mobile: 1 });

  req.interns = interns;
  req.collegeNames = collegeNames;
  next();
};
