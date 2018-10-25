import { LowdbSync } from "lowdb";

/**
 * @FIXME
 * Declaration merging is not working for some reason.
 */
declare global {
  namespace Express {
    export interface Request {
      db: LowdbSync<any>;
    }
  }
}

/**
 * In the meantime, we export the interface from outside of the express namespace
 */
export interface Request {
  db: LowdbSync<any>;
}
