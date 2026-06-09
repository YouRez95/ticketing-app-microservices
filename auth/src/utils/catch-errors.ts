import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const catchErrors =
  (controller: AsyncController): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(next);
  };

export default catchErrors;
