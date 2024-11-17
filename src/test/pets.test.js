/* eslint-disable no-undef */
import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/pets");

describe("Test Pets: ", () => {
  let testPet = {};
  it("[GET] /api/pets - Debe devolver un array de mascotas", async () => {
    const { status, body } = await request.get("/");
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("array");
  });

  it("[POST] /api/pets - Debe crear una nueva mascota", async () => {
    const newPet = {
      name: "tom",
      specie: "cat",
      birthDate: "10/10/2023",
      image: "",
    };
    const { status, body } = await request.post("/").send(newPet);
    testPet = body.payload;
    //console.log("Pet creado:", testPet); 
    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an("object");
    expect(body.payload.name).to.be.equal("tom");
    expect(body.payload.specie).to.be.equal("cat");
  });

  it("[PUT] /api/pets/:pid - Debe actualizar una mascota", async () => {
    const newPet = {
      specie: "Perro",
    };

    const { status, body } = await request.put(`/${testPet.id}`).send(newPet);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("object");
    expect(body.payload.name).to.be.equal("tom");
  });

  it("[DELETE] /api/pets/:pid - Debe eliminar una mascota", async () => {
    const { status, body } = await request.delete(`/${testPet.id}`);
    
    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal("pet deleted");
  });
});