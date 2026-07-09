import prisma from '../lib/prisma.js'
import { HttpCode } from '../core/constants/index.js'
import { ZodError } from 'zod'
import { listingQuerySchema, createListingSchema, updateListingSchema } from '../validators/listings.validators.js'

const listingsControllers = {
  createListing: async (req, res) => {
    try {
      const body = createListingSchema.parse(req.body)

      const createdListing = await prisma.listing.create({
        data: {
          ...body,
          status: 'ACTIVE',
        },
      })

      return res.status(HttpCode.CREATED).json({ listing: createdListing })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
      }

      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
    }
  },

  getListings: async (req, res) => {
    try {
      const query = listingQuerySchema.parse(req.query)
      const { city, propertyType, minPrice, maxPrice, bedrooms, page, limit } = query

      const where = { status: 'ACTIVE' }
      if (city) where.location = { is: { city: { equals: city, mode: 'insensitive' } } }
      if (propertyType) where.propertyType = propertyType
      if (bedrooms !== undefined) where.bedrooms = bedrooms
      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {}
        if (minPrice !== undefined) where.price.gte = minPrice
        if (maxPrice !== undefined) where.price.lte = maxPrice
      }

      const [listings, total] = await Promise.all([
        prisma.listing.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.listing.count({ where }),
      ])

      return res.status(HttpCode.OK).json({
        listings,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
      }

      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
    }
  },

  getListingsById: async (req, res) => {
    try {
      const { id } = req.params
      const listing = await prisma.listing.findUnique({
        where: { id }
      })

      if (!listing) {
        return res.status(HttpCode.NOT_FOUND).json({ message: "Listings not found" })
      }
      return res.status(HttpCode.OK).json(listing)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "SERVER ERROR" })

    }
  },

  updateListings: async (req, res) => {
    try {
      const { id } = req.params
      const data = updateListingSchema.parse(req.body)

      const existe = await prisma.listing.findUnique({
        where: { id }
      })
      if (!existe) {
        return res.status(HttpCode.NOT_FOUND).json({ message: "Listing not found" })
      }

      const updateData = { ...data }
      if (data.location) updateData.location = { set: data.location }

      const listing = await prisma.listing.update({
        where: { id },
        data: updateData,
      })
      return res.status(HttpCode.OK).json({ listing })
    } catch (error) {
       if (error instanceof ZodError) {
        return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
      }
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({message: "SERVER ERROR"})
    }
  },

  deleteListings: async ( req, res ) => {
    try {
        const { id } = req.params
    const existe = await prisma.listing.findUnique({
      where: { id }
    })
    if(!existe) {
      return res.status(HttpCode.NOT_FOUND).json({message: "Listing not found"})
    }

    await prisma.listing.delete({
      where: { id }
    })
    return res.status(HttpCode.OK).json({message: "Listings deleted successfully"})
    } catch (error) {
       return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({message: "SERVER ERROR"})
    }
  }

}

export default listingsControllers