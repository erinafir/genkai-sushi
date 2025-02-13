const express = require("express");
const Controller = require("../controllers/controller");
const authenticate = require("../middleware/authentication");
const { authorize } = require("../middleware/authorization");
const multer = require("multer");
const cui = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

cui.use(authenticate);
cui.post("/", Controller.postCuisine);
cui.get("/", Controller.getCuisine);
cui.get("/:id", Controller.getCuisineById);
cui.put("/:id", authorize, Controller.editCuisineById);
cui.delete("/:id", authorize, Controller.deleteCuisineById);
cui.patch("/:id/changeImg", authorize, upload.single("imgUrl"), Controller.changeImg);

module.exports = cui;
