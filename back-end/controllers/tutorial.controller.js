const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    Tutorial.create(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the Tutorial.",
            });
        });
};

// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}` } } : null;

    Tutorial.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while retrieving tutorials",
            });
        });
};

// Find a tutorial by the id in request
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Can not find Tutorial with id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving Tutorial with id=${id}`,
            });
        });
};

// Update a Tutorial by the id in request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was successfully updated",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error updating tutorial with id=${id}`,
            });
        });
};

// Delete a tutorial with the id in request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: `Tutorial was deleted successfully`,
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete Tutorial with id=${id}`,
            });
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Tutorials were deleted successfully`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `An error occurred while removing all tutorials`,
            });
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `An error occurred while retrieving tutorials`,
            });
        });
};
