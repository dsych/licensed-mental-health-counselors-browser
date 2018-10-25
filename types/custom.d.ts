import { LowdbSync } from "lowdb";

declare global {
  namespace Express {
    export interface Request {
      db: LowdbSync<any>;
    }
  }
}
