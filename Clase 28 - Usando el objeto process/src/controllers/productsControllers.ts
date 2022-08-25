import { Request, Response } from "express";
import DBProductsContainer from "../container/dbProductsContainer";

export const getAll = async (req: Request, res: Response) => {
  const products = await DBProductsContainer.getAll();

  res.json(products);
};
