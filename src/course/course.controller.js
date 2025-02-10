import Course from "./course.model.js"
import User from "../user/user.model.js";

export const createCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const { name } = req.body;

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: "El ID del usuario es obligatorio"
            });
        }

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        if (user.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Solo los profesores pueden crear cursos."
            });
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "El nombre del curso es obligatorio"
            });
        }

        const course = await Course.create({ name, teacher: uid });

        return res.status(201).json({
            success: true,
            message: "Curso creado exitosamente",
            course
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el curso",
            error: err.message
        });
    }
};

export const listCourse = async (req, res) => {
    try {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: "El ID del usuario es obligatorio"
            });
        }

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        if (user.role !== "STUDENT_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Solo los estudiantes pueden ver los cursos."
            });
        }

        const courses = await Course.find().populate("teacher", "name surname email");

        return res.status(200).json({
            success: true,
            courses
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        });
    }
};

export const assignCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const { courseId } = req.body;

        const student = await User.findById(uid);
        if (!student || student.role !== "STUDENT_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Solo los estudiantes pueden inscribirse en cursos."
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado."
            });
        }

        if (course.students && course.students.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está inscrito en este curso."
            });
        }

        course.students = course.students || [];
        course.students.push(uid);
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Estudiante inscrito correctamente en el curso.",
            course
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al inscribir al estudiante en el curso.",
            error: err.message
        });
    }
};


export const getCourseStudents = async (req, res) => {
    try {
        const { uid } = req.params;
        const { courseId } = req.body;

        const teacher = await User.findById(uid);
        if (!teacher || teacher.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Solo los profesores pueden ver los estudiantes del curso."
            });
        }

        const course = await Course.findById(courseId)
            .populate({ path: "students", select: "name surname email" })
            .exec();

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado."
            });
        }

        if (course.teacher.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Solo el profesor del curso puede ver los estudiantes."
            });
        }

        if (!course.students || course.students.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No hay estudiantes asignados a este curso.",
                students: []
            });
        }

        return res.status(200).json({
            success: true,
            students: course.students
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la lista de estudiantes.",
            error: err.message
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const { courseId } = req.body;

        const teacher = await User.findById(uid);
        if (!teacher || teacher.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Solo los profesores pueden eliminar cursos."
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado."
            });
        }

        await User.updateMany(
            { _id: { $in: course.students } }, 
            { $pull: { courses: courseId } }
        );

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Curso eliminado correctamente y desasignado de todos los estudiantes."
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso.",
            error: err.message
        });
    }
};



