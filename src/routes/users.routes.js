import { Router } from "express";
import { pool } from "../db.js"; // en los controllers
import { client } from "../tursoDB.js"; // en los controllers
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  modifyUser,
} from "../controllers/users.controller.postgres.js";
import {
  createUserTurso,
  deleteUserTurso,
  getUserByIdTurso,
  getUsersTurso,
  modifyUserTurso,
} from "../controllers/users.controller.turso.js";

// ROUTER TO EXPORT
const router = Router();
// router principal a exportar, los otros routers van a estar montdasos en las rutas correspondeintes

// POSRGRES SQL DATABASE router
const postgresRouter = Router();

postgresRouter.get("/users", getUsers);

postgresRouter.get("/users/:id", getUserById);

postgresRouter.post("/users", createUser);

postgresRouter.delete("/users/:id", deleteUser);

postgresRouter.put("/users/:id", modifyUser);

// TURSO SQLITE DATABASE router
const tursoRouter = Router();

tursoRouter.get("/users", getUsersTurso);

tursoRouter.get("/users/:id", getUserByIdTurso);

tursoRouter.post("/users", createUserTurso);

tursoRouter.delete("/users/:id", deleteUserTurso);

tursoRouter.put("/users/:id", modifyUserTurso);

// Mount routers
router.use("/postgres", postgresRouter);
router.use("/turso", tursoRouter);

export default router;

