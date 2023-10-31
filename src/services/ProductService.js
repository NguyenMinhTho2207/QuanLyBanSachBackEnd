import db from "../models/index"

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

            let product = await db.Product.create({
                product_name: newProduct.product_name,
                category_id: newProduct.category_id,
                description: newProduct.description,
                price: newProduct.price,
                quantity: newProduct.quantity,
                image: newProduct.image,
                rating: newProduct.rating
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

let getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProduct = await db.Product.findAll();

            resolve({
                status: "OK",
                message: "Success",
                data: allProduct
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

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    getAllProduct,
    deleteProduct
}