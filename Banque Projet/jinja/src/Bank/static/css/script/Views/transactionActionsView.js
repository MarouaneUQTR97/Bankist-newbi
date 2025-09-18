class Transaction {
  _loanBtn = document.querySelector(".btnLoan");
  _delbtn = document.querySelector(".delete");
  _sendBtn = document.querySelector(".btnSend");
  _loanField = document.querySelector(".loanField");
  _sendToField = document.querySelector(".sendToField");
  _sendAmountField = document.querySelector(".sendField");
  _logoutbtn = document.querySelector(".logout");
  _passwdField = document.querySelector(".pass");
  _closeFieldAcc = document.querySelector(".accNumbClose");

  get loanFieldValue() {
    return this._loanField.value;
  }
  loanView(callBackFunc) {
    this._loanBtn.addEventListener("click", (e) => {
      callBackFunc();
    });
  }

  get transferFieldferValue() {
    return {
      amount: this._sendAmountField.value,
      receiver: this._sendToField.value,
    };
  }

  transferView(callBackFunc) {
    this._sendBtn.addEventListener("click", () => {
      callBackFunc();
    });
  }

  logout(callBackFunc) {
    this._logoutbtn.addEventListener("click", () => {
      callBackFunc();
    });
  }

  get deleteInput() {
    return {
      accountNumber: this._closeFieldAcc.value,
      password: this._passwdField.value,
    };
  }

  delete(callBackFunc) {
    this._delbtn.addEventListener("click", () => {
      callBackFunc();
    });
  }
}

export default new Transaction();
