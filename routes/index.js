import { Router } from "express";
import employeeRouter from "./employee";
const router = Router();

router.use("/employee", employeeRouter);

export default router;


// /api/v1/employee