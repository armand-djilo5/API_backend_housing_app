import { Router } from 'express'
import inquiryControllers from '../controllers/inquiries.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const inquiry_router = Router()

const routes = {
    CREATE_INQUIRY: '/inquiries',
    GET_MY_INQUIRY: '/inquiries/me',
    GET_INQUIRY: '/inquiries',
    GET_INQUIRY_BY_ID: '/inquiries/:id',
    UPDATE_INQUIRY: '/inquiries/:id'
}

inquiry_router.post(routes.CREATE_INQUIRY, authMiddleware, inquiryControllers.createInquiry)
inquiry_router.get(routes.GET_MY_INQUIRY, authMiddleware, inquiryControllers.getMyInquiries)
inquiry_router.get(routes.GET_INQUIRY, authMiddleware, inquiryControllers.getInquiry)
inquiry_router.get(routes.GET_INQUIRY_BY_ID, authMiddleware, inquiryControllers.getInquiryById)
inquiry_router.patch(routes.UPDATE_INQUIRY, authMiddleware, inquiryControllers.updateInquiry)

export default inquiry_router