import db from "../models/index"
const { Op } = require('sequelize');

let createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await db.Product.findOne({
                where: {
                    product_name: newProduct.product_name
                }
            });

            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name of product is already",
                });
            }

            let quantity = parseInt(newProduct.quantity, 10);
            let price = parseFloat(newProduct.price);
            let rating = parseFloat(newProduct.rating);
            let discount = parseFloat(newProduct.discount);
            
            let product = await db.Product.create({
                product_name: newProduct.product_name,
                category_id: newProduct.product_category_id,
                category_name: newProduct.product_category_name,
                description: newProduct.description,
                price: isNaN(price) ? 0 : price, 
                quantity: isNaN(quantity) ? 0 : quantity,
                image: newProduct.image,
                rating: isNaN(rating) ? 0 : rating,
                discount: isNaN(discount) ? 0 : discount,
            });

            if (product) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: product
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateProduct = (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await db.Product.findOne({
                where: {
                    id: productId
                },
                raw: true
            });

            if (checkProduct) {
                data.updatedAt = new Date();

                await db.Product.update(
                    data, 
                    {
                    where: {
                        id: productId
                    }
                });

                let updatedProduct = await db.Product.findOne({
                    where: {
                        id: productId
                    },
                    raw: true
                })

                resolve({
                    status: "OK",
                    message: "Success",
                    data: updatedProduct
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getDetailsProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: productId
                },
                raw: true
            });

            if (product) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: product
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let getAllProduct = (limit = 8, page = 1, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalProduct = await db.Product.count();
            let offset = (page - 1) * limit;

            if (filter) {
                let whereClause = {
                    [filter[0]]: {
                        [Op.like]: `%${filter[1]}%`
                    }
                };
                
                let allProductFilter = await db.Product.findAll({
                    where: whereClause,
                    limit: limit,
                    offset: offset,
                    
                });

                resolve({
                    status: "OK",
                    message: "Success",
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: page,
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
            
            if (sort) {
                let allProductSort = await db.Product.findAll({
                    limit: limit,
                    offset: offset,
                    order: [[sort[0], sort[1] === 'asc' ? 'ASC' : 'DESC']]
                });

                resolve({
                    status: "OK",
                    message: "Success",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page,
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }

            let allProduct = await db.Product.findAll({
                limit: limit,
                offset: offset
            });

            resolve({
                status: "OK",
                message: "Success",
                data: allProduct,
                total: totalProduct,
                pageCurrent: page,
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (error) {
            reject(error);
        }
    });
}

let deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkProduct = await db.Product.findOne({
                where: {
                    id: productId
                },
                raw: true
            });

            if (checkProduct) {
                await db.Product.destroy({
                    where: {
                        id: productId
                    }
                });1

                resolve({
                    status: "OK",
                    message: "Delete product success",
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let deleteMultipleProducts = (productIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = [];

            // Duyệt qua từng productId trong mảng
            for (const productId of productIds) {
                let checkProduct = await db.Product.findOne({
                    where: {
                        id: productId
                    },
                    raw: true
                });

                if (checkProduct) {
                    // Xóa sản phẩm với productId
                    await db.Product.destroy({
                        where: {
                            id: productId
                        }
                    });

                    results.push({
                        status: "OK",
                        message: `Delete product with ID ${productId} success`,
                    });
                } else {
                    results.push({
                        status: "OK",
                        message: `Product with ID ${productId} is not defined`,
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
    createProduct,
    updateProduct,
    getDetailsProduct,
    getAllProduct,
    deleteProduct,
    deleteMultipleProducts
}