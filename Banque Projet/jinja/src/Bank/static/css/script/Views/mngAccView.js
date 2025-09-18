export function renderUserInfo(data) {
  fName = document.querySelector(".fName");
  lName = document.querySelector(".lName");
  email = document.querySelector(".email");
  gender = document.querySelector(".gender");
  fName.insertAdjacentHTML("beforeend", data._firstName);
  lName.insertAdjacentHTML("beforeend", data._lasttName);
  email.insertAdjacentHTML("beforeend", data._email);
  gender.insertAdjacentHTML("beforeend", data.gender);
}
