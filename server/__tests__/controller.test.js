const { test, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { User, Cuisine, Category } = require("../models");
const { signToken } = require("../helpers/jwt");

let token1;
let token2;

beforeAll(async () => {
  let user1 = await User.create({
    username: "Admin",
    email: "erina.fir@gmail.com",
    password: "12345",
    role: "admin",
    phoneNumber: "0123456789",
    address: "addressadmin",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  token1 = signToken({
    id: user1.id,
    email: user1.email,
    role: user1.role,
  });
  let user2 = await User.create({
    username: "staff",
    email: "erinafir@gmail.com",
    password: "12345",
    role: "staff",
    phoneNumber: "0123456789",
    address: "addressadmin",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  token2 = signToken({
    id: user2.id,
    email: user2.email,
    role: user2.role,
  });
  let category = await Category.bulkCreate([{ name: "Appetizer" }, { name: "Sushi" }, { name: "Sashimi" }, { name: "Fried" }, { name: "Grill" }, { name: "Dessert" }]);
  let newData = await Cuisine.bulkCreate([
    {
      name: "Chawanmushi",
      description: "Japanese steamed egg",
      price: 15000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 1,
      authorId: 1,
    },
    {
      name: "Tamagoyaki",
      description: "Tamagoyaki",
      price: 16000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 1,
      authorId: 2,
    },
    {
      name: "Salmon Sashimi",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 3,
      authorId: 1,
    },
    {
      name: "Tuna Sashimi",
      description: "Salmon Sashimi",
      price: 23000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 3,
      authorId: 1,
    },
    {
      name: "Takoyaki",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 3,
      authorId: 1,
    },
    {
      name: "Mochi",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    },
    {
      name: "Salmon Maki",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 3,
      authorId: 1,
    },
    {
      name: "Salmon Grilled Head",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 5,
      authorId: 1,
    },
    {
      name: "Cucumber Maki",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 2,
      authorId: 1,
    },
    {
      name: "Fried Tempura",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 5,
      authorId: 1,
    },
    {
      name: "Waraci Mochi",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    },
    {
      name: "Dango",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    },
    {
      name: "Takoyaki Cheese",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 2,
    },
    {
      name: "Tuna Maki",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 2,
      authorId: 2,
    },
    {
      name: "Octopus Maki",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 2,
      authorId: 2,
    },
    {
      name: "Fried Chicken",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 4,
      authorId: 2,
    },
    {
      name: "Grilled Chicken",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 5,
      authorId: 2,
    },
    {
      name: "Ocha",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 2,
    },
    {
      name: "Cheese Chawanmushi",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 1,
      authorId: 2,
    },
    {
      name: "Salmon Salad",
      description: "Salmon Sashimi",
      price: 20000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 1,
      authorId: 2,
    }
  ]);
});

describe("endpoint get /cuisines", () => {
  test("GET /cuisines should show all cuisines", async () => {
    let response = await request(app)
      .get("/cuisines")
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("endpoint post /cuisines/", () => {
  test("POST /cuisines should show cuisine created", async () => {
    let newData = {
      name: "Mochi Ice Cream",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 15000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .post("/cuisines")
      .send(newData)
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("POST /cuisines should show error because of not logged in", async () => {
    let newData = {
      name: "Mochi Ice Cream",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 15000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app).post("/cuisines").send(newData);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("POST /cuisines should show error invalid token", async () => {
    let newData = {
      name: "Mochi Ice Cream",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 15000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .post("/cuisines")
      .send(newData)
      .set("Authorization", `Bearr ${token1}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("POST /cuisines should show error validation", async () => {
    let newData = {
      name: "",
      description: "",
      price: 0,
      imgUrl: "",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .post("/cuisines")
      .send(newData)
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(400);
  });
});

describe("endpoint put /cuisines/:id", () => {
  test("PUT /cuisines/:id should show cuisine updated", async () => {
    let newData = {
      name: "Mochi Ice Cream edited",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 18000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .put("/cuisines/1")
      .send(newData)
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("PUT /cuisines/:id should show error because of not logged in", async () => {
    let newData = {
      name: "Mochi Ice Cream edited",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 18000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app).put("/cuisines/1").send(newData);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("PUT /cuisines/:id should show error invalid token", async () => {
    let newData = {
      name: "Mochi Ice Cream edited",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 18000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .put("/cuisines/1")
      .send(newData)
      .set("Authorization", `Beare ${token1}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("PUT /cuisines/:id should show error not authorized", async () => {
    let newData = {
      name: "Mochi Ice Cream edited",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 18000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .put("/cuisines/1")
      .send(newData)
      .set("Authorization", `Bearer ${token2}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "You are forbidden to access this data"
    );
  });

  test("PUT /cuisines/:id should show error data not found", async () => {
    let newData = {
      name: "Mochi Ice Cream edited",
      description: "Mochi stuffed with vanilla ice cream inside",
      price: 18000,
      imgUrl:
        "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .put("/cuisines/99")
      .send(newData)
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  });

  test("PUT /cuisines/:id should show error data not valid", async () => {
    let newData = {
      name: "",
      description: "",
      price: 0,
      imgUrl: "",
      categoryId: 6,
      authorId: 1,
    };
    let response = await request(app)
      .put("/cuisines/1")
      .send(newData)
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(400);
  });
});

describe("endpoint delete /cuisines/:id", () => {
  test("DELETE /cuisines/:id should successfully delete data", async () => {
    let response = await request(app)
      .delete("/cuisines/1")
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("DELETE /cuisines/:id should show error because of not logged in", async () => {
    let response = await request(app).delete("/cuisines/1");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("DELETE /cuisines/:id should show error because of invalid token", async () => {
    let response = await request(app)
      .delete("/cuisines/1")
      .set("Authorization", `Beare ${token1}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("DELETE /cuisines/:id should show error because of no data found", async () => {
    let response = await request(app)
      .delete("/cuisines/99")
      .set("Authorization", `Bearer ${token1}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  });

  test("DELETE /cuisines/:id should show error because of authorization", async () => {
    let response = await request(app)
      .delete("/cuisines/1")
      .set("Authorization", `Bearer ${token2}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "You are forbidden to access this data"
    );
  });
});

describe("endpoint get /pub/cuisines", () => {
  test("GET /pub/cuisines/ should show all cuisines", async () => {
    let response = await request(app).get("/pub/cuisines");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("GET /pub/cuisines?filter=1 should show all cuisines with filter category id", async () => {
    let response = await request(app).get("/pub/cuisines?filter=1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("GET /pub/cuisines?page[size]=2&page[number]=1 should show all cuisines limited to 5 items perpage", async () => {
    let response = await request(app).get(
      "/pub/cuisines?page[size]=5&page[number]=1"
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.rows).toHaveLength(5);
  });
});

describe("endpoint get /pub/cuisines/:id", () => {
  test("GET /pub/cuisines/:id should show cuisine by id", async () => {
    let response = await request(app).get("/pub/cuisines/2");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("GET /pub/cuisines/:id should show error data not found", async () => {
    let response = await request(app).get("/pub/cuisines/99");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
