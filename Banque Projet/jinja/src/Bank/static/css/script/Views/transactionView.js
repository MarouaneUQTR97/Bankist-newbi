import { Global } from "./View.js";

export class Transactions extends Global {
  _parentElement = document.querySelector(".transaction");
  _currentBalance = document.querySelector(".currbal");
  renderTransaction(elem) {
    this.clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      `<div class="trans">
      <div class="date"><span class="dateTrans">${
        elem[2].length > 15 ? elem[2].slice(5, 17) : elem[2]
      }</span> </div>
      <div class="type"><span class="typeTrans">${elem[0]}</span></div>
      <div class="montant"><span class="montantTrans" ${
        elem[1] < 0
          ? `style="background-image: linear-gradient(to top,#f03e3e,#ff8787)"`
          : `style="background-image: linear-gradient(to top,#4bbb7d ,#8ce99a)"`
      }>${new Intl.NumberFormat().format(elem[1])} $</span></div>
      </div>`
    );
  }

  renderBalance(total) {
    this._currentBalance.textContent = total;
  }
}
