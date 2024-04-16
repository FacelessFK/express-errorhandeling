import Express from "express";
import {
    createContent,
    deleteContent,
    getAllContent,
    getContent,
    updateContent
} from "../controllers/contents";

const router = Express.Router();

router.route("/contents/new-content").post(createContent);
router.route("/contents").get(getAllContent);
router
    .route("/contents/:id")
    .get(getContent)
    .put(updateContent)
    .delete(deleteContent);

export default router;
