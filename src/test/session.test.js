/* eslint-disable no-undef */
import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/sessions");
const userRequest = supertest("http://localhost:8080/api/users");

describe("Test Sessions: ", () => {
  let userTest = {};
  it("[POST] /api/sessions/register - Debe registrar un usuario", async () => {
    const newUser = {
      first_name: "Pepe",
      last_name: "Perez",
      email: "pepe@gmail.com",
      age: 33,
      password: "123",
    };

    const { status, body } = await request.post("/register").send(newUser);
    
    userTest = body.payload;
    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.email).to.be.equal(newUser.email);
    expect(body.payload.fullName).to.be.equal(`${newUser.first_name} ${newUser.last_name}`);
    expect(body.payload.password).to.not.be.equal(newUser.password);
  });

  it("[GET] /api/sessions/login - Debe loguear un usuario", async () => {
    const data = {
      email: "pepe@gmail.com",
      password: "123",
    };

    const { status, body } = await request.get("/login").send(data);

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.message).to.be.an("string");
  });



  after(async () => {
    await userRequest.delete(`/${userTest.id}`);
  });
});