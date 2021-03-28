import { AppError } from './../erros/AppError';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';


class UserController{
  async create(request:Request, response: Response){
    const {name, email} = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é Obrigatório."),
      email: yup.string().email().required("Email é obrigatório.")
    })

    try{
      await schema.validate(request.body, {abortEarly: false})
    }catch(err){
      throw new AppError(err);
    }

    const userRepository = getCustomRepository(UsersRepository);

   //FindOne =  SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExist = await userRepository.findOne({
      email
    })
    if(userAlreadyExist){
      throw new AppError("Este usuário ja existe!");
    }

    /**
     * BLOCO CREATE - Criar usuário
     */
    const user = userRepository.create({
      name, email
    })
    await userRepository.save(user);
    /******************************** */
    return response.status(201).json(user); 
  }
}

export { UserController };
