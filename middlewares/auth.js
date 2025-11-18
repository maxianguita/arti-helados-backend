import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Token faltante" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

    req.user = decoded; // guardamos info del usuario en req
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
