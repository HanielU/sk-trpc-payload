/**
 * THIS IS A DUMMY FILE TO AVOID ERRORS IN THE server
 * BECAUSE THE WEB FOLDER IS BUILT BY THE FRONTEND
 */

import type { NextFunction } from "express";

export const handler = async (req, res, next: NextFunction) => {
  console.log("Request received");
  next();
};
