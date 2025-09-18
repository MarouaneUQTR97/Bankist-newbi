// import loginuser from './modal.js'
import {
  loanRequest,
  transferRequest,
  backLogout,
  getTransactions,
  disableAccount,
} from "./model.js";
import Transaction from "./Views/transactionActionsView.js";
import { Transactions } from "./Views/transactionView.js";
import {
  renderBalanceAcc,
  updateBalance,
  renderName,
  currentBalance,
} from "./Views/accAndBalanceView.js";
import { setting } from "./Views/settingsView.js";
const newViewobj = new Transactions();

async function init() {
  setting();
}
init();
