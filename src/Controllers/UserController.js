const User = require("../db/models/user");
const { hashPassword, comparePassword } = require("../utils/password");
const { responseSuccess, errorResult } = require("../utils/response");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const userCreated = await User.create({
      name,
      email,
      password: hashedPassword,
      role: Number(process.env.ROLE_USER),
    });
    console.log(userCreated);
    return res
      .status(201)
      .send(responseSuccess(true, 201, "new user created", userCreated));
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password, remember_me } = req.body;
    const userExist = await User.findOne({
      where: { email },
    });
    if (!userExist) {
      throw new Error("user not found");
    }
    const checkPassword = await comparePassword(password, userExist.password);
    if (!checkPassword) {
      throw new Error("email or password wrong!");
    }
    const data = {
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    };
    const token = jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
    if (remember_me) {
      res.cookie("authToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }); // 30 hari
    } else {
      res.cookie("authToken", token, { httpOnly: true });
    }
    return res
      .status(200)
      .send(responseSuccess(true, 200, "login successfully", { ...data, token }));
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

module.exports = { Register, Login };
