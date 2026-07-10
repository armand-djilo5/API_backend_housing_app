import { HttpCode } from "../core/constants/index.js";

const isAdmin = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(HttpCode.UNAUTHORIZED).json({ message: 'You are not authenticated' })
    }

    if (!roles.includes(req.user.role)) {
        return res.status(HttpCode.FORBIDDEN).json({ message: 'This route is reserved for admin and landlords' })
    }

    next()
}

export default isAdmin