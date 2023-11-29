import ProductCategoryService from '../services/ProductCategoryService';

let createProductCategory = async (req, res) => {
    try {
        let { product_category_name } = req.body;

        if (!product_category_name) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await ProductCategoryService.createProductCategory(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let updateProductCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        let data = req.body;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryId is require"
            });
        }

        let response = await ProductCategoryService.updateProductCategory(categoryId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getDetailsProductCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryId is require"
            });
        }

        let response = await ProductCategoryService.getDetailsProductCategory(categoryId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllProductCategory = async (req, res) => {
    try {
        let response = await ProductCategoryService.getAllProductCategory();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteProductCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryId is require"
            });
        }

        let response = await ProductCategoryService.deleteProductCategory(categoryId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteMultipleProductCategories = async (req, res) => {
    try {
        let categoryIds = req.body;
        if (!categoryIds) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryIds is require"
            });
        }

        let response = await ProductCategoryService.deleteMultipleProductCategories(categoryIds);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    createProductCategory,
    updateProductCategory,
    getDetailsProductCategory,
    getAllProductCategory,
    deleteProductCategory,
    deleteMultipleProductCategories
}