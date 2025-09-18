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

const modelLoan = async function () {
  try {
    newViewobj.renderSpinner();
    const fieldVal = Transaction.loanFieldValue;
    const elem = await loanRequest(fieldVal);
    newViewobj.sucess(`Loan Approved`);
    setTimeout(() => {
      newViewobj.renderTransaction(elem);
      updateBalance(fieldVal);
    }, 3000);
  } catch (error) {
    newViewobj.failure(`An error has occured : ${error}`);
  }
};
const modelTransfer = async function () {
  try {
    newViewobj.renderSpinner();
    const values = Transaction.transferFieldferValue;
    const elem = await transferRequest(values, currentBalance());
    newViewobj.sucess(`Transfer Completed`);
    setTimeout(() => {
      newViewobj.renderTransaction(elem);
      updateBalance(-values.amount);
    }, 3000);
  } catch (error) {
    console.log(error);
    newViewobj.failure(`An error has occured : ${error}`);
  }
};

const logout = function () {
  newViewobj.sucess(`See you next time`, undefined, 0);
  setTimeout(() => {
    backLogout();
  }, 3000);
};

async function renderTransactions() {
  newViewobj.renderSpinner();
  const data = await getTransactions();
  data.transactions.forEach((elem) => {
    newViewobj.renderTransaction(elem);
  });
  renderBalanceAcc(data.accountNumber, data.balance);
  renderName(data.userName);
}

async function disableAcc() {
  try {
    newViewobj.renderSpinner();
    const values = Transaction.deleteInput;
    await disableAccount(values);
    newViewobj.sucess("Your account has been disabled");
  } catch (error) {
    newViewobj.failure(error);
  }
}

async function init() {
  Transaction.loanView(modelLoan);
  Transaction.transferView(modelTransfer);
  Transaction.logout(logout);
  Transaction.delete(disableAcc);
  renderTransactions();
  setting(await userInfos());
}
init();

import { userInfos } from "./model.js";
