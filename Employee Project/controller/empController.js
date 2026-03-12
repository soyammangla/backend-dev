import mongoose from "mongoose";
import fs from "fs";
import { Employee } from "../model/empModel.js";
import path from "path";

export const log = (req) => {
  const logInfo = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  const filePath = path.join(process.cwd(), "server.log");

  fs.appendFile('log.txt', logInfo, (err) => {
    if (err) console.error("Error writing log:", err);
  });
};

export const Connection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

export const employeeUsers = async (req, res) => {
  try {
    log(req);
    const data = await Employee.find({});
    res.render("users", { data });

  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const showCreatePage = (req, res) => {
  res.render("create");
};

export const employeeCreate = async (req, res) => {
  try {
    log(req);
    await Employee.create(req.body);
    res.redirect("/");

  } 
  catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const showEditPage = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      enrollmentNumber: req.params.id,
    });

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.render("edit", { employee });

  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const employeeUpdate = async (req, res) => {
  try {
    log(req);
    await Employee.findOneAndUpdate(
      { enrollmentNumber: req.params.id },
      req.body,
      { runValidators: true }
    );

    res.redirect("/");

  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const employeeDelete = async (req, res) => {
  try {
    log(req);
    await Employee.findOneAndDelete({
      enrollmentNumber: req.params.id,
    });

    res.redirect("/");

  } 
  catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
