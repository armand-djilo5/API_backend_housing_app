import { Router } from "express";
import favoriteController from "../controllers/favorite.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const favorite_router = Router()

const routes = {
    GET_FAVORITE: '/favorites',
    CREATE_FAVORITE: '/favorites/:listingId',
    DELETE_FAVORITE: '/favorites/:listingId'
}

favorite_router.get(routes.GET_FAVORITE, authMiddleware, favoriteController.getFavorite)
favorite_router.post(routes.CREATE_FAVORITE, authMiddleware, favoriteController.createFavorite)
favorite_router.delete(routes.DELETE_FAVORITE, authMiddleware, favoriteController.deleteFavorite)










export default favorite_router