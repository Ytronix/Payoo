//* Home Page JS
let availableAmount = parseInt(
  document.getElementById("available-amount").innerText
);
const verifyPin = 1234;
let transactionData = [];

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
  })
}

//? Add Money
const form1 = document.querySelector(".add-money-form");
document.getElementById("add-money-btn").addEventListener("click", function () {
  const inputs = document.querySelectorAll(
    "#add-money input, #add-money select"
  );
  const amountToAdd = document.querySelector("#add-money #amount").value;
  inputs.forEach((el) => el.classList.remove("alert"));
  if (inputs[0].value === "Select Bank") {
    inputs[0].classList.add("alert");
    alert("Please Select a Bank");
  } else if (inputs[1].value.length !== 11) {
    inputs[1].classList.add("alert");
    alert("Please enter 11 digit valid Account Number");
  } else if (amountToAdd === "") {
    inputs[2].classList.add("alert");
    alert("Please Enter an Amount");
  } else {
    const pinNumber = document.getElementById("add-money-pin").value;
    if (Number(pinNumber) === verifyPin) {
      availableAmount += Number(amountToAdd);
      document.getElementById("available-amount").innerText = availableAmount;

      const data = {
        name: "Add Money",
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      transactionData.push(data);
      renderTransactions();
    } else {
      inputs[3].classList.add("alert");
      alert("Incorrect Pin");
    }
  }
});

//? Cash Out
const form2 = document.querySelector(".cash-out-form");
document.getElementById("cash-out-btn").addEventListener("click", function () {
  const inputs = document.querySelectorAll("#cashOut input");
  const amountToRemove = document.querySelector("#cashOut #amount").value;
  inputs.forEach((input) => input.classList.remove("alert"));
  if (inputs[0].value.length !== 11) {
    inputs[0].classList.add("alert");
    alert("Please enter 11 digit valid Number");
  } else if (
    amountToRemove === "" ||
    Number(amountToRemove) > availableAmount
  ) {
    inputs[1].classList.add("alert");
    alert("Please Enter a Valid Amount");
  } else {
    const pinNumber = document.getElementById("cash-out-pin").value;
    if (Number(pinNumber) === verifyPin) {
      availableAmount -= Number(amountToRemove);
      document.getElementById("available-amount").innerText = availableAmount;

      const data = {
        name: "Cash Out",
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      transactionData.push(data);
      renderTransactions();
    } else {
      inputs[2].classList.add("alert");
      alert("Incorrect Pin");
    }
  }
});

//? Transfer Money
const form3 = document.querySelector(".transfer-money-form");
document.getElementById("send-btn").addEventListener("click", function () {
  const inputs = document.querySelectorAll("#transfer input");
  const amountToSend = document.querySelector("#transfer #amount").value;
  inputs.forEach((input) => input.classList.remove("alert"));
  if (inputs[0].value.length !== 11) {
    inputs[0].classList.add("alert");
    alert("Please enter 11 digit valid Number");
  } else if (amountToSend === "" || Number(amountToSend) > availableAmount) {
    inputs[1].classList.add("alert");
    alert("Please Enter a Valid Amount");
  } else {
    const pinNumber = document.getElementById("transfer-pin").value;
    if (Number(pinNumber) === verifyPin) {
      availableAmount -= Number(amountToSend);
      document.getElementById("available-amount").innerText = availableAmount;

      const data = {
        name: "Send Money",
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      transactionData.push(data);
      renderTransactions();
    } else {
      inputs[2].classList.add("alert");
      alert("Incorrect Pin");
    }
  }
});

//? Get Bonus
document.getElementById("get-bonus-btn").addEventListener("click", function () {
  const input = document.querySelector("#get-bonus input");
  input.classList.remove("alert");
  if (input.value === "KaderVaiJindabad") {
    availableAmount += availableAmount * 0.15;
    document.getElementById("available-amount").innerText =
      availableAmount.toFixed(2);
  } else {
    alert("Incorrect Coupon Code!");
    input.classList.add("alert");
  }
});

//? Pay Bills
const form4 = document.querySelector(".pay-bill-form");
document.getElementById("pay-bill-btn").addEventListener("click", function () {
  const inputs = document.querySelectorAll("#pay-bill input, #pay-bill select");
  const amountToPay = document.querySelector("#pay-bill #amount").value;
  inputs.forEach((input) => input.classList.remove("alert"));
  if (inputs[0].value === "Select to Pay") {
    inputs[0].classList.add("alert");
    alert("Please Select a Bill to Pay");
  } else if (inputs[1].value.length !== 11) {
    inputs[1].classList.add("alert");
    alert("Please Enter a valid number");
  } else if (amountToPay === "" || Number(amountToPay) > availableAmount) {
    inputs[2].classList.add("alert");
    alert("Please Enter a Valid Amount");
  } else {
    const pinNumber = document.getElementById("pay-bill-pin").value;
    if (Number(pinNumber) === verifyPin) {
      availableAmount -= Number(amountToPay);
      document.getElementById("available-amount").innerText = availableAmount;

      const data = {
        name: "Pay Bill",
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      transactionData.push(data);
      renderTransactions();
    } else {
      inputs[3].classList.add("alert");
      alert("Incorrect Pin Number");
    }
  }
});

//? Transaction History
const transactionContainer = document.getElementById("history-card-container");

function renderTransactions() {
  transactionContainer.innerHTML = ""; // clear previous

  for (const data of transactionData) {
    const div = document.createElement("div");
    div.classList.add(
      "history-cards",
      "flex",
      "justify-between",
      "items-center",
      "rounded-xl",
      "p-4",
      "bg-white"
    );

    div.innerHTML = `
        <div class="flex items-center gap-5">
          <div class="bg-zinc-200 rounded-4xl p-3">
            <img src="images/purse1.png" class="w-8 h-8" alt="" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">${data.name}</h3>
            <p class="text-sm text-zinc-500">${data.date}</p>
          </div>
        </div>
        <img src="images/3-dot.png" class="w-6 h-7" alt="" />
    `;

    transactionContainer.appendChild(div);
  }
}