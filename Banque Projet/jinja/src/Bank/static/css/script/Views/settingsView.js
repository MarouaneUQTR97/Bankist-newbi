export function setting(data) {
  document.querySelector(".dropMenu").addEventListener("click", function (e) {
    console.log("clicked");
    document.querySelector(".dropDown-List").classList.toggle("activeDrop");
  });
}
