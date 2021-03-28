import { AppError } from './erros/AppError';
import { Request, Response } from "express";
import "express-async-errors"; 
import 'reflect-metadata';
import express, { NextFunction } from 'express';
import createConnection from "./database";
import { router } from "./routes";

createConnection();
const app = express();

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Excluir
 * PATCH => Alteração especifica
 */
app.use(express.json());
 app.use(router);

 app.use((err: Error, request: Request, response: Response, _next: NextFunction) =>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error ${err.message}`,
  })
 })

 export{ app }