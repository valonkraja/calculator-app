const keys = document.querySelector(".keys");
const display = document.querySelector(".display");
const themeEl = document.querySelector(".slider");
const zeroEl = document.querySelector(".zero");
const dotEl = document.querySelector(".dot");
const body = document.querySelector("body");
const operations = document.querySelectorAll(".op");

let res = null;
let curr = "0";
let temp = null;
let opAddSub = "";
let opMulDiv = "";
let operation = "";

const clearPressed = function () {
  operations.forEach((operation) => operation.classList.remove("pressed"));
};

const formatNumber = function (curr) {
  if (curr.includes(".")) {
    let int = curr.split(".");

    display.innerText = `${Number(int[0]).toLocaleString()}.${int[1]}`;
  } else {
    display.innerText = Number(curr).toLocaleString();
  }
};

themeEl.addEventListener("change", function (e) {
  let theme = +e.target.value;
  if (theme === 2) {
    body.className = "t2";
  } else if (theme === 3) {
    body.className = "t3";
  } else {
    body.className = "";
  }
});

keys.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn");

  if (!btn) return false;

  if (!isNaN(btn.value)) {
    if (curr.replace(".", "").length > 8) return;
    if (curr === "0") {
      curr = btn.value;
      display.innerText = curr;
      zeroEl.removeAttribute("disabled");
    } else {
      curr += btn.value;
      formatNumber(curr);
      // if (curr.includes(".")) {
      //   let int = curr.split(".");

      //   display.innerText = `${Number(int[0]).toLocaleString()}.${int[1]}`;
      // } else {
      //   display.innerText = Number(curr).toLocaleString();
      // }
    }
  }
  if (btn.value === "+" || btn.value === "-") {
    clearPressed();
    btn.classList.add("pressed");
    if (res === null) {
      res = Number(curr);
      opAddSub = btn.value;
      operation = btn.value;
      curr = "0";
    } else if (temp === null) {
      opAddSub === "+" ? (res += Number(curr)) : (res -= Number(curr));
      curr = "0";
      opAddSub = btn.value;
      operation = btn.value;
    } else {
      opMulDiv === "x" ? (temp *= Number(curr)) : (temp /= Number(curr));
      res === 0
        ? (res = temp)
        : opAddSub === "+"
        ? (res += temp)
        : (res -= temp);
      curr = "0";
      temp = null;
      opAddSub = btn.value;
      operation = btn.value;
    }

    formatNumber(res.toString());
  }

  if (btn.value === "x" || btn.value === "/") {
    clearPressed();
    btn.classList.add("pressed");

    if (res === null) {
      res = 0;
      temp = Number(curr);
      opMulDiv = btn.value;
      operation = btn.value;
      curr = "0";
    } else if (temp === null) {
      temp = Number(curr);
      opMulDiv = btn.value;
      operation = btn.value;
      curr = "0";
    } else {
      opMulDiv === "x" ? (temp *= Number(curr)) : (temp /= Number(curr));
      curr = "0";
      opMulDiv = btn.value;
      operation = btn.value;
    }
    formatNumber(temp.toString());
  }

  if (btn.value === "=") {
    clearPressed();

    if (temp === null) {
      operation === "+"
        ? (res += Number(curr))
        : operation === "-"
        ? (res -= Number(curr))
        : operation === "x"
        ? (res *= Number(curr))
        : (res /= Number(curr));
    } else {
      operation === "+"
        ? (temp += Number(curr))
        : operation === "-"
        ? (temp -= Number(curr))
        : operation === "x"
        ? (temp *= Number(curr))
        : (temp /= Number(curr));

      if (res === 0) {
        res = temp;
      } else {
        opAddSub === "+" ? (res += temp) : (res -= temp);
      }
    }

    formatNumber(res.toString());
    curr = res.toString();
    temp = null;
    res = null;
  }

  if (btn.value === "delete") {
    zeroEl.setAttribute("disabled", "");
    curr = "0";
    display.innerText = curr;
  }
  if (btn.value === "reset") {
    clearPressed();
    zeroEl.setAttribute("disabled", "");
    curr = "0";
    display.innerText = curr;
    res = null;
    temp = null;
  }
  if (btn.value === ".") {
    zeroEl.removeAttribute("disabled");
    if (curr.includes(".")) return;
    curr += ".";
    display.innerText = curr;
  }
});
