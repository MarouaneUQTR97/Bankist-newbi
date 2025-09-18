export function setting(data) {
  document.querySelector(".dropMenu").addEventListener("click", function (e) {
    console.log("clicked");
    document.querySelector(".dropDown-List").classList.toggle("activeDrop");
  });
  console.log(data);
  document
    .querySelector(".manageAccount")
    .addEventListener("click", function () {
      document.querySelector(".main").innerHTML = `<section class="options">
      <div class="selections">
        <a href="">Account Settings</a>
        <a href="">Open New Account</a>
      </div>
      <button class="btn save">Save changes</button>
    </section>
    <section class="fields">
      <div class="divField">
      <div class="fieldsnames firstName">First Name :</div>
      <span class="fName" data-type="text"></span>
      <button class="btn mng">Modifier</button>
    </div>
    <div class="divField">
      <div class="fieldsnames lastName">Last Name :</div>
      <span class="lName" data-type="text"></span>
      <button class="btn mng">Modifier</button>
    </div>
    <div class="divField">
      <div class="fieldsnames">Email :</div>
      <span class="email" data-type="email"></span>
      <button class="btn mng">Modifier</button>
    </div>
    <div class="divField">
      <div class="fieldsnames passwd">Password :</div>
      <span class="passw" data-type="password"></span>
      <button class="btn mng">Modifier</button>
    </div>
    <div class="divField">
      <div class="fieldsnames ">Gender :</div>
      <span class="gender"></span>
      <button class="btn mng gend">Modifier</button>
      </div>
    </section>`;
      document.querySelector(".main").classList.add("sections");
      document.querySelector(".main").classList.remove("main");

      const fName = document.querySelector(".fName");
      const lName = document.querySelector(".lName");
      const email = document.querySelector(".email");
      const gender = document.querySelector(".gender");
      fName.insertAdjacentHTML("beforeend", data._firstName);
      lName.insertAdjacentHTML("beforeend", data._lasName);
      email.insertAdjacentHTML("beforeend", data._email);
      gender.insertAdjacentHTML("beforeend", data.gender);
      const allBtns = document.querySelectorAll(".mng");
      allBtns.forEach((elem) =>
        elem.addEventListener("click", function (e) {
          if (e.target.classList.contains("gend")) {
            e.target.closest("div").children[1].innerHTML = `<label for="Male"
            ><input value="Male" type="radio" name="gen" class="male" />
            Male
          </label>
          <label for="Female"
            ><input value="Female" type="radio" name="gen" class="female" />
            Female
          </label>
          <label for="Other"
            ><input value="Other" type="radio" name="gen" class="Other" />
            Other
          </label>`;
            return;
          }

          e.target.closest(
            "div"
          ).children[1].innerHTML = `<input class="inptFields" type="${
            e.target.closest("div").children[1].dataset.type
          }">`;
        })
      );
    });
}
