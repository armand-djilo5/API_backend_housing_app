import { Router } from 'express'
import listingsControllers from '../controllers/listings.controllers.js'

const listing_routes = Router()

const routes = {
    GET_LISTINGS: '/listings',
    GET_LISTINGS_BY_ID: '/listings/:id',
    CREATE_LISTINGS: '/listings',
    UPDATE_LISTINGS: '/listings/:id',
    DELETE_LISTINGS: '/listings/:id',
}

listing_routes.get(routes.GET_LISTINGS, listingsControllers.getListings)
listing_routes.get(routes.GET_LISTINGS_BY_ID, listingsControllers.getListingsById)
listing_routes.post(routes.CREATE_LISTINGS, listingsControllers.createListing)
listing_routes.patch(routes.UPDATE_LISTINGS, listingsControllers.updateListings)
listing_routes.delete(routes.DELETE_LISTINGS, listingsControllers.deleteListings)

export default listing_routes