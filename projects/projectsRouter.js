const express = require("express");
const Project = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await Project.get();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(res.project);
});

async function validateProjectId(req, res, next) {
  try {
    const validProject = await Project.get(req.params.id);

    if (validProject) {
      req.project = validProject;
      next();
    } else {
      res.status(404).json({ error: "Project id could not be found." });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
