import { AppError } from './../erros/AppError';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { Request, Response } from 'express';

class AnswerController {

  async execute(request: Request, response: Response){
    const {value} = request.params;
    const {u} = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
  
    const surveyUser = await surveysUsersRepository.findOne({
      id:  String(u),
    });
    if(!surveyUser){
      throw new AppError("Survey user does not exists")
    }
    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController}