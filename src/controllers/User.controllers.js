import prisma from '../lib/prisma.js'
import { HttpCode } from '../core/constants/index.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { ZodError } from 'zod'
import {registerSchema, loginSchema} from '../validators/user.validators.js'
// import { user } from 'pg/lib/defaults'
// import { id } from 'zod/locales'
// import { sign } from 'node:crypto'
// import { token } from 'morgan'
// import { get } from 'node:https'
// import { create } from 'node:domain'


const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role
    },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '45m' }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role
    },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    )
}

const authController = {

    signup: async (req, res) => {
        try {

            const data = registerSchema.parse(req.body)

            const { email, password, name, role, phone } = req.body

            if (!email || !password || !name || !phone) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: "Fill all the informations needed" })
            }

            const emailExist = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (emailExist) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: "Email already exists" })
            }

            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await prisma.user.create({
                data: {
                    id: uuidv4(),
                    email,
                    password: hashPassword,
                    name,
                    phone,
                    role: role || "TENANT"
                }
            })

            return res.status(HttpCode.OK).json({
                message: "User created successfully",
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role,
                    phone: newUser.phone
                }
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
            }

            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })
        }
    },

    login: async (req, res) => {
        try {

            const data = loginSchema.parse(req.body)
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: "email or password recquired" })
            }

            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                return res.status(HttpCode.NOT_FOUND).json({ message: "User not found" })
            }

            const verifyPassword = await bcrypt.compare(password, user.password)
            if (!verifyPassword) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'Invalid password' })
            }

            const accesToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            await prisma.user.update({
                where: { id: user.id },
                data: { refreshToken }
            })

            return res.status(HttpCode.OK).json({
                message: 'Connection succeeded',
                token: accesToken,
                refreshToken: refreshToken,
                user: { id: user.id, email: user.email, role: user.role, phone: user.phone }
            })
           } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
            }

            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })
        }
    },

    logout: async (req, res) => {
        try {
            const { refreshToken } = req.body
            const user = await prisma.user.findFirst({
                where: { refreshToken }
            })

            if (!user) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'User not found' })
            }

            await prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: null }
            })
            return res.status(HttpCode.OK).json({ message: 'Logout succeeded' })
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: 'Error during logging out' })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: 'Enter your refresh token' })
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            const user = await prisma.user.findUnique({
                where: { id: decoded.id }
            })

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Refresh token invalide or expired' })
            }

            const newAccessToken = generateAccessToken(user)

            return res.status(HttpCode.OK).json({ accesToken: newAccessToken })
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: 'Refresh token invalid' })
        }
    },
    getUser: async (req, res) => {
        try {
            const users = await prisma.user.findMany({
                orderBy: { createAt: 'desc' }
            })
            if (users.length === 0) {
                return res.status(HttpCode.NOT_FOUND).json({ message: "User not found" })
            }
            return res.status(HttpCode.OK).json(users)
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })
        }
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({
                where: { id }
            })
            if (!user) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'User no found' })
            }
            return res.status(HttpCode.OK).json(user)
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
        }
    }
}


export default authController

