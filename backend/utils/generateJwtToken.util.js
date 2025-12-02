import jwt from 'jsonwebtoken';

const generateJwtToken = (userId) => {
    return jwt.sign({ userId: userId}, process.env.JWT_SECRET);
}

export default generateJwtToken;