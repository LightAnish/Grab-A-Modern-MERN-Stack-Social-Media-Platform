import User from '../models/user.model.js';

const getUserProfile = async (req, res) => {
    const { userId } = req.userId;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: `User with id ${userId} not found`
        })
    }
    return res.status(200).json({
        message: `User profile fetched successfully `,
        user
    })
}

export { getUserProfile }