import { Router } from 'express'
import listingsControllers from '../controllers/listings.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import isAdmin from '../middlewares/isLandlord.middleware.js'

const listing_routes = Router()

const routes = {
    GET_LISTINGS: '/listings',
    GET_LISTINGS_BY_ID: '/listings/:id',
    CREATE_LISTINGS: '/listings',
    UPDATE_LISTINGS: '/listings/:id',
    DELETE_LISTINGS: '/listings/:id',
}

listing_routes.get(routes.GET_LISTINGS, authMiddleware, isAdmin("LANDLORD", "ADMIN"), listingsControllers.getListings)
listing_routes.get(routes.GET_LISTINGS_BY_ID, authMiddleware,isAdmin("LANDLORD", "ADMIN"), listingsControllers.getListingsById)
listing_routes.post(routes.CREATE_LISTINGS, authMiddleware,isAdmin("LANDLORD", "ADMIN"), listingsControllers.createListing)
listing_routes.patch(routes.UPDATE_LISTINGS, authMiddleware,isAdmin("LANDLORD", "ADMIN"), listingsControllers.updateListings)
listing_routes.delete(routes.DELETE_LISTINGS, authMiddleware,isAdmin("LANDLORD", "ADMIN"), listingsControllers.deleteListings)

export default listing_routes