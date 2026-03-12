import express from "express";

import {employeeUsers, showCreatePage, employeeCreate, showEditPage, employeeUpdate, employeeDelete,} from "../controller/empController.js";

const router = express.Router();

router.get("/", employeeUsers);
router.get("/create", showCreatePage);
router.post("/create", employeeCreate);
router.get("/edit/:id", showEditPage);
router.post("/edit/:id", employeeUpdate);
router.get("/delete/:id", employeeDelete);

export default router;
