import express from "express";
import { getNoteById, deleteNote, updateNote, creatNote, getAllNotes } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", creatNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
