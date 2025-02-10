import { Router } from "express";
import { createCourse, listCourse, assignCourse, getCourseStudents, deleteCourse } from "./course.controller.js";

const router = Router();

router.post("/createCourse/:uid", createCourse);
router.get("/listCourse/:uid", listCourse);
router.post("/assignCourse/:uid", assignCourse);
router.post("/getCourseStudents/:uid", getCourseStudents);
router.delete("/deleteCourse/:uid", deleteCourse)

export default router;