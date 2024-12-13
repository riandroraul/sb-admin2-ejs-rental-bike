const errorResult = (error, res, statusCode, path) => {
  if (error != null && error instanceof Error) {
    const pathRender = path.replace("/", "");
    let title = "";
    switch (pathRender) {
      case "login":
        title = "Rental Bike | Login";
        return res.status(statusCode).render(pathRender, {
          layout: "public-pages/main",
          title,
          errors: [{ success: false, msg: error.message }],
        });
      case "register":
        title = "Rental Bike | Registration";
        return res.status(statusCode).render("signup", {
          layout: "public-pages/main",
          title,
          formData: req.body,
          errors: [{ success: false, msg: error.message }],
        });
      case "forgot-password":
        title = "Rental Bike | Forgot Password";
        return res.status(statusCode).render(pathRender, {
          layout: "public-pages/main",
          title,
          errors: [{ success: false, msg: error.message }],
        });
      case "add-new-bike":
        title = "Rental Bike | Add new Bike";
        return res.status(statusCode).render("admin/add-bike", {
          layout: "layouts/main",
          title,
          path: "/bikes",
          FormData: {},
          errors: [{ success: false, msg: error.message }],
        });
    }

    return res.status(statusCode).render(pathRender, {
      layout: "public-pages/main",
      success: false,
      status: statusCode,
      errors: [{ success: false, msg: error.message }],
    });
  }
  return res.status(statusCode).render("errorPage", {
    success: false,
    status: statusCode,
    errors: [{ success: false, msg: "An unknown error occurred" }],
  });
};

const responseSuccess = (success, statusCode, message, data, error = null) => {
  if (error != null && error instanceof Error) {
    return {
      success,
      statusCode,
      message,
      data: null,
      errors: error,
    };
  }
  return { success, statusCode, message, data, errors: error };
};

module.exports = { errorResult, responseSuccess };
