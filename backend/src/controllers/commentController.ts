import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized!" });

    const productId = req.params.productId as string;
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ error: "Comment Content is Required!" });

    const existingProduct = await queries.getProductById(productId);

    if (!existingProduct)
      return res.status(404).json({ error: "Product Not Found!" });

    const comment = await queries.createComment({
      userId: userId,
      content: content,
      productId: productId,
    });
    return res
      .status(201)
      .json({ msg: "Comment created successfully!", comment });
  } catch (error) {
    console.error("Error while creating the comment: ", error);
    res.status(500).json({ error: "Error while creating the comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized!" });

    const commentId = req.params.commentId as string;
    const comment = await queries.getCommentById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment Not Found!" });

    if (comment.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only delete your own comments!" });

    await queries.deleteComment(commentId);
    res.status(204).send();
  } catch (error) {
    console.error("Error while deleting the comment: ", error);
    res.status(500).json({ error: "Failed to delete the comment" });
  }
};
