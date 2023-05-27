const setPageTitle = (req, res, next) => {
  switch (req.path) {
    case "/dashboard":
      pageTitle = "Dashboard";
      break;
    case "/calculator":
      pageTitle = "Calculator";
      break;
    case "/expenses":
      pageTitle = "Expenses";
      break;
    case "/garden":
      pageTitle = "Garden";
      break;
    case "/notes":
      pageTitle = "Notes";
      break;
    case "/kanban":
      pageTitle = "Kanban";
      break;

    default:
      pageTitle = "Yellow Book";
      break;
  }

  res.locals.title = pageTitle;

  next();
};

module.exports = setPageTitle;
