import CategoryService from '../services/CategoryService';

let createCategory = async (req, res) => {
    try {
        let { category_name } = req.body;

        if (!category_name) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await CategoryService.createCategory(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let updateCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        let data = req.body;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryId is require"
            });
        }

        let response = await CategoryService.updateCategory(categoryId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getDetailsCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryId is require"
            });
        }

        let response = await CategoryService.getDetailsCategory(categoryId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllCategory = async (req, res) => {
    try {
        let response = await CategoryService.getAllCategory();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The categoryId is require"
            });
        }

        let response = await CategoryService.deleteCategory(categoryId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    createCategory,
    updateCategory,
    getDetailsCategory,
    getAllCategory,
    deleteCategory
}