const errorMiddleware = (error, _request, response, _next) => {
  const { message } = error;
  const [code, errorMessage] = message.split('|');
  return response.status(Number(code)).json({ message: errorMessage });
};

module.exports = errorMiddleware;
