const currentBal = document.querySelector(".currbal");
export function renderBalanceAcc(accountNumb, balance) {
  const accRenfer = document.querySelector(".acc");
  accRenfer.insertAdjacentHTML("beforeend", `${accountNumb}`);
  currentBal.textContent = `${new Intl.NumberFormat().format(balance)}$`;
}

export function updateBalance(plus) {
  currentBal.textContent = `${new Intl.NumberFormat().format(
    Number.parseFloat(currentBal.textContent) + +plus
  )}$`;
}

export function renderName(arg) {
  document.querySelector(".userName").textContent = arg;
}

export function currentBalance() {
  return currentBal.textContent;
}
