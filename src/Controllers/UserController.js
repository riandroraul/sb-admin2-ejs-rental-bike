const User = require("../db/models/user");
const { hashPassword, comparePassword } = require("../utils/password");
const { responseSuccess, errorResult } = require("../utils/response");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    console.log(req.body);
    if (password != password2) {
      throw new Error("password and repeat password must be same!");
    }
    const hashedPassword = await hashPassword(password);
    const userCreated = await User.create({
      name,
      email,
      password: hashedPassword,
      role: Number(process.env.ROLE_USER),
    });

    const response = responseSuccess(true, 201, "new user created", userCreated);
    res.render("login", {
      layout: "public-pages/main",
      title: "Rental Bike | Login",
      data: response,
      errors: [{ success: true, msg: "Create account Successfully" }],
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
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

    const token = jwt.sign({ userId: userExist.userId }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });
    res.render("home", {
      layout: "layouts/main",
      title: "Rental Bike",
      data: { ...data, token },
      errors: [{ success: true, msg: "Login Successfully" }],
    });
  } catch (error) {
    return errorResult(error, res, 400, req.path);
  }
};

module.exports = { Register, Login };
