import Product from "./product.model.js";

const getAllProducts = async (req, res) => {
    try {
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 16;
        const skip = (page - 1) * limit;

        // Query params
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order || "desc";

        // Category
        const categoryParam = req.query.category;
        const categories = categoryParam
            ? Array.isArray(categoryParam)
                ? categoryParam
                : [categoryParam]
            : [];

        const location = req.query.location || "";

        const organicOnly = req.query.organic === "true";

        const priceRange = req.query.priceRange || "";

        const filter = {};

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        if (categories.length > 0) {
            filter.category = { $in: categories };
        }

        if (location && location !== "All Locations") {
            filter.location = location;
        }

        if (organicOnly) {
            filter.isOrganic = true;
        }

        if (priceRange) {
            if (priceRange === "under30") {
                filter.price = { $lte: 30 };
            } else if (priceRange === "30to50") {
                filter.price = { $gte: 30, $lte: 50 };
            } else if (priceRange === "50to100") {
                filter.price = { $gte: 50, $lte: 100 };
            } else if (priceRange === "over100") {
                filter.price = { $gte: 100 };
            }
        }

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort({ [sortBy]: order === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            products,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
            },
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const body = req.body;

        // tags: Product Features
        if (typeof body.tags === 'string') {
            body.tags = body.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
        }

        const parsed = productValidationSchema.safeParse(body);

        if (!parsed.success) {
            return res.status(400).json({
                success: true,
                message: "validation faild",
            })
        }

        const newProduct = await Product.create({
            ...parsed.data,
            authorId: req.user.id,
            authorName: req.user.name,
            likes: [],
        })

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            newProduct
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}