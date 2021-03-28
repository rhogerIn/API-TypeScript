import {Request, Response} from "express";
import { getCustomRepository, RepositoryNotFoundError } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController{
  async create(request: Request, response: Response) {
    const {title, description} = request.body;
    const surveysReprository = getCustomRepository(SurveysRepository);

    const survey = surveysReprository.create({
      title,
      description
    });
    await surveysReprository.save(survey)

    return response.status(201).json(survey)
  }

  async show(request: Request, response: Response){
    const surveysReprository = getCustomRepository(SurveysRepository);
    const all = await surveysReprository.find();

    return response.json(all);
  }
}

export { SurveyController }