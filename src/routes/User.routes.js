import { Router } from "express";
import authController from '../controllers/User.controllers.js'

const auth_router = Router()

const routes = {
    SINGUP_USER : '/signup',
    LOGIN_USER: '/login',
    LOGOUT_USER: '/logout',
    GET_USER: '/signup',
    GET_USER_BY_ID: '/signup/:id',
    REFRESH: '/refresh'
}

auth_router.post(routes.SINGUP_USER, authController.signup)
auth_router.post(routes.LOGIN_USER, authController.login)
auth_router.post(routes.LOGOUT_USER, authController.logout)
auth_router.post(routes.REFRESH, authController.refreshToken)
auth_router.get(routes.GET_USER, authController.getUser)
auth_router.get(routes.GET_USER_BY_ID, authController.getUserById)



export default auth_router