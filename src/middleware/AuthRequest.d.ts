import { Request } from "express";

interface AuthRequest extends Request {
  user?: string | object;
}
