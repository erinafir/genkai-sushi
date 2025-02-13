const { test, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const {User, Cuisine} = require('../models')
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
  let user = await User.create({
    username: "Admin",
    email: "erina.fir@gmail.com",
    password: '12345',
    role: "admin",
    phoneNumber: "0123456789",
    address: "addressadmin",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
});

afterAll(async()=>{
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
})

test("POST /login should return access token", async () => {
  let loginData = { email: "erina.fir@gmail.com", password: "12345" };
  let response = await request(app).post("/login").send(loginData);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("access_token", expect.any(String));
});


test("POST /login should give error email required", async () => {
  let loginData = { email: "", password: "12345" };
  let response = await request(app).post("/login").send(loginData);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("message", "Email is required");
})

test("POST /login should give error password required", async () => {
  let loginData = { email: "erina.fir@gmail.com", password: "" };
  let response = await request(app).post("/login").send(loginData);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("message", "Password is required");
})

test("POST /login should give error email/password invalid", async () => {
  let loginData = { email: "a@gmail.com", password: "12345" };
  let response = await request(app).post("/login").send(loginData);
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty("message", "Email/Password Invalid");
})

test("POST /login should give error email/password invalid", async () => {
  let loginData = { email: "erina.fir@gmail.com", password: "12341" };
  let response = await request(app).post("/login").send(loginData);
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty("message", "Email/Password Invalid");
})

