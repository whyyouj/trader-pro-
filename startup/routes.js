const express = require("express");
const cors = require("cors");

const semester = require("../routes/api/semester");
const department = require("../routes/api/department");
const examForm = require("../routes/api/examForm");
const auth = require("../routes/api/auth");
const users = require("../routes/api/user");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/exam-form", examForm);
  app.use("/api/semesters", semester);
  app.use("/api/departments", department);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
