
export const formatErrors = (err) => {
  if (!err.response) return "Unknown error! can't connect to server.";
  const errors = err.response.data.errors;
  const error = err.response.data.message;
  const errorsFormatted = [];
  if (error) errorsFormatted.push(error);
  if (errors) {
    errors.forEach((element) => {
      errorsFormatted.push(Object.values(element)[0]);
    });
  }
  return errorsFormatted.join("\n");
};
