import { Connection, getConnection } from 'typeorm';
import request from "supertest";
import { app } from "../app";

import createConnection from '../database'

describe("Surveys",  () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async() => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

   it("Should be able to create a new survey", async () => {
     const response = await request(app).post("/surveys").send({
       title:"Test Titulo",
       description:"Desc example",
     });
     expect(response.status).toBe(201);
     expect(response.body).toHaveProperty("id");
   });

   it("Should be able to get all surveys on database", async () =>{
      await request(app).post("surveys").send({
       title:"Test All",
       description:"done",
     }) ;

     const response = await request(app).get("/surveys");
     expect(response.body.lenght).toBe(1);
   })
})