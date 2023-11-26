import db from "../models/index"

let createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkCategory = await db.Category.findOne({
                where: {
                    category_name: newCategory.category_name
                }
            });

            if (checkCategory !== null) {
                resolve({
                    status: "OK",
                    message: "The name of category is already",
                });
            }

            let category = await db.Category.create({
                category_name: newCategory.category_name
            });

            if (category) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: category
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateCategory = (categoryId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkCategory = await db.Category.findOne({
                where: {
                    id: categoryId
                },
                raw: true
            });

            if (checkCategory) {
                data.updatedAt = new Date();

                await db.Category.update(
                    data, 
                    {
                    where: {
                        id: categoryId
                    }
                });

                let updatedCategory = await db.Category.findOne({
                    where: {
                        id: categoryId
                    },
                    raw: true
                })

                resolve({
                    status: "OK",
                    message: "Success",
                    data: updatedCategory
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The category is not defined",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getDetailsCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({
                where: {
                    id: categoryId
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
                    message: "The category is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCategory = await db.Category.findAll();

            resolve({
                status: "OK",
                message: "Success",
                data: allCategory
            });
        } catch (error) {
            reject(error);
        }
    });
}

let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkCategory = await db.Category.findOne({
                where: {
                    id: categoryId
                },
                raw: true
            });

            if (checkCategory) {
                await db.Category.destroy({
                    where: {
                        id: categoryId
                    }
                });1

                resolve({
                    status: "OK",
                    message: "Delete category success",
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The category is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let deleteMultipleCategories = (categoryIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = [];

            // Duyệt qua từng categoryId trong mảng
            for (const categoryId of categoryIds) {
                let checkCategory = await db.Category.findOne({
                    where: {
                        id: categoryId
                    },
                    raw: true
                });

                if (checkCategory) {
                    // Xóa danh mục với categoryId
                    await db.Category.destroy({
                        where: {
                            id: categoryId
                        }
                    });

                    results.push({
                        status: "OK",
                        message: `Delete category with ID ${categoryId} success`,
                    });
                } else {
                    results.push({
                        status: "OK",
                        message: `Category with ID ${categoryId} is not defined`,
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
    createCategory,
    updateCategory,
    getDetailsCategory,
    getAllCategory,
    deleteCategory,
    deleteMultipleCategories
}