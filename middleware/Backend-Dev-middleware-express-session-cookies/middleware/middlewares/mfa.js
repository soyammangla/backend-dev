import jwt from "jsonwebtoken";

export const mfaMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const otp = req.headers["x-otp"];

    if (!token || !otp) {
        return res.status(401).json({ message: "Token and OTP required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (otp !== "123456") {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};