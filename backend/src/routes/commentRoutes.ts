import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";

const commentRouter = Router();

// POST /api/comments/:productId - Add comment to product (protected)
commentRouter.post(
  "/:productId",
  requireAuth(),
  commentController.createComment,
);

// DELETE /api/comments/:productId - Delete comment (protected + owner only)
commentRouter.delete(
  "/:commentId",
  requireAuth(),
  commentController.deleteComment,
);

export default commentRouter;
