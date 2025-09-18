import registerView from "./Views/registerView.js";
import loginView from "./Views/loginView.js";
import { Global } from "./Views/View.js";
import { loginEnd, registerEnd } from "./model.js";

const obj = new Global();

async function inputsRegisterModal() {
  // get inputfields values
  try {
    const data = registerView.getData();
    obj.renderSpinner();
    // Calling model to register and validate inputs
    await registerEnd(
      data.fName,
      data.lName,
      data.date,
      data.emaill,
      data.passw,
      data.gender
    );
    registerView.sucess(`Successfully signed up ! Thank you .`);
  } catch (errorMsg) {
    registerView.failure(errorMsg);
  }
}
console.log(document.getElementsByName("csrfmiddlewaretoken")[0].value);
async function loginModal() {
  // getting logigfiels values
  try {
    obj.renderSpinner();
    const loginInputs = loginView.loginSubmit();
    const fullName = await loginEnd({
      Email: loginInputs.email,
      Passwd: loginInputs.password,
    });
    registerView.sucess(`Welcome ${fullName}`);
  } catch (errorMsg) {
    registerView.failure(errorMsg);
  }
}

function init() {
  loginView.initiateBtns(loginModal);
  registerView.registerCall(inputsRegisterModal);
}

init();
const burg = document.querySelector(".burger");

// window.onresize = test;

// function test() {
//   if (window.innerWidth === 1050) {
//     burg.classList.remove("supportClass");
//   }
// }
