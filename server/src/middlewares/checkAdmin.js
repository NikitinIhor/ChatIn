import createHttpError from "http-errors";

export const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createHttpError(403, "Access denied. Admins only."));
  }
  next();
};
