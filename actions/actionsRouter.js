const express = require("express");
const Action = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel");
const validateActionBody = require("../middleware/validateActionBody");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allActions = await Action.get();
    res.json(allActions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.json({ message: "DELETED", action: req.action });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateActionId,
  validateActionBody(),
  validateProjectId,
  async (req, res, next) => {
    const changes = req.body;
    changes.project_id = req.action.project_id;
    console.log(changes);
    try {
      const updatedAction = await Action.update(req.params.id, changes);
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

async function validateActionId(req, res, next) {
  try {
    const validAction = await Action.get(req.params.id);
    if (validAction) {
      req.action = validAction;
      next();
    } else {
      res.status(404).json({ error: "Action id could not be found." });
    }
  } catch (error) {
    next(error);
  }
}

async function validateProjectId(req, res, next) {
  try {
    const validProject = await Project.get(req.body.project_id);

    if (validProject) {
      next();
    } else {
      res.status(404).json({ error: "Project id could not be found." });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
