import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema(
    {
      enrollmentNumber : {
        type : String,
        required : true,
        unique : true
      },
      name : {
        type : String,
        required : true
      },
      profilePicture : {
        type : String,
        required : true
      },
      gender : {    
        type : String,
        required : true
      },
      department : {
        type : String,
        required : true
      },
      salary : {
        type : Number,
        required : true
      }     
    },
    {
      timestamps : true
    }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);