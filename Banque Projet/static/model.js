import Client from "./User.js";

const currenUser = JSON.parse(window.localStorage?.getItem("CurrentUser"));
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const date = new Date();
const user = JSON.parse(localStorage.getItem("User"));
const acc = JSON.parse(window.localStorage.getItem("Accounts"));

export async function registerEnd(fName, lName, date, emaill, passw, gender) {
  try {
    const user = new Client(fName, lName, date, emaill, passw, gender);
    const data = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    throw error;
  }
}

export async function loginEnd(data) {
  let errStatus;
  try {
    const promData = await fetch(`${window.origin}/loginReq`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    errStatus = promData.status;
    const res = await promData.json();
    console.log(res);
    successFunc(res);
    return `${res[0][1]} ${res[0][2]}`;
  } catch (error) {
    const newerr =
      errStatus === 403 ? "Account Disabled" : "Invalid Credentials";
    throw newerr;
  }
}

function successFunc(data) {
  console.log(data);
  try {
    if (data.length > 0) {
      const loginuser = new Client(
        data[0][1],
        data[0][2],
        data[0][3].slice(5, 11),
        data[0][4],
        data[0][5],
        data[0][6]
      );
      loginuser.id = data[0][0];
      loginuser._transctions = data[1];

      return $.ajax({
        url: "/pagelogin.html",
        type: "GET",
        success: function (resp) {
          const ress = JSON.stringify(loginuser);
          const allAccounts = JSON.stringify(data[2]);
          setTimeout(() => {
            window.location.replace("pagelogin.html");
          }, 6000);
          console.log(ress, allAccounts);
          localStorage.setItem("User", ress);
          localStorage.setItem("Accounts", allAccounts);
          localStorage.setItem("CurrentUser", JSON.stringify(data[3]));
        },
      });
    }
  } catch (err) {
    alert("Error has occured during Login process");
  }
}

// login poage

async function sendTransactionSQL(transactionInfo, type, receiver = undefined) {
  transactionInfo[2] = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const dataToSend = !receiver
    ? JSON.stringify([transactionInfo, user.id, type])
    : JSON.stringify([transactionInfo, user.id, type, receiver]);
  console.log(dataToSend);
  await fetch(`${window.origin}/update`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
}

/// Loan transaction

export async function loanRequest(fieldVal) {
  console.log(user);
  try {
    console.log(fieldVal);
    if (isFinite(fieldVal) && fieldVal > 0) {
      const amount = Number(fieldVal);
      const loan = [
        "Loan",
        amount,
        `${date.getDate()} ${
          monthNames[date.getMonth()]
        } ${date.getFullYear()}`,
      ];
      await sendTransactionSQL(loan, "Loan");
      return loan;
    } else throw "Invalid Entery";
  } catch (err) {
    throw err;
  }
}

export async function transferRequest(values, balance) {
  try {
    if (isFinite(values.amount) && values.amount > 0) {
      const amount = +values.amount;
      console.log(Number.parseFloat(balance), amount);
      if (Number.parseFloat(balance) < amount) throw "insufficient balance";
      if (currenUser[0][0] === +values.receiver)
        throw "Receiver account cannot be the same";
      if (allAccounts.includes(Number(values.receiver))) {
        const send = [
          "Transfer",
          -amount,
          `${date.getDate()} ${
            monthNames[date.getMonth()]
          } ${date.getFullYear()}`,
        ];
        await sendTransactionSQL(send, "Transfer", values.receiver);
        return send;
      } else throw "Invalid account number !";
    } else {
      throw "Invalid entery";
    }
  } catch (error) {
    throw error;
  }
}

export function backLogout() {
  window.localStorage.clear();
  window.location.replace("/");
}

export async function getTransactions() {
  const request = await fetch(`${window.origin}/transactions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ UserId: user.id }),
  });
  const transactions = await request.json();
  return {
    transactions,
    balance: currentBalanceAcc(transactions),
    accountNumber: currenUser,
    userName: user._firstName,
  };
}

export function currentBalanceAcc(transactions) {
  const total = transactions.reduce((accum, i) => {
    return accum + i[1];
  }, 0);
  return total;
}

export async function disableAccount(values) {
  try {
    let data = JSON.stringify({
      accountNumber: values.accountNumber,
      userId: user.id,
      passwword: values.password,
    });
    console.log(data);
    const request = await fetch(`${window.origin}/delete`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: data,
    });
    const answ = await request.json();
    console.log(answ);
    if (answ) {
      setTimeout(() => {
        backLogout();
      }, 18000);
      return true;
    } else throw `Invalid Account number or Passsword`;
  } catch (error) {
    throw error;
  }
}

// managing account
export async function userInfos() {
  const data = JSON.parse(localStorage.getItem("User"));
  return data;
}
