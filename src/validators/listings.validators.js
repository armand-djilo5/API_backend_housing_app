import { z } from 'zod'

export const listingQuerySchema = z.object({
  city: z.string().optional(),
  propertyType: z.enum(['APARTMENT', 'STUDIO', 'HOUSE', 'ROOM', 'DUPLEX']).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
})

const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
})

export const createListingSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  price: z.coerce.number().positive({ message: 'Price must be positive' }),
  currency: z.string().default('XAF'),
  propertyType: z.enum(['APARTMENT', 'STUDIO', 'HOUSE', 'ROOM', 'DUPLEX']),
  bedrooms: z.coerce.number().int().nonnegative({ message: 'Bedrooms must be non-negative' }),
  bathrooms: z.coerce.number().int().nonnegative({ message: 'Bathrooms must be non-negative' }),
  areaSqm: z.coerce.number().positive({ message: 'Area must be positive' }),
  amenities: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url()).optional().default([]),
  location: locationSchema,
  landlordId: z.string(),
});

export const updateListingSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).optional(),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }).optional(),
  price: z.coerce.number().positive({ message: 'Price must be positive' }).optional(),
  currency: z.string().optional(),
  propertyType: z.enum(['APARTMENT', 'STUDIO', 'HOUSE', 'ROOM', 'DUPLEX']).optional(),
  bedrooms: z.coerce.number().int().nonnegative({ message: 'Bedrooms must be non-negative' }).optional(),
  bathrooms: z.coerce.number().int().nonnegative({ message: 'Bathrooms must be non-negative' }).optional(),
  areaSqm: z.coerce.number().positive({ message: 'Area must be positive' }).optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  location: locationSchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: 'At least one location field must be provided',
  }).optional(),
  landlordId: z.string().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});



