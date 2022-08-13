import { Request, Response } from "express";
import DBProductsContainer from "../container/dbProductsContainer";

export const getAll = async (req: Request, res: Response) => {
  const products = await DBProductsContainer.getAll();

  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = await DBProductsContainer.getById(Number(id));

  res.json(body);
};

export const addProduct = async (req: Request, res: Response) => {
  const product = req.body;

  const storedProduct = await DBProductsContainer.addProduct(product);
  res.json(storedProduct);
};

export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body;

  await DBProductsContainer.updateProductById(Number(id), product);

  res.json({ msg: `Product ${id} updated.` });
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await DBProductsContainer.deleteProductById(
    Number(id)
  );

  res.json({
    deletedProduct,
  });
};
