import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";
import supabase from '../../utlis/supabase.js';
class Courses {
    supabase
    constructor() {
         
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY
        )
    }

    async getCourses(req, res) {

        try {
            const { data, error } = await supabase.from('courses').select('*')
            if (error) {
                res.status(500).json({ error: error.message })
            }

            res.json(data)
        } catch (error) {
            console.log(error.message); 
             
        }
    }


    async getCourse(req, res) {
        const courseId = req.params.id;
       

        try {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('course_id', courseId)
                .single();

            if (error) {
                return res.status(500).json({ error: 'Error fetching course details' });
            }

            if (!data) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(data);

        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async enrollment(req, res) {
        const { userId, courseId } = req.body;
        console.log(req.body)

        try {

            const existingEnrollment = await supabase
                .from('enrollments')
                .select('enrollment_id')
                .eq('student_id', userId)
                .eq('course_id', courseId)
                .single()

            if (existingEnrollment.data) {
                console.log("indeside",existingEnrollment.data)
                return res.json({ error: 'User is already enrolled in the course' });
            }

            // If not enrolled, create a new enrollment record
            const data = await supabase
                .from('enrollments')
                .insert([{ student_id: userId, course_id: courseId }]);

            console.log("data",data)
            if (data.error) {
                return res.json({ error: 'Error enrolling in the course' });
            }

            res.json({ success: true, enrollmentId: data });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async getEnrollCourses(req, res) {
        const userId = req.params.userId;

        try {
            // Get enrolled courses for the user
            const { data: enrollments, error } = await supabase
                .from('enrollments')
                .select('course_id')
                .eq('user_id', userId);

            if (error) {
                return res.status(500).json({ error: 'Error fetching enrolled courses' });
            }

            if (!enrollments || enrollments.length === 0) {
                return res.json({ enrolledCourses: [] }); // No enrolled courses
            }

            // Get detailed information for each enrolled course
            const coursesPromises = enrollments.map(async (enrollment) => {
                const courseId = enrollment.course_id;

                // Fetch course details from the 'courses' table
                const { data: courseData, error: courseError } = await supabase
                    .from('courses')
                    .select('course_name', 'instructor_name', 'thumbnail', 'due_date')
                    .eq('id', courseId)
                    .single();

                if (courseError) {
                    console.error('Error fetching course details:', courseError.message);
                    return null;
                }

                return {
                    courseName: courseData.course_name,
                    instructorName: courseData.instructor_name,
                    thumbnail: courseData.thumbnail,
                    dueDate: courseData.due_date,
                    progressStatus: calculateProgressStatus(userId, courseId), // You need to implement this function
                };
            });

            const courses = await Promise.all(coursesPromises);

            // Filter out courses with null values (error fetching details)
            const filteredCourses = courses.filter((course) => course !== null);

            res.json({ enrolledCourses: filteredCourses });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async markAsCompleted(req, res) {
        const { userId, courseId } = req.body;

        try {
            // Check if the user is enrolled in the course
            const { data: enrollment, error } = await supabase
                .from('enrollments')
                .select('id')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .single();

            if (error) {
                return res.status(500).json({ error: 'Error checking enrollment status' });
            }

            if (!enrollment) {
                return res.status(400).json({ error: 'User is not enrolled in the course' });
            }

            // Update the enrollment record to mark the course as completed
            const { error: updateError } = await supabase
                .from('enrollments')
                .update({ completed: true })
                .eq('id', enrollment.id);

            if (updateError) {
                return res.status(500).json({ error: 'Error marking course as completed' });
            }

            res.json({ success: true, message: 'Course marked as completed' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async enrolledCourseDetail(req, res) {
        const userId = req.params.userId;
        const courseId = req.params.courseId;

        try {
            // Check if the user is enrolled in the course
            const { data: enrollment, error: enrollmentError } = await supabase
                .from('enrollments')
                .select('id')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .single();

            if (enrollmentError) {
                return res.status(500).json({ error: 'Error checking enrollment status' });
            }

            if (!enrollment) {
                return res.status(400).json({ error: 'User is not enrolled in the course' });
            }

            // Fetch detailed information about the course
            const { data: courseData, error: courseError } = await supabase
                .from('courses')
                .select('course_name', 'instructor_name', 'thumbnail', 'due_date', 'description')
                .eq('id', courseId)
                .single();

            if (courseError) {
                console.error('Error fetching course details:', courseError.message);
                return res.status(500).json({ error: 'Error fetching course details' });
            }

            // Return the course details
            res.json({
                courseName: courseData.course_name,
                instructorName: courseData.instructor_name,
                thumbnail: courseData.thumbnail,
                dueDate: courseData.due_date,
                description: courseData.description,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new Courses();