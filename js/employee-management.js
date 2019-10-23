/*eslint-env browser*/
var employee1 = ["Sponge Bob", "Team Lead", 3982];
var employee2 = ["Squidward", "Sales", 3423];
var employee3 = ["Sandy", "R&D", 3232];
var employee4 = ["Patrick", "Quality Assurance", 3716];
var employee5 = ["Mr. Krabbs", "CEO ", 3417];

var labels = ["Name", "Title", "Extension"];
var employees = [employee1, employee2, employee3, employee4, employee5];

var $ = function(id) {
    "use strict";
    return window.document.getElementById(id);
};

window.onload = function(){
    document.title = "The Employee Managemment Application";
    document.body.style.font = "sans-serif";

    document.body.addEventListener('click', function (event) {
        for (i = 0; i< employees.length; i++) {
          if( event.srcElement.id == employees[i][2]+" btn" ) {
            deleteEmp(i, employees[i][2]);
          }
        }
    });

    var heading = document.createElement("h4");
    heading.innerHTML = "The Employee Management Application";
    heading.style.font = "24px sans-serif";
    document.body.appendChild(heading);

    var addEmp = document.createElement("p");
    addEmp.innerHTML = "Add Employee";
    addEmp.style.font = "bold 18px sans-serif";
    document.body.appendChild(addEmp);

    readInputs();

    var errorDiv = document.createElement("div");
  errorDiv.id = "errorDiv";
  errorDiv.style.color = "red";
  errorDiv.style.clear = "both";
  errorDiv.style.margin = "10px 0";
  document.body.appendChild(errorDiv);

  for (index = 0; index<labels.length; index++) {
    var error = document.createElement("p");
    error.id = labels[index]+"Error";
    error.style.color = "red";
    $("errorDiv").appendChild(error);
  }

    showEmptext(); 
    createTable();
    
    displayTableData();
}

function readInputs(){                                  //Inputs of the form
    var dform = document.createElement("div");
    dform.style.minWidth = "200px";
    dform.style.marginTop = "25px";
    dform.style.width = "25%";
    document.body.appendChild(dform);
  
    for (i = 0; i<labels.length; i++) {
      var inputs = document.createElement("div");
      inputs.style.clear = "both";
  
      var textLabel = document.createElement("label");    
      textLabel.style.float = "left";
      textLabel.style.font = "16px sans-serif";
      textLabel.innerHTML = labels[i] + ":";
  
      var inputBox = document.createElement("input");
      inputBox.type = "text";
      inputBox.id = "label"+[i];
      inputBox.style.float = "right";
      inputBox.style.width = "70%";
      inputBox.style.height = "20px";
      inputBox.style.marginBottom = "20px";
      inputBox.style.border = "1px solid #0a718a";
  
      inputs.appendChild(textLabel);
      inputs.appendChild(inputBox);
  
      dform.appendChild(inputs);
    }
    var dadd = document.createElement("div");
    dadd.style.clear = "right";
    dadd.align = "right";
    var addButton = document.createElement("button");
    addButton.innerHTML = "Add";
    addButton.style.color = "white";
    addButton.style.background = "#408dc7";
    addButton.style.border ="solid #287fc0";
    addButton.style.padding = "5px 30px";


    addButton.addEventListener("click", addEmp);
    dadd.appendChild(addButton);
    dform.appendChild(dadd);
} 
function showEmptext(){
    var showEmpText = document.createElement("p");
    showEmpText.innerHTML = "Showing " +employees.length + " Employees";
    showEmpText.style.font = "bold 14px sans-serif";
    document.body.appendChild(showEmpText);
}
function createTable(){
  var dtable = document.createElement("div");
  dtable.style.width = "800px";
  document.body.appendChild(dtable);
  //var showingEmployeeText = showEmptext();
  //dtable.appendChild(showingEmployeeText);

  // creating the table
  var table = document.createElement("table");
  table.id = "empTable";
  table.style.width = "100%";
  table.style.height = "30px";
  table.style.background = "#408dc7";
  table.style.border = "2px solid white";
  table.style.borderCollapse = "collapse";
  var headRow = document.createElement("tr");
  headRow.style.color = "white";
  headRow.style.font = "12px sans-serif";
  headRow.style.border = "2px solid white";

  // table headers
  for (i = 0; i<labels.length; i++) {
    var cols = document.createElement("th");
    cols.style.width = "25%";
    cols.innerHTML = labels[i];
    cols.style.font = "sans-serif";
    cols.style.textAlign = "left";
    cols.style.border = "1px solid white";
    headRow.appendChild(cols);
  }

  var delCol = document.createElement("th");
  delCol.style.width = "25%";
  delCol.style.border = "1px solid white";
  delCol.align = "center";

  headRow.appendChild(delCol);
  table.appendChild(headRow);

  dtable.appendChild(table);
}

function displayTableData(){
     for(i = 0; i < employees.length; i++){
        addEmpRow(i);
     }  
}  

function addEmpRow(length1){
    var table = $("empTable");

  var row = document.createElement("tr");
  row.id = employees[length1][2] + " row";
  for (j = 0; j < employees[length1].length; j++) {
    var td = document.createElement("td");
    td.innerHTML = employees[length1][j];
    td.style.border = "1px solid white";
    td.style.font = "14px arial";
    row.appendChild(td);
  }

 
  var td = document.createElement("td");
  td.style.border = "1px solid white";
  td.align = "center";
  row.appendChild(td);


  var button = document.createElement("button");
  button.innerHTML = "Delete";
  button.style.color = "white";
  button.style.background = "#408dc7";
  button.style.padding = "3px 20px";
  button.style.margin = "5px 0";
  button.id = employees[length1][2]+" btn";
  row.lastChild.appendChild(button);


  if (length1%2 === 0) {
    row.style.background = "#D2DEEE";
  } else {
    row.style.background = "#EAEFF5";
  }
  table.appendChild(row);
}

function addEmp(){
    var name = $("label0");
    var title = $("label1");
    var extension = $("label2"); 

    if(isValid()){
        var newEmp = [name.value, title.value, extension.value];
        var newArr = employees.push(newEmp);
        addEmpRow(newArr - 1);
        name.value = "";
        title.value = "";
        extension.value = "";
    }
}

function deleteEmp(i, j) {
    employees.splice(i, 1);
    var row = $(j + " row");
    row.remove();
  }

function isValid() {
    var valid = true;
    for (i = 0; i<labels.length; i++) {
      var input = $("label" +[i]).value;
      if (isEmpty(input)) {
        $(labels[i]+"Error").innerHTML = "Please enter " + labels[i];
        valid = false;
      } else {  
        $(labels[i]+"Error").innerHTML = "";
      }
    }
    return valid;
  }

function isEmpty(str) {
    return (!str || 0 === str.length);
}