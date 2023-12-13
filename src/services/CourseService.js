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

            let price = parseFloat(newCourse.price);
            let schedule = parseFloat(newCourse.schedule);

            let course = await db.Course.create({
                course_name: newCourse.course_name,
                image: newCourse.image,
                schedule: isNaN(schedule) ? 0 : schedule,
                description: newCourse.description,
                student_count: 0,
                teacher: newCourse.teacher,
                price: isNaN(price) ? 0 : price
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

let getAllCourse = (limit = 20, page = 1, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let totalCourse = await db.Course.count();
            let offset = (page - 1) * limit;

            if (filter) {
                let whereClause = {
                    [filter[0]]: {
                        [Op.like]: `%${filter[1]}%`
                    }
                };
                
                let allCourseFilter = await db.Course.findAll({
                    where: whereClause,
                    limit: limit,
                    offset: offset,
                    
                });

                resolve({
                    status: "OK",
                    message: "Success",
                    data: allCourseFilter,
                    total: totalCourse,
                    pageCurrent: page,
                    totalPage: Math.ceil(totalCourse / limit)
                });
            }
            
            
            if (sort) {
                let allCourseSort = await db.Course.findAll({
                    limit: limit,
                    offset: offset,
                    order: [[sort[0], sort[1] === 'asc' ? 'ASC' : 'DESC']]
                });

                resolve({
                    status: "OK",
                    message: "Success",
                    data: allCourseSort,
                    total: totalCourse,
                    pageCurrent: page,
                    totalPage: Math.ceil(totalCourse / limit)
                });
            }

            let allCourse = await db.Course.findAll({
                limit: limit,
                offset: offset
            });

            resolve({
                status: "OK",
                message: "Success",
                data: allCourse,
                total: totalCourse,
                pageCurrent: page,
                totalPage: Math.ceil(totalCourse / limit)
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
                    message: "Delete courses success",
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

let deleteMultipleCourses = (courseIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = [];

            // Duyệt qua từng courseId trong mảng
            for (const courseId of courseIds) {
                let checkCourse = await db.Course.findOne({
                    where: {
                        id: courseId
                    },
                    raw: true
                });

                if (checkCourse) {
                    // Xóa khóa học với courseId
                    await db.Course.destroy({
                        where: {
                            id: courseId
                        }
                    });

                    results.push({
                        status: "OK",
                        message: `Delete course with ID ${courseId} success`,
                    });
                } else {
                    results.push({
                        status: "OK",
                        message: `Course with ID ${courseId} is not defined`,
                    });
                }
            }

            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
}

let registerCourse = (newRegisterCourse) => {
    return new Promise(async (resolve, reject) => {
        try {
            let registerCourse = await db.CourseRegistration.create({
                user_id: newRegisterCourse.user_id,
                user_name: newRegisterCourse.user_name,
                address: newRegisterCourse.address,
                avatar: newRegisterCourse.avatar,
                phone_number: newRegisterCourse.address,
                course_id: newRegisterCourse.course_id,
                course_name: newRegisterCourse.course_name
            });

            if (registerCourse) {
                // Cập nhật trường student_count của khóa học
                await db.Course.update(
                    { student_count: db.Sequelize.literal('student_count + 1') },
                    { where: { id: newRegisterCourse.course_id } }
                );

                resolve({
                    status: "OK",
                    message: "Success",
                    data: registerCourse
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getRegisterCourseByUserId = (userId, courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await db.CourseRegistration.findOne({
                where: {
                    user_id: userId,
                    course_id: courseId
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
                // Trả kết quả khi không tìm thấy
                resolve({
                    status: "NOTFOUND",
                    message: "Course not found",
                    data: []
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let cancelRegisterCourseByUserId = (userId, courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Xóa đăng ký khóa học của user theo userId và courseId
            const deletedRegistration = await db.CourseRegistration.destroy({
                where: {
                    user_id: userId,
                    course_id: courseId
                }
            });

            if (deletedRegistration > 0) {
                // Nếu có record bị xóa, cập nhật trường student_count - 1 theo courseId
                await db.Course.update(
                    { student_count: db.Sequelize.literal('student_count - 1') },
                    { where: { id: courseId } }
                );

                resolve({
                    status: "OK",
                    message: "Success",
                    data: deletedRegistration
                });
            } else {
                resolve({
                    status: "Not Found",
                    message: "Record not found for deletion",
                    data: null
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getAllRegisterCourseByUserId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy tất cả các bản ghi từ bảng CourseRegistration
            let courseRegistration = await db.CourseRegistration.findAll();

            resolve({
                status: "OK",
                message: "Success",
                data: courseRegistration
            });
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
    deleteCourse,
    deleteMultipleCourses,
    registerCourse,
    getRegisterCourseByUserId,
    cancelRegisterCourseByUserId,
    getAllRegisterCourseByUserId
}