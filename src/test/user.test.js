/* eslint-disable no-undef */
import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/users");

describe("Test Users: ", () => {
  let testUser = {};

  it("[GET] /api/users - Debe devolver un array de usuarios", async () => {
    const { status, body } = await request.get("/");
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("array");
  });

  it("[POST] /api/users - Debe crear un nuevo usuario", async () => {
    const newUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "juan.perez@gmail.com",
      age: 33,
      password: "password123",
    };

    const { status, body } = await request.post("/").send(newUser);
    testUser = body.payload;

    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an("object");
    expect(body.payload.fullName).to.be.equal(`${newUser.first_name} ${newUser.last_name}`);
    expect(body.payload.email).to.be.equal("juan.perez@gmail.com");
  });

  it("[PUT] /api/users/:uid - Debe actualizar un usuario", async () => {
    const updatedUser = {
      email: "juan@gmail.com",
    };

    const { status, body } = await request.put(`/${testUser.id}`).send(updatedUser);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("object");
    expect(body.payload.email).to.be.equal("juan@gmail.com");
  });

  it("[DELETE] /api/users/:uid - Debe eliminar un usuario", async () => {
    const { status, body } = await request.delete(`/${testUser.id}`);

    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal("User deleted");
  });
});
