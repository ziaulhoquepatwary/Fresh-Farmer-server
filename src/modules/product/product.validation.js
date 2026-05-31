import z from "zod";

export const productValidationSchema = z.object({
    name: z.string({ required_error: 'Product name is required' }).trim(),
    slug: z.string({ required_error: 'Slug is required' }).lowercase(),
    description: z.string({ required_error: 'Description is required' }),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    thumbnail: z.string().url('Invalid thumbnail URL'),
    category: z.string({ required_error: 'Category is required' }),
    tags: z.array(z.string()).optional().default([]),

    farmer: z.string({ required_error: 'Please select a farmer' }),

    price: z.number().positive('Price must be greater than 0'),
    currency: z.string().default('BDT'),
    unit: z.string().default('kg'),

    discount: z.object({
        isDiscounted: z.boolean().default(false),
        discountPrice: z.number().nullable().default(null),
    }).optional(),

    stock: z.object({
        quantity: z.number().nonnegative(),
        inStock: z.boolean().default(true),
    }),

    features: z.array(z.string()).default([]),
    isFeatured: z.boolean().default(false),
    allowAddToCart: z.boolean().default(true),
})