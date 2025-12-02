import jwt from "jsonwebtoken";

const isLogin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedId) => {
            if (err) {
                return res.status(401).json({ message: `User not authorized ${{err}}` });
            }
            req.userId = decodedId;
            next();
        })
    } catch (error) {
        return res.status(401).json({ message: `User not authorized ${{error}}` });
    }
}

export default isLogin;