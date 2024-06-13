import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    firstName: {
        type: String,
        required: true
      },
    lastName: {
        type: String,
        required: true
      },
    Date_of_Birth: {
      type: String
    },  
    gender: {
        type: String,
        required: true
      },
    contactNumber: {
      type: String
    },
    email: {
      type: String
    },  
    country: {
      type: String
    },
    state: {
      type: String
    },
    postalCode: {
      type: String
    },
    jobType: {
      type: String,
      default: ''
    },

    primarySpecialty: {
        type: String,
      },
    subSpecialty: {
        type: String,
      },
    medicalSchool: {
        type: String
    },
    degreeObtained: {
      type: String,
    },
    yearOfGraduation: {
      type: String,
    },
    currentorganization: {
      type: String,
    },
    currentorganizationcountry: {
      type: String
    },
    currentorganizationstate: {
    type: String,
    },
    yearsOfExperience: {
      type: String,
    },
    mdcnLicenseNo: {
      type: String,
    },
    mdcnRegistrationNo: {
      type: String
    },
    role: {
        type: String,
        default: 'writer' },
});

const Application = mongoose.model("Application", dataSchema);

export default Application
