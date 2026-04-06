export const errorHandler = (err, req, res, next) => {
  // Keep one centralized error shape for all unhandled failures.
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
