import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error while gettinf products: ", error);
    res.status(500).json({ error: "Faile to get products" });
  }
};

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const myProducts = await queries.getProductsByUserId(userId);
    res.status(200).json(myProducts);
  } catch (error) {
    console.error("Error while fetching user Products: ", error);
    res.status(500).json({ error: "Error while getting User Products!" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    // const { productId } = req.params;
    const productId = String(req.params.productId);
    const product = await queries.getProductById(productId);

    if (!product)
      return res
        .status(404)
        .json({ error: `Product with id! ${productId} is not found !` });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error while fetching product with id: ", error);
    res.status(500).json({ error: "Error while getting product by Id!" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      res
        .status(400)
        .json({ error: "Title, description adn immageUrl are required!" });
      return;
    }
    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });
    res.status(201).json({ msg: "Product created Successfully", product });
    // if (!newProduct) res.
  } catch (error) {
    console.error("Error while creating product", error);
    res.status(500).json({ error: "Failed to create Product!" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const productId = String(req.params.productId);
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(productId);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found!" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only update your own products!" });
      return;
    }

    const product = await queries.updateProduct(productId, {
      title,
      description,
      imageUrl,
    });
    res.status(200).json({ msg: "Product updated Successfully", product });
    // if (!newProduct) res.
  } catch (error) {
    console.error("Error while updating product", error);
    res.status(500).json({ error: "Failed to update Product!" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const productId = String(req.params.productId);
    // const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(productId);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found!" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only delete your own products!" });
      return;
    }

    const product = await queries.deleteProduct(productId);
    res.status(204).send();
    // if (!newProduct) res.
  } catch (error) {
    console.error("Error while deleting product", error);
    res.status(500).json({ error: "Failed to delete Product!" });
  }
};
