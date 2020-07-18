module.exports = () => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "Please provide an action body" });
    } else if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes
    ) {
      res.status(400).json({
        error: "Please provide a project_id, description, and a notes field.",
      });
    } else {
      next();
    }
  };
};
