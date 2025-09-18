import { Global } from "./View.js";

class Register extends Global {
  signupbtn = document.querySelector(".signup");
  fName = document.querySelector(".fName");
  lName = document.querySelector(".lName");
  emaill = document.querySelector(".emailreg");
  passw = document.querySelector(".passwd");

  dict = {};
  // date=
  registerCall(func) {
    this.signupbtn.addEventListener("click", () => {
      func();
    });
  }

  getData() {
    return (this.dict = {
      fName: this.fName.value,
      lName: this.lName.value,
      date: new Date(
        `${document.querySelector(".day").value}-${
          document.querySelector(".month").value
        }-${document.querySelector(".year").value}`
      ),
      emaill: this.emaill.value,
      passw: this.passw.value,
      gender: document.querySelector("input[name='gen']:checked")?.value,
    });
  }
}

export default new Register();
