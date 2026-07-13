import { Router } from "express";


const inquiry_router = Router()

const routes = {
    CREATE_INQUIRY: '/inquries',
    GET_MY_INQUIRY: '/inquiries/me',
    GET_INQUIRY: '/inquiries',
    UPDATE_INQUIRY: '/inquiries/:listingId'
}





export default inquiry_router