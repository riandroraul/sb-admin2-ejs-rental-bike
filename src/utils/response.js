const errorResult = (error, res, statusCode) => {
  if (error != null && error instanceof Error) {
    return res.status(statusCode).send({
      success: false,
      status: statusCode,
      message: error.message,
      errors: error,
    });
  }
  return res.status(statusCode).json({
    status: 500,
    message: "internal server error",
    errors: error,
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
