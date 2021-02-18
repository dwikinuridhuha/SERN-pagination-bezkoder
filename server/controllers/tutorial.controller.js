const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const { count: totalItem, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPage = Math.ceil(totalItem/limit);

    return {totalItem, tutorials, totalPage, currentPage}
};

exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    let condition = title ? {title: {[Op.like]: `%${title}%`}}: null;
    const {limit, offset} = getPagination(page, size);
 
    Tutorial.findAndCountAll({
        where: condition, limit, offset
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.status(200).send(response);
    }).catch(e => {
        res.status(500).send({
            message: e.message || "something error"
        });
    });
};

exports.findAllPublished = (req, res) => {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);

    Tutorial.findAndCountAll({
        where: {pub: true}, limit, offset
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    }).catch(e => {
        res.status(500).send({
            message: e.message || "something error"
        });
    });
};

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "content can not be empty"
        });
        res.end();
    }

    const tutorial = {
        title,
        desc,
        pub
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(500).send({
                message: e.message
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    console.log(req.body);
  
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };