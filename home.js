//* Home Page JS
let availableAmount = parseInt(
  document.getElementById("available-amount").innerText
);
const verifyPin = 1234;

//? Log Out Button
document.getElementById("logout-btn").addEventListener("click", function () {
  window.location.href = "index.html";
});

//? Home Page Cards
const cards = document.getElementsByClassName("card");
const hiddenSections = document.querySelectorAll("section.hidden-section");

for (const card of cards) {
  card.addEventListener("click", function () {
    const cardId = card.getAttribute("data-target");

    hiddenSections.forEach((section) => {
      section.style.display = "none";
    });
    for (const c of cards) {
      c.classList.remove("card-toggle");
    }
    card.classList.add("card-toggle");
    document.getElementById(cardId).style.display = "block";
  });
}

//? Add Money
const form1 = document.querySelector(".add-money-form");
document.getElementById("add-money-btn").addEventListener("click", function () {
  const inputs = document.querySelectorAll(
    "#add-money input, #add-money select"
  );
  const amountToAdd = document.querySelector("#add-money #amount").value;
  if (inputs[0].value === "Select Bank") {
    alert("Please Select a Bank");
  } else if (inputs[1].value.length !== 11) {
    alert("Please enter 11 digit valid Account Number");
  } else if (amountToAdd === "") {
    alert("Please Enter an Amount");
  } else {
    const pinNumber = document.getElementById("add-money-pin").value;
    if (Number(pinNumber) === verifyPin) {
      availableAmount += Number(amountToAdd);
      document.getElementById("available-amount").innerText = availableAmount;
    } else {
      alert("Incorrect Pin");
    }
  }
});

//? Cash Out
const form2 = document.querySelector(".cash-out-form");
document.getElementById("cash-out-btn").addEventListener("click", function () {
  const inputs = document.querySelectorAll("#cashOut input");
  const amountToRemove = document.querySelector("#cashOut #amount").value;
  if (inputs[0].value.length !== 11) {
    alert("Please enter 11 digit valid Number");
  } else if (amountToRemove === "") {
    alert("Please Enter an Amount");
  } else {
    const pinNumber = document.getElementById("cash-out-pin").value;
    if (Number(pinNumber) === verifyPin) {
      availableAmount -= Number(amountToRemove);
      document.getElementById("available-amount").innerText = availableAmount;
    } else {
      alert("Incorrect Pin");
    }
  }
});
