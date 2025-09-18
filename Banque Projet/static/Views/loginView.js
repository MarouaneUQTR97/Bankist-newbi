"use strict";

class Login {
  registerbtn = document.querySelector(".registerbtn");
  openModal = document.querySelector(".login");
  modal = document.querySelector(".logmod");
  modalcont = document.querySelector(".modalcontent");
  close = document.querySelectorAll(".close") || [];
  registermod = document.querySelector(".regmod");
  log = document.querySelector(".log");
  logpassword = document.querySelector(".logpassword");
  logemail = document.querySelector(".logemail");
  closeBurg = document.querySelector(".closeBurg");
  openBurg = document.querySelector(".burger");
  navBar = document.querySelector(".navBar");
  initiateBtns(func) {
    this.openModal.addEventListener("click", () => {
      this.modal.style.display = "block";
      this.modalcont.style.display = "flex";
    });
    this.close.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (e.target.classList.contains("regclose")) {
          this.registermod.style.display = "none";
        }
        this.modal.style.display = "none";
      });
    });
    this.registerbtn.addEventListener("click", () => {
      this.modalcont.style.display = "none";
      // modalcont.style.display='none'
      this.registermod.style.display = "flex";
    });
    this.log.addEventListener("click", () => {
      func();
    });
    this.modal.addEventListener("click", (e) => {
      if (e.target.style.display === "block") {
        if (this.registermod.style.display === "flex")
          this.registermod.style.display = "none";
        this.modal.style.display = "none";
      }
    });

    this.openBurg.addEventListener("click", () => {
      this.openBurg.classList.remove("supportClass");
      this.closeBurg.classList.add("supportClass2");
      this.navBar.classList.toggle("active");
    });

    this.closeBurg.addEventListener("click", () => {
      this.closeBurg.classList.remove("supportClass2");
      this.openBurg.classList.add("supportClass");
      this.navBar.classList.toggle("active");
    });
  }
  loginSubmit() {
    return {
      password: this.logpassword.value,
      email: this.logemail.value,
    };
  }

  // hideBurg() {
  //   console.log(this);
  // }
}

export default new Login();
