import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateJwtToken from "../utils/generateJwtToken.util.js";
import sendOtpMail from "../config/mail.config.js";

const register = async (req, res) => {
  try {
    const { userName, name, dateOfBirth, gender, email, password } = req.body;

    if (!userName || !name || !dateOfBirth || !gender || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }
    const existingUserWithEmail = await userModel.findOne({ email });

    if (existingUserWithEmail) {
      return res.status(400).json({ message: "Email already exists !" });
    }

    const existingUserWithUserName = await userModel.findOne({ userName });

    if (existingUserWithUserName) {
      return res.status(400).json({ message: "Username already exists !" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      userName,
      name,
      dateOfBirth,
      gender,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    const token = generateJwtToken(savedUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res
      .status(201)
      .json({ message: "User created successfully", user: savedUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something went wrong Signup Error: ${error}` });
  }
};

const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ userName }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Username does not exist !" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password !" });
    }

    user.password = undefined;

    const token = generateJwtToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res
      .status(201)
      .json({ message: "User Login successfully", user: user, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Something went wrong Login Error: ${error}` });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist !" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendOtpMail(email, otp);

    return res
      .status(200)
      .json({ message: "otp sent successfully on your email" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Something went wrong Send Otp Error: ${error}` });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist !" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Otp expired !" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid otp !" });
    }

    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({ message: "Otp verified successfully !" });
  } catch (error) {}
};

const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Email does not exist !" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }

    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "Otp is not varified !" });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return res
        .status(400)
        .json({
          message: "New password should be different from old password !",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully !" });
  } catch (error) {
    return res
      .status(500)
      .json({ 
        message: `Something went wrong forget password Error: ${error}`,
      });
  }
};

export { register, Login, logout, sendOtp, verifyOtp, forgotPassword };
