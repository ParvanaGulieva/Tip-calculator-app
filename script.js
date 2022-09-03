const resetBtn = document.querySelector(".btn");
const tipResult = document.querySelector(".tip-result");
const totalResult = document.querySelector(".total-result");
const inputBill = document.getElementById("bill");
const inputCustom = document.getElementById("custom");
const inputPeople = document.getElementById("people");
const error1 = document.querySelector(".error1");
const error2 = document.querySelector(".error2");
const percentBox = document.querySelectorAll(".percent-box");

let tipValue = 0;
let peopleValue = 1;
let billValue = 0;

resetBtn.addEventListener("click", () => {
  tipResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
  inputCustom.value = "";
  inputBill.value = "";
  inputPeople.value = "";

  resetBtn.classList.remove("btn-active");

  percentBox.forEach((box) => {
    box.classList.remove("box-active");
  });
});

function calculateResults() {
  peopleValue = parseFloat(inputPeople.value || 0);
  billValue = parseFloat(inputBill.value || 0);

  if (peopleValue >= 1) {
    let tip = (billValue * tipValue * 0.01) / peopleValue;
    let total = billValue / peopleValue + tip;
    tipResult.innerHTML = "$" + tip.toFixed(2);
    totalResult.innerHTML = "$" + total.toFixed(2);
  }
}

inputBill.addEventListener("input", calculateResults);

function checkBillValue() {
  billValue = parseFloat(inputBill.value);
  if (billValue < 0) {
    error1.classList.remove("invisible");
    error1.classList.add("visible");
    error1.classList.add("error-message");
    inputBill.classList.add("error-outline");
    inputBill.classList.add("shake");

    setTimeout(function () {
      error1.classList.remove("error-message");
      error1.classList.remove("visible");
      error1.classList.add("invisible");
      inputBill.classList.remove("error-outline");
      inputBill.classList.remove("shake");
    }, 1500);
  }

  calculateResults();
}

inputBill.addEventListener("input", checkBillValue);

function checkPeopleValue() {
  peopleValue = parseFloat(inputPeople.value);
  if (peopleValue <= 0) {
    error2.classList.remove("invisible");
    error2.classList.add("visible");
    error2.classList.add("error-message");
    inputPeople.classList.add("error-outline");
    inputPeople.classList.add("shake");

    setTimeout(function () {
      error2.classList.remove("error-message");
      error2.classList.remove("visible");
      error2.classList.add("invisible");
      inputPeople.classList.remove("error-outline");
      inputPeople.classList.remove("shake");
    }, 1500);
  } else if (peopleValue !== 0) {
    resetBtn.classList.add("btn-active");
  }

  calculateResults();
}

inputPeople.addEventListener("click", checkPeopleValue);

function calculateCustom() {
  tipValue = parseFloat(inputCustom.value);
  percentBox.forEach((box) => {
    box.classList.remove("box-active");
  });

  if (inputCustom.value !== 0) {
    calculateResults();
  }
}

inputCustom.addEventListener("input", calculateCustom);

percentBox.forEach((box) => {
  box.addEventListener("click", percentBoxStyle);
});

function percentBoxStyle(event) {
  percentBox.forEach((box) => {
    box.classList.remove("box-active");

    if (event.target.innerHTML === box.innerHTML) {
      box.classList.add("box-active");
      tipValue = parseFloat(box.innerHTML);
    }
  });

  calculateResults();
}
