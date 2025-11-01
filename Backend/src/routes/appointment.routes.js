import { Router } from "express";
import {createAppointment,getAppointmentById } from "../controller/appointment.controller.js"

const router = Router();

router.post("/", createAppointment);
router.get("/:id", getAppointmentById);

export default router;
