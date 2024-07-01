const User = require("../db/models/user");
const { hashPassword, comparePassword } = require("../utils/password");
const { responseSuccess, errorResult } = require("../utils/response");

const Register = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      const error = new Error("User with given email already exist");
      return errorResult(error, res, 400, req.path);
    }

    if (password != password2) {
      throw new Error("password and repeat password must be same!");
    }

    const userCreated = await User.create({
      name,
      email,
      password: await hashPassword(password),
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
      throw new Error("Invalid email or password, please try again!");
    }

    const token = userExist.generateAccessJwt();
    let options = {
      maxAge: 24 * 60 * 60 * 1000, // would expire in 1 day
      httpOnly: true, // The cookie is only accessible by the web server
      secure: true,
      sameSite: "None",
    };
    res.cookie("SessionID", token, options);
    req.flash("errors", [{ success: true, msg: "Login Successfully" }]);
    res.redirect("/main");
    // res.render("home", {
    //   layout: "layouts/main",
    //   title: "Rental Bike",
    //   errors: [{ success: true, msg: "Login Successfully" }],
    // });
  } catch (error) {
    return errorResult(error, res, 401, req.path);
  }
};

module.exports = { Register, Login };
