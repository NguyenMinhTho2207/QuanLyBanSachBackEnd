import db from "../models/index"

let createCourse = (newCourse) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkCourse = await db.Course.findOne({
                where: {
                    course_name: newCourse.course_name
                }
            });

            if (checkCourse !== null) {
                resolve({
                    status: "OK",
                    message: "The name of course is already",
                });
            }

            let course = await db.Course.create({
                course_name: newCourse.course_name
            });

            if (course) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: course
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateCourse = (courseId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkCourse = await db.Course.findOne({
                where: {
                    id: courseId
                },
                raw: true
            });

            if (checkCourse) {
                data.updatedAt = new Date();

                await db.Course.update(
                    data, 
                    {
                    where: {
                        id: courseId
                    }
                });

                let updatedCourse = await db.Course.findOne({
                    where: {
                        id: courseId
                    },
                    raw: true
                })

                resolve({
                    status: "OK",
                    message: "Success",
                    data: updatedCourse
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The course is not defined",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getDetailsCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let course = await db.Course.findOne({
                where: {
                    id: courseId
                },
                raw: true
            });

            if (course) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: course
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The course is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

let getAllCourse = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCourse = await db.Course.findAll();

            resolve({
                status: "OK",
                message: "Success",
                data: allCourse
            });
        } catch (error) {
            reject(error);
        }
    });
}

let deleteCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkCourse = await db.Course.findOne({
                where: {
                    id: courseId
                },
                raw: true
            });

            if (checkCourse) {
                await db.Course.destroy({
                    where: {
                        id: courseId
                    }
                });1

                resolve({
                    status: "OK",
                    message: "Delete course success",
                });
            }
            else {
                resolve({
                    status: "OK",
                    message: "The course is not defined",
                });
            }
        
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createCourse,
    updateCourse,
    getDetailsCourse,
    getAllCourse,
    deleteCourse
}