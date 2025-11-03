import { Router } from "express";
import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointmentStatus,
  getAppointmentsByDate
} from "../controllers/appointment.controller.js";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.get("/date/:date", getAppointmentsByDate);
router.patch("/:id/status", updateAppointmentStatus);

export default router;