import express from 'express'
import Courses from '../../controller/Courses/courseController.js'
import verifyToken from '../../middleware/protectedRoutes.js';
const router = express.Router();


router.get('/courses', Courses.getCourses)
router.get('/course/:id', Courses.getCourse)
router.get('/enrolled-courses/:userId',   Courses.getEnrollCourses)
router.get('/enroll-course-detail/:userId/:courseId', verifyToken, Courses.enrolledCourseDetail)
router.post('/enroll',  Courses.enrollment)
router.post('/mark-as-completed/',  Courses.markAsCompleted)


export default router;