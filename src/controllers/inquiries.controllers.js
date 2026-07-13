import prisma from '../lib/prisma.js'
import { HttpCode } from '../core/constants/index.js'
import { createInquirySchema, UpdateInquirySchema } from '../validators/inquiries.validators.js'
import { ZodError } from 'zod'


const inquiryControllers = {
    createInquiry: async (req, res) => {
        try {
            const data = createInquirySchema.parse(req.body)

            const listing = await prisma.listing.findUnique({
                where: { id: data.listingId }

            })
            if (!listing) {
                return res.status(HttpCode.NOT_FOUND).json({ message: "Listing not found" })
            }

            const inquiry = await prisma.inquiry.create({
                data: {
                    listingId: data.listingId,
                    message: data.message,
                    tenantId: req.user.userId
                }
            })
        } catch( error instanceof ZodError)
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({message: "SERVER ERROR"})

        }


    }
}