import { Request, Response, NextFunction } from "express";

//LOGIN
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).render("home", { user: req.user });
  next();
};

export const renderLogin = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

//LOGOUT
export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.render("login");
  });
};

//REGISTER
export const renderRegister = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register");
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).render("createdUser", { user: req.user });
  next();
};

//FAILED REGISTER
export const renderFailedRegister = async (req: Request, res: Response) => {
  res.status(409).render("failedRegister", { message: req.flash("error")[0] });
};

//FAILED LOGIN
export const renderFailedLogin = (req: Request, res: Response) => {
  res.status(401).render("failedLogin", { message: req.flash("error")[0] });
};

//HOME
export const renderHome = (req: Request, res: Response) => {
  res.render("home", { user: req.user });
};
