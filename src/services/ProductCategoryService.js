import db from "../models/index"

let createProductCategory = (newProductCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProductCategory = await db.ProductCategory.findOne({
                where: {
                    product_category_name: newProductCategory.product_category_name
                }
            });

            if (checkProductCategory !== null) {
                resolve({
                    status: "OK",
                    message: "The name of category is already",
                });
            }

            let productCategory = await db.ProductCategory.create({
                product_category_name: newProductCategory.product_category_name
            });

            if (productCategory) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: productCategory
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateProductCategory = (productCategoryId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProductCategory = await db.ProductCategory.findOne({
                where: {
                    id: productCategoryId
                },
                raw: true
            });

            if (checkProductCategory) {
                data.updatedAt = new Date();

                await db.ProductCategory.update(
                    data, 
                    {
                    where: {
                        id: productCategoryId
                    }
                });

                let updatedProductCategory = await db.ProductCategory.findOne({
                    where: {
                        id: productCategoryId
                    },
                    raw: true
                })

                resolve({
                    status: "OK",
                    message: "Success",
                    data: updatedProductCategory
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The product category is not defined",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getDetailsProductCategory = (productCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.ProductCategory.findOne({
                where: {
                    id: productCategoryId
                },
                raw: true
            });

            if (category) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: category
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The product category is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let getAllProductCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProductCategory = await db.ProductCategory.findAll();

            resolve({
                status: "OK",
                message: "Success",
                data: allProductCategory
            });
        } catch (error) {
            reject(error);
        }
    });
}

let deleteProductCategory = (productCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProductCategory = await db.ProductCategory.findOne({
                where: {
                    id: productCategoryId
                },
                raw: true
            });

            if (checkProductCategory) {
                await db.ProductCategory.destroy({
                    where: {
                        id: productCategoryId
                    }
                });1

                resolve({
                    status: "OK",
                    message: "Delete product category success",
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The product category is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let deleteMultipleProductCategories = (productCategoryIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = [];

            // Duyệt qua từng productCategoryId trong mảng
            for (const productCategoryId of productCategoryIds) {
                let checkProductCategory = await db.ProductCategory.findOne({
                    where: {
                        id: productCategoryId
                    },
                    raw: true
                });

                if (checkProductCategory) {
                    // Xóa danh mục với productCategoryId
                    await db.ProductCategory.destroy({
                        where: {
                            id: productCategoryId
                        }
                    });

                    results.push({
                        status: "OK",
                        message: `Delete product category with ID ${productCategoryId} success`,
                    });
                } else {
                    results.push({
                        status: "OK",
                        message: `Product category with ID ${productCategoryId} is not defined`,
                    });
                }
            }

            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createProductCategory,
    updateProductCategory,
    getDetailsProductCategory,
    getAllProductCategory,
    deleteProductCategory,
    deleteMultipleProductCategories
}