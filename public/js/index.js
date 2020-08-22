const date = new Date();
const time = date.toTimeString().split(" ")[0].split(":");
time[0] > 12 ? time[0] + ":" + time[1] + "pm" : time[0] + ":" + time[1] + "am";
document.getElementById("get-time").innerHTML =
  time[0] > 12
    ? time[0] + ":" + time[1] + "pm"
    : time[0] + ":" + time[1] + "am";

console.log(time[0] + ":" + time[1]);

const form = document.querySelector(".formik");
const search = document.querySelector(".search");
const temp = document.querySelector(".temperature");
const desc = document.querySelector(".desc");
const city = document.querySelector(".city");
const err = document.querySelector(".err");
const left = document.querySelector(".left");
const latLng = document.querySelector(".lat-lng");

const renderLoader = (parent) => {
  const loader = `
      <div class="loader">
         
      </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

const clearLoader = () => {
  const loader = document.querySelector(`.loader`);
  if (loader) loader.parentElement.removeChild(loader);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  renderLoader(left);
  temp.innerHTML = "";
  city.textContent = "";
  desc.textContent = "";
  latLng.textContent = "";
  const locationApi = "/weather" + "?address=" + search.value;
  console.log(locationApi);

  fetch(locationApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        err.textContent = `<h5>${data.error}</h1>`;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        clearLoader();
        city.innerHTML = `<h5>${data.city}</h1>`;
        temp.innerHTML = `<h1>${data.temp.toFixed(2)} <sup>o</sup>C</h1>`;
        desc.textContent = data.desc.toUpperCase();
        latLng.innerHTML = `<p>Copy and paste to map ${data.lat}, ${data.lon}</p>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
