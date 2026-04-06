export const success = (res, data, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

export const error = (res, message = "Error", status = 400, details) => {
  const payload = {
    success: false,
    message
  };

  if (details !== undefined) {
    payload.details = details;
  }

  return res.status(status).json(payload);
};
