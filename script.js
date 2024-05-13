$(document).ready(function () {
  $("#dateInput").datepicker({
    format: "dd.mm.yyyy",
    autoclose: true,
    startDate: new Date()
  });
});

function getData() {
  var dateInput = document.getElementById("dateInput").value;
  var balanceInput = document.getElementById("balanceInput").value;
  var pnlInput = document.getElementById("pnlInput").value / 100;
  updateDateAndTable(dateInput, balanceInput, pnlInput);
}

function updateDateAndTable(newDateStr, balanceStr, pnlStr) {
  var h3Elements = document.querySelectorAll("h3");
  h3Elements[0].textContent = `Date: ${newDateStr}`;
  h3Elements[1].textContent = `Balance: $${balanceStr}`;
  var parts = newDateStr.split(".");
  var newDate = new Date(parts[2], parts[1] - 1, parts[0]);
  var currentDate = new Date(newDate);
  var tbody = document.querySelector(".table tbody");
  var pnl = parseFloat(pnlStr);
  var table = document.querySelector(".table");
  table.classList.remove("hidden");
  tbody.innerHTML = "";

  var balance = parseFloat(balanceStr.replace("$", ""));

  for (var i = 0; i < 30; i++) {
    var row = document.createElement("tr");
    currentDate.setDate(currentDate.getDate() + 1);
    var cell1 = document.createElement("th");
    cell1.setAttribute("scope", "row");
    cell1.textContent = i + 1;

    var cell2 = document.createElement("td");
    cell2.setAttribute("class", "day");
    cell2.textContent = currentDate.toLocaleDateString("tr-TR");

    var dailyProfit = balance * pnl;
    var cell3 = document.createElement("td");
    cell3.setAttribute("class", "pnl");
    cell3.textContent = "$" + dailyProfit.toFixed(2);

    var current = balance + dailyProfit;
    var cell4 = document.createElement("td");
    cell4.setAttribute("class", "lastPrice");
    cell4.textContent = "$" + current.toFixed(2);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    tbody.appendChild(row);

    balance = current;
  }
}
