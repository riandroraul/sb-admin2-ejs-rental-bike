const User = require("../db/models/user");
const { hashPassword, comparePassword } = require("../utils/password");
const { responseSuccess, errorResult } = require("../utils/response");

const Register = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      req.flash("errors", [
        { success: false, msg: "User with given email already exist" },
      ]);
      return res.status(400).render("signup", {
        layout: "public-pages/main",
        title: "Rental Bike | Login",
        formData: req.body,
        errors: [{ success: false, msg: "User with given email already exist" }],
      });
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
    console.log(error);
    // return errorResult(error, res, 400);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({
      where: { email },
    });

    if (!userExist) {
      return res.status(400).render("login", {
        layout: "public-pages/main",
        title: "Rental Bike | Login",
        formData: req.body,
        errors: [
          { success: false, msg: "Invalid email or password, please try again!" },
        ],
      });
    }
    const checkPassword = await comparePassword(password, userExist.password);

    if (checkPassword == false) {
      return res.status(400).render("login", {
        layout: "public-pages/main",
        title: "Rental Bike | Login",
        formData: req.body,
        errors: [
          { success: false, msg: "Invalid email or password, please try again!" },
        ],
      });
    }

    if (!userExist && checkPassword == false) {
      return res.status(400).render("login", {
        layout: "public-pages/main",
        title: "Rental Bike | Login",
        formData: req.body,
        errors: [
          { success: false, msg: "Invalid email or password, please try again!" },
        ],
      });
    }

    const token = userExist.generateAccessJwt();
    let options = {
      maxAge: 24 * 60 * 60 * 1000, // would expire in 1 day, 1s = 1000ms
      httpOnly: true, // The cookie is only accessible by the web server
      secure: true,
      sameSite: "None",
    };
    res.cookie("SessionID", token, options);
    req.flash("errors", [{ success: true, msg: "Login Successfully" }]);
    res.redirect("/main");
  } catch (error) {
    console.log(error);
  }
};

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 2 },
      attributes: ["userId", "name", "email", "role", "createdAt", "updatedAt"],
      raw: true,
    });
    return res.render("admin/users", {
      layout: "layouts/main",
      title: "Rental Bike | Users",
      path: "/users",
      user: req.user,
      data: users,
    });
  } catch (error) {
    return errorResult(error, res, 400, req.path);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.destroy({ where: { userId } });
    req.flash("errors", [{ success: true, msg: "User Deleted Successfully" }]);
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    return errorResult(error, res, 400, req.path);
  }
};

module.exports = { Register, Login, GetUsers, DeleteUser };
