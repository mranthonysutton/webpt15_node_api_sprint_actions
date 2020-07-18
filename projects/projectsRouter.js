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
  res.json(req.project);
});

router.post("/", validateProjectBody, async (req, res) => {
  try {
    const newProject = await Project.insert(req.body);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateProjectId, validateProjectBody, async (req, res) => {
  try {
    const newProject = await Project.update(req.params.id, req.body);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await Project.remove(req.params.id);
    res.json({ message: "DELETED", project: req.project });
    res.json(deletedProject);
  } catch (error) {
    next(error);
  }
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

function validateProjectBody(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Please provide a project body" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ error: "Please provide a name and a description." });
  } else {
    next();
  }
}

module.exports = router;
