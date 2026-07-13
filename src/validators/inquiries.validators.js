import {z} from 'zod'


export const createInquirySchema = z.object({
    listingId: z.string().min(1, "listingId is required"),
    message: z.string().min(5, "Message must be atleast 5 characters")
})

export const UpdateInquirySchema = z.object({
    status: z.enum(["PENDING", "RESPONDED", "CLOSED"])
})