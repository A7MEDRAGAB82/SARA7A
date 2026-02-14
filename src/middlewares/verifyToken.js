import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token || req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "You are not authenticated!" });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded; 
        
        next(); 
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid or expired!" });
    }
};

export default verifyToken;