import { Router } from "express";
import {  getUserById, getUsers, deleteUser, updateUser  } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updateUserValidator } from "../middlewares/user-validators.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

export default router