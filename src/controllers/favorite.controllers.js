import prisma from '../lib/prisma.js'
import { HttpCode } from '../core/constants/index.js'

const favoriteController = {
    createFavorite: async (req, res) => {
        try {
            const listingId = req.params.listingId || req.body.listingId
            const userId = req.user?.id || req.user?.userId

            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: "Authentication required" })
            }
            if (!listingId) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: "listingId is required" })
            }

            await prisma.favorite.upsert({
                where: {
                    userId_listingId: {
                        userId,
                        listingId
                    }
                },
                create: { userId, listingId },
                update: {},
            })

            return res.status(HttpCode.CREATED).json({ message: "Favorite created successfully" })
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })
        }


    },

    getFavorite: async (req, res) => {
        try {
            const userId = req.user?.id || req.user?.userId
            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: "Authentication required" })
            }

            const favorite = await prisma.favorite.findMany({
                where: { userId },
                include: { listing: true },
                orderBy: { creatAt: "desc" }
            })
            return res.status(HttpCode.OK).json(favorite)
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })
        }

    },

    deleteFavorite: async (req, res) => {
        try {
            const listingId = req.params.listingId
            const userId = req.user?.id || req.user?.userId

            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: "Authentication required" })
            }
            if (!listingId) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: "listingId is required" })
            }

            const exists = await prisma.favorite.findUnique({
                where: {
                    userId_listingId: {
                        userId,
                        listingId
                    }
                }
            })
            if (!exists) {
                return res.status(HttpCode.NOT_FOUND).json({ message: "Favorite not found" })
            }

            await prisma.favorite.delete({
                where: {
                    userId_listingId: {
                        userId,
                        listingId
                    }
                }
            })
            return res.status(HttpCode.OK).json({ message: "Favorite deleted successfully" })
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })
        }

    }


}

export default favoriteController