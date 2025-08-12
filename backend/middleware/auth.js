
import jwt from "jsonwebtoken";

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token is missing or invalid." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.userId = decoded.id;
    console.log(decoded);
    console.log("user verified")
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token verification failed.", error: error });
  }
}

