export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateToken();
  const cookie_name = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statusCode)
    .cookie(cookie_name, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly:true
    })
    .json({ success: true, user, message, token });
};
