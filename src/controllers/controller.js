import Application from "../models/apply.js";
import User from "../models/userModel.js";
import main from '../../server.js'; 
import { v2 as cloudinary } from "cloudinary";
import cryptoHash from "crypto"
import { generateToken } from "../utils/jwt.js";
import { signInValidator } from "../validators/authValidators.js";

const hashValue = (value) => {
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
};

const comparePasswords = (inputPassword, hashedPassword) => {
    return hashValue(inputPassword) === hashedPassword;
};


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });



export const apply = async (req, res) => {
    try {


        if (!req.file) {
            throw new Error('No file uploaded');
        }


        console.log('Uploading file buffer:', req.file.buffer);

     const result = await cloudinary.uploader.upload(req.file.path,
    { resource_type: 'auto' });
    (error, result) => {
        if (error) {
            console.error('Error uploading to Cloudinary:', error);
        } else {
            console.log('Upload successful. Cloudinary response:');
            console.log('Image URL:', result.secure_url); // Log the image URL
            resolve(result);
        }
    }
;

const {
    firstName, lastName, day, month, year, gender, contactNumber, email, country, state,
    postalCode, jobType, primarySpecialty, subSpecialty, medicalSchool, degreeObtained,
    yearOfGraduation, currentorganization, currentorganizationcountry, currentorganizationstate,
    yearsOfExperience, mdcnLicenseNo, mdcnRegistrationNo
  } = req.body;


            const Date_of_Birth = `${year}-${month}-${day}`;
            const application = new Application({
               
                firstName,
                lastName,
                Date_of_Birth,
                gender,
                contactNumber,
                email,
                country,
                state,
                postalCode,
                jobType: result.secure_url,
                primarySpecialty,
                subSpecialty,
                medicalSchool,
                degreeObtained,
                yearOfGraduation,
                currentorganization,
                currentorganizationcountry,
                currentorganizationstate,
                yearsOfExperience,
                mdcnLicenseNo,
                mdcnRegistrationNo,

            });

            await application.save();

            console.log({ message: 'Application submitted successfully.' },application);
            return res.json();
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


export const signin = async (req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body);
    if (!loginResults.success) {
        console.log(formatZodError(loginResults.error.issues));
    } 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.log({ message: 'User with email not found' });
        }
        
        
        const comparePass = comparePasswords(password, user.password);
        if (!comparePass) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        
        
        const writerToken = generateToken(user._id, user.name);
        

        user.token = writerToken;
        await user.save();
        main.io.emit('user-login', { userId: user._id, name: user.name, email: user.email });

        // Send response with token
        console.log('Login sa successful', user, writerToken);
        return res.json({ writerToken });
        

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('INTERNAL SERVER ERROR', error.message);
    }
};
