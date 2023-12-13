import CourseService from '../services/CourseService';

let createCourse = async (req, res) => {
    try {
        let { course_name } = req.body;

        if (!course_name) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await CourseService.createCourse(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let updateCourse = async (req, res) => {
    try {
        let courseId = req.params.id;
        let data = req.body;
        if (!courseId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The courseId is require"
            });
        }

        let response = await CourseService.updateCourse(courseId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getDetailsCourse = async (req, res) => {
    try {
        let courseId = req.params.id;
        if (!courseId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The courseId is require"
            });
        }

        let response = await CourseService.getDetailsCourse(courseId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllCourse = async (req, res) => {
    try {
        let { limit, page, sort, filter } = req.query;
        let response = await CourseService.getAllCourse(Number(limit) || 20, Number(page) || 1, sort, filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteCourse = async (req, res) => {
    try {
        let courseId = req.params.id;
        if (!courseId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The courseId is require"
            });
        }

        let response = await CourseService.deleteCourse(courseId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let deleteMultipleCourses = async (req, res) => {
    try {
        let courseIds = req.body;
        if (!courseIds) {
            return res.status(200).json({
                status: "ERROR",
                message: "The courseIds is require"
            });
        }

        let response = await CourseService.deleteMultipleCourses(courseIds);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let registerCourse = async (req, res) => {
    try {
        let { course_name } = req.body;

        if (!course_name) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }
        
        let response = await CourseService.registerCourse(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getRegisterCourseByUserId = async (req, res) => {
    try {
        const {userId, courseId} = req.body;

        if (!userId && !courseId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The userId or courseId is require"
            });
        }

        let response = await CourseService.getRegisterCourseByUserId(userId, courseId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let cancelRegisterCourseByUserId = async (req, res) => {
    try {
        const {userId, courseId} = req.body;
        console.log(req.body)
        if (!userId && !courseId) {
            return res.status(200).json({
                status: "ERROR",
                message: "The userId or courseId is require"
            });
        }

        let response = await CourseService.cancelRegisterCourseByUserId(userId, courseId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let getAllRegisterCourseByUserId = async (req, res) => {
    try {
        let response = await CourseService.getAllRegisterCourseByUserId();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
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