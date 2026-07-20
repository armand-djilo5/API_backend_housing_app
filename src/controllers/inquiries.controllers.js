import prisma from '../lib/prisma.js'
import { HttpCode } from '../core/constants/index.js'
import { createInquirySchema, UpdateInquirySchema } from '../validators/inquiries.validators.js'
import { ZodError } from 'zod'

const inquiryControllers = {
    createInquiry: async (req, res) => {
        try {
            const data = createInquirySchema.parse(req.body)
            const userId = req.user?.id || req.user?.userId

            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Authentication required' })
            }

            const listing = await prisma.listing.findUnique({
                where: { id: data.listingId }
            })

            if (!listing) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'Listing not found' })
            }

            const inquiry = await prisma.inquiry.create({
                data: {
                    listingId: data.listingId,
                    message: data.message,
                    tenantId: userId
                }
            })

            return res.status(HttpCode.CREATED).json({
                message: 'Inquiry created successfully',
                inquiry
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
            }

            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
        }
    },

    updateInquiry: async (req, res) => {
        try {
            const { id } = req.params
            const data = UpdateInquirySchema.parse(req.body)

            if (!id) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: 'Inquiry id is required' })
            }

            const existingInquiry = await prisma.inquiry.findUnique({
                where: { id }
            })

            if (!existingInquiry) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'Inquiry not found' })
            }

            const updatedInquiry = await prisma.inquiry.update({
                where: { id },
                data: { status: data.status }
            })

            return res.status(HttpCode.OK).json({
                message: 'Inquiry updated successfully',
                inquiry: updatedInquiry
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: error.errors })
            }

            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
        }
    },

    getInquiryById: async (req, res) => {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: 'Inquiry id is required' })
            }

            const inquiry = await prisma.inquiry.findUnique({
                where: { id },
                include: {
                    listing: true,
                    tenant: { select: { id: true, email: true, phone: true } }
                }
            })

            if (!inquiry) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'Inquiry not found' })
            }

            return res.status(HttpCode.OK).json(inquiry)
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
        }
    },

    getMyInquiries: async (req, res) => {
        try {
            const userId = req.user?.id || req.user?.userId

            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Authentication required' })
            }
            

            const inquiries = await prisma.inquiry.findMany({
                where: { tenantId: userId },
                include: {
                    listing: true,
                    tenant: { select: { id: true, email: true, phone: true } }
                },
                orderBy: { creatAt: 'desc' }
            })

            return res.status(HttpCode.OK).json(inquiries)
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
        }
    },

    getInquiry: async (req, res) => {
        try {
            const userId = req.user?.id || req.user?.userId

            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Authentication required' })
            }

            const inquiries = await prisma.inquiry.findMany({
                where: { listing: { landlordId: userId } },
                include: {
                    listing: true,
                    tenant: { select: { id: true, email: true, phone: true } }
                },
                orderBy: { creatAt: 'desc' }
            })

            return res.status(HttpCode.OK).json(inquiries)
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR' })
        }
    }
}

export default inquiryControllers

