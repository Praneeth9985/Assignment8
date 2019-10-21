/*eslint-env browser*/
var primaryColor = "#589ACE";
var secondary1 = "#D2DEEE";
var secondary2 = "#EAEFF5";
var employee1 = ["Steve Rogers", "Team Lead", 3424];
var employee2 = ["Tony Stark", "Sales", 3423];
var employee3 = ["Bruce Banner", "R&D", 3425];
var employee4 = ["Stephens Strange", "Quality Assurance", 3426];
var employee5 = ["Thor Odinson", "Human Resource", 3427];

var employees = [employee1, employee2, employee3, employee4, employee5];
var employeeCount = employees.length;

var inputs = ["Name", "Title", "Extension"];

function $(id) {
  return document.getElementById(id);
}

window.onload = function () {
  document.title = "The Employee Management Application";
  document.body.style.font = "bold 14px arial, sans-serif";

// workaround to dynamically adding listeners when dynamically creating buttons for employees table
  document.body.addEventListener('click', function ( event) {
    for (i = 0; i< employees.length; i++) {
      if( event.srcElement.id == employees[i][2]+" btn" ) {
        deleteEmployee(i, employees[i][2]);
      }
    }
});

  var appHeader = document.createElement("p");
  appHeader.innerHTML = "The Employee Management Application";
  appHeader.style.font = "16px arial";
  document.body.appendChild(appHeader);

  var addEmployeeText = document.createElement("p");
  addEmployeeText.id = "addemployeeText";
  addEmployeeText.innerHTML = "Add Employee";
  document.body.appendChild(addEmployeeText);

  createInputs();

  // for error handling
  var errorDiv = document.createElement("div");
  errorDiv.id = "errorDiv";
  errorDiv.style.color = "red";
  errorDiv.style.clear = "both";
  errorDiv.style.margin = "10px 0";
  document.body.appendChild(errorDiv);

  for (index = 0; index<inputs.length; index++) {
    var error = document.createElement("p");
    error.id = inputs[index]+"Error";
    error.style.color = "red";
    $("errorDiv").appendChild(error);
  }

  createEmptyTable();
  displayEmployeesTable();
}

function createInputs() {
  var formDiv = document.createElement("div");
  formDiv.id = "formDiv";
  formDiv.style.minWidth = "200px";
  formDiv.style.width = "30%";
  formDiv.style.maxWidth = "50%";
  formDiv.style.display = "block";
  document.body.appendChild(formDiv);

  // looping to add inputs
  for (i = 0; i<inputs.length; i++) {
    var inputDiv = document.createElement("div");
    inputDiv.style.clear = "both";

    var label = document.createElement("label");
    label.style.float = "left";
    label.style.font = "14px arial";
    label.innerHTML = inputs[i] + ":";
    label.for = inputs[i]+"Input";

    var input = document.createElement("input");
    input.id = inputs[i]+"Input";
    input.type = "text";
    input.style.float = "right";
    input.style.width = "60%";
    input.style.marginBottom = "10px";
    input.style.border = "1px solid " + primaryColor;

    inputDiv.appendChild(label);
    inputDiv.appendChild(input);

    formDiv.appendChild(inputDiv);
  }

  var submitDiv = document.createElement("div");
  submitDiv.style.clear = "right";
  submitDiv.align = "right";
  var submitBtn = document.createElement("button");
  submitBtn.innerHTML = "ADD";
  submitBtn.style.color = "white";
  submitBtn.style.background = primaryColor;
  submitBtn.style.padding = "3px 20px";
  submitBtn.addEventListener("click", addEmployee);
  submitDiv.appendChild(submitBtn);

  formDiv.appendChild(submitDiv);
}

function createEmptyTable() {
  var tableDiv = document.createElement("div");
  tableDiv.style.float = "left";
  tableDiv.style.minWidth = "400px";
  tableDiv.style.width = "50%";
  document.body.appendChild(tableDiv);
  var showingEmployeeText = document.createElement("p");
  showingEmployeeText.innerHTML = "Showing " +employeeCount+ " Employees";

  tableDiv.appendChild(showingEmployeeText);

  // creating the table
  var table = document.createElement("table");
  table.id = "employeesTable";
  table.style.width = "100%";
  table.style.background = primaryColor;
  table.style.border = "2px solid white";
  table.style.borderCollapse = "collapse";
  var row1 = document.createElement("tr");
  row1.style.color = "white";
  row1.style.border = "2px solid white";

  // table headers
  for (i = 0; i<inputs.length; i++) {
    col = document.createElement("th");
    col.style.width = "25%";
    col.innerHTML = inputs[i];
    col.style.textAlign = "left";
    col.style.border = "1px solid white";
    row1.appendChild(col);
  }

  var row1col4 = document.createElement("th");
  row1col4.style.width = "25%";
  row1col4.style.border = "1px solid white";
  row1col4.align = "center";

  row1.appendChild(row1col4);
  table.appendChild(row1);

  tableDiv.appendChild(table);
}

function displayEmployeesTable() {
  for (i = 0; i < employees.length; i++) {
    addTableRow(i);
  }
}

function addTableRow(index) {
  var table = $("employeesTable");

  // creating cell for employee data
  var row = document.createElement("tr");
  row.id = employees[index][2] + " row";
  for (j = 0; j < employees[index].length; j++) {
    var td = document.createElement("td");
    td.innerHTML = employees[index][j];
    td.style.border = "1px solid white";
    td.style.font = "14px arial";
    row.appendChild(td);
  }

  // need a cell to place the delete button in
  var td = document.createElement("td");
  td.style.border = "1px solid white";
  td.align = "center";
  row.appendChild(td);

  // adding delete button
  var button = document.createElement("button");
  button.innerHTML = "Delete";
  button.style.color = "white";
  button.style.background = primaryColor;
  button.style.padding = "3px 20px";
  button.style.margin = "5px 0";
  button.id = employees[index][2]+" btn";
  row.lastChild.appendChild(button);

  // alternating row color
  if (index%2 === 0) {
    row.style.background = secondary1;
  } else {
    row.style.background = secondary2;
  }
  table.appendChild(row);

}

function deleteEmployee(id, ext) {
  employees.splice(id, 1);
  var row = $(ext + " row");
  console.log("Deleting row: " + row.id);
  row.remove();
}


function addEmployee() {
  var name = $(inputs[0]+"Input");
  var title = $(inputs[1]+"Input");
  var ext = $(inputs[2]+"Input");

  if (isValidInputs()) {
    var newEmployee = [name.value, title.value, ext.value];
    var index = employees.push(newEmployee);
    console.log("Adding " + newEmployee);
    addTableRow(index-1);
    window.alert("New employee added!");
    name.value = "";
    title.value = "";
    ext.value = "";
  }
}

function isValidInputs() {
  var valid = true;
  for (i = 0; i<inputs.length; i++) {
    var input = $(inputs[i]+"Input").value;
    if (isEmpty(input)) {
      $(inputs[i]+"Error").innerHTML = "Please enter " + inputs[i];
      valid = false;
    } else {
      $(inputs[i]+"Error").innerHTML = "";
    }
  }
  return valid;
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}
