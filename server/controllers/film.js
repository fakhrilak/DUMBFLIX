const { Film, Category, Episode } = require("../models");
const Joi = require("@hapi/joi");
const { response } = require("express");

exports.getFilm = async (req, res) => {
  try {
		const film = await Film.findAll({
			include: [
        {
          model: Episode,
          as: "episodes",
          attributes: {
            exclude: ["createdAt", "updatedAt", "filmId", "FilmId"],
          },
        },
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
			attributes: { exclude: [ 'createdAt', 'updatedAt', 'categoryId' ] }
		});

		if (film) {
			return res.send({
				data: film
			});
		} else {
			return res.status(400).send({ message: 'Films Not Found' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
	}
};

exports.getDetailFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Episode,
          as: "episodes",
          attributes: {
            exclude: ["createdAt", "updatedAt", "filmId", "FilmId"],
          },
        },
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      order: [[{ model: Episode, as: "episodes" }, "title", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "categoryId"],
      },
    });

    if (film) {
      return res.send({
        data: film,
      });
    } else {
      return res.status(400).send({
        message: "Films Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.addFilm = async (req, res) => {
  try {
		const schema = Joi.object({
			title: Joi.string(),
			thumbnailFilm: Joi.string(),
			year: Joi.number(),
			categoryId: Joi.required(),
			description: Joi.string()
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				error: {
          message: "validate body"
				}
			});
		const {title} = req.body;
		const validatefilms = await Film.findOne({
			where :{
				title
			}
		})
		if(validatefilms){
			return res.status(400).send({ message: 'film dah ada' });
		}
		else{
			const films = await Film.create({
				...req.body	
			});
			const filmss = await Film.findOne({
				attributes: { 
					exclude: [ 'createdAt', 'updatedAt' ] 
				},
				where: {
					id: films.id
				},
				include: {
					model: Category,
					as: 'category',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt' ]
					}
				}
			});
			return res.send({
				data: filmss
			});
		}

	} catch (err) {
		console.log(err);
    return res.status(400).send({ status: 'error',
    massage : error.massage
  });
	}
};

exports.editFilm = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      thumbnailFilm: Joi.string().required(),
      year: Joi.required(),
      category: Joi.required(),
      description: Joi.string().min(10).required(),
    });
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });

    const { id } = req.params;

    const {
      category: { id: categoryId },
    } = req.body;

    const film = await Film.update(
      {
        ...req.body,
        categoryId,
      },
      {
        where: {
          id,
        },
      }
    );

    if (film) {
      const filmResult = await Film.findOne({
        where: {
          id,
        },
        include: {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId"],
        },
      });
      return res.send({
        data: filmResult,
      });
    } else {
      return res.status(400).send({
        message: "Films Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findOne({
      where: {
        id,
      },
    });

    if (film) {
      await Film.destroy({
        where: {
          id,
        },
      });

      return res.send({
        data: {
          id,
        },
      });
    } else {
      return res.status(400).send({
        message: "Film Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
