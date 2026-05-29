import mongoose, { model } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        description: { type: String, required: true },
        images: { type: [String], required: true },
        thumbnail: { type: String, required: true },
        category: { type: String, required: true },
        tags: { type: [String], default: [] },

        farmer: {
            type: Schema.Types.ObjectId,
            ref: 'Farmer',
            required: true
        },

        price: { type: Number, required: true, min: 0 },
        currency: { type: String, required: true, default: 'BDT' },
        unit: { type: String, required: true, default: 'kg' },

        discount: {
            isDiscounted: { type: Boolean, default: false },
            discountPrice: { type: Number, default: null }
        },

        stock: {
            quantity: { type: Number, required: true, min: 0 },
            inStock: { type: Boolean, default: true }
        },

        rating: {
            average: { type: Number, default: 0, min: 0, max: 5 },
            totalReviews: { type: Number, default: 0 }
        },

        features: { type: [String], default: [] },

        isFeatured: { type: Boolean, default: false },
        allowAddToCart: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Product = model("Product", ProductSchema);
export default Product;