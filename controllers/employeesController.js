const data = {
  employees: require("../model/employees.json"),
  setEmployees(data) {
    this.employees = data;
  },
};
data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => res.json(data.employees);

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const { firstname, lastname } = req.body;
  res.json({ firstname, lastname });
};

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  res.json({ id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
