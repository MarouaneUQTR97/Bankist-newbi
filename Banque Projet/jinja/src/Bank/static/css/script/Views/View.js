export class Global {
  popup = document.querySelector(".popup");
  spinner = document.querySelector(".spinner");

  sucess(
    entry,
    stylepop = "linear-gradient(to top,#4bbb7d ,#d3f9d8",
    timeOut = 3000
  ) {
    setTimeout(() => {
      this.popup.insertAdjacentHTML("beforeend", `<p>${entry}</p>`);
      this.popup.style.backgroundImage = stylepop;
      this.showPopup("activeTrue");
    }, timeOut);
  }

  failure(entry, stylepop = "linear-gradient(to top,#f03e3e,#ffec99)") {
    setTimeout(() => {
      this.clear();
      this.popup.insertAdjacentHTML("beforeend", `<p>${entry}</p>`);
      this.popup.style.backgroundImage = stylepop;
      this.showPopup("activeFalse");
    }, 3000);
  }
  showPopup(which) {
    this.clear();
    this.popup.classList.toggle(which);
    setTimeout(() => {
      this.popup.removeChild(this.popup.firstElementChild);
      this.popup.classList.toggle(which);
    }, 3000);
  }

  renderSpinner() {
    setTimeout(() => {
      this.clear();
    }, 3000);
    this.spinner.style.display = "block";
  }

  clear() {
    this.spinner.style.display = "none";
  }
}
