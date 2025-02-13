const { Op, col } = require("sequelize");
const { User, Category, Cuisine } = require("../models");
const cloudinary = require("cloudinary").v2;

class Controller {
  static async postCuisine(req, res, next) {
    try {
      const { userId } = req.user;
      const { name, description, price, imgUrl, categoryId } = req.body;
      let data = await Cuisine.create({
        name: name,
        description: description,
        price: price,
        imgUrl: imgUrl,
        categoryId: categoryId,
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisine(req, res, next) {
    try {
      let allCuisine = await Cuisine.findAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Category,
          },
        ],
      });
      res.status(200).json(allCuisine);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editCuisineById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      await Cuisine.update(req.body, {
        where: {
          id: id,
        },
      });
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisineById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      await Cuisine.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `${data.name} success to delete` });
    } catch (error) {
      res.send(error);
      next(error);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;
      let newCategory = await Category.create({
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ newCategory });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      let allCategories = await Category.findAll();
      res.status(200).json({ allCategories });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategories(req, res, next) {
    try {
      let { catId } = req.params;
      let data = await Category.findByPk(catId);
      if (!data) {
        throw { name: "404" };
      }
      await Category.update(req.body, {
        where: {
          id: catId,
        },
      });
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let { catId } = req.params;
      let data = await Category.findByPk(catId);
      if (!data) {
        throw { name: "404" };
      }
      await Category.destroy({ where: { id: catId } });
      res.status(200).json({ message: `${data.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisinePub(req, res, next) {
    try {
      const { filter, search, sort, page } = req.query;
      let paramsQuery = {
        include: Category,
      };
      if (search && filter) {
        paramsQuery.where = {
          [Op.and]: [
            { name: { [Op.iLike]: `%${search}%` } },
            {
              categoryId: filter,
            },
          ],
        };
      } else if (search) {
        paramsQuery.where = { name: { [Op.iLike]: `%${search}%` } };
      } else if (filter) {
        paramsQuery.where = {
          categoryId: filter,
        };
      }
      if (sort) {
        let ordering = sort[0] === "-" ? "DESC" : "ASC";
        let columnName = ordering === "DESC" ? sort.slice(1) : sort;
        paramsQuery.order = [[columnName, ordering]];
      }
      let limit = 10;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = page.size;
          paramsQuery.limit = limit;
        }
        if (page.number) {
          pageNumber = page.number;
          paramsQuery.offset = limit * (pageNumber - 1);
        }
      }
      paramsQuery.limit = limit;
      paramsQuery.offset = limit * (pageNumber - 1);
      let { count, rows } = await Cuisine.findAndCountAll(paramsQuery);
      let result = {
        total: count,
        size: limit,
        totalPage: Math.ceil(count / limit),
        currentPage: pageNumber,
        data: rows,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineByIdPub(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Cuisine.findByPk(id, { include: Category });
      console.log(data);
      if (!data) {
        throw { name: "404" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async changeImg(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Cuisine.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      let base64string = req.file.buffer;
      const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
          })
          .end(base64string);
      });
      data = await data.update({ imgUrl: uploadResult.secure_url });
      res.status(201).json({ message: `image ${data.name} success to update` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
