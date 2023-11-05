import ProductService from '../services/ProductService';

let createProduct = async (req, res) => {
    try {
        let { product_name, category_id, description, price, quantity, image, rating } = req.body;

        if (!product_name || !category_id || !description || !price || !quantity || !image || !rating) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let updateProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The productId is require"
            });
        }

        let response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getDetailsProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The productId is require"
            });
        }

        let response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllProduct = async (req, res) => {
    try {
        let { limit, page, sort, filter } = req.query;
        let response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 1, sort, filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The productId is require"
            });
        }

        let response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    getAllProduct,
    deleteProduct
}