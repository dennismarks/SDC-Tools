const formModel = require("../models/form.model");

/**
 * User Controller
 *
 * @description :: Server-side logic for managing users.
 */

// TODO: put this as a util function later

function hash(req, res) {}

// (create) on signle object -- POST /
function create(req, res) {}

// (read) all objects -- GET /
function list(req, res) {}

// (read) one single object -- GET /:id
function show(req, res) {
  //   const id = req.params.id;
  //   // Good practise: Validate id immediately.
  //   if (!ObjectID.isValid(id)) {
  //     res.status(404).send(); // if invalid id, definitely can't find resource, 404.
  //   }
  //   // Otherwise, findById
  //   CourseResource.findById(id)
  //     .then((courseResource) => {
  //       if (!courseResource) {
  //         res.status(404).send(); // could not find this student
  //       } else {
  //         res.send(courseResource);
  //       }
  //     })
  //     .catch((error) => {
  //       res.status(500).send(); // server error
  //     });
}

// (update) one single object PATH /:id
function update(req, res) {}

// (destroy) one single object DELETE /:id
function destroy(req, res) {}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
};
