import { Router } from "express";
import { getAllMessages, getMessage,createMessage, setReaded } from "../controller/MessageController";
const router = Router();

router.get("/", getAllMessages);
router.get("/:id", getMessage);
router.post("/", createMessage);
// router.put("/:id", updateMessage);
// router.delete("/:id", deleteMessage);
router.put("/read/:id",setReaded)
    

export default router;