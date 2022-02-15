function inViewport(element, proportion) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= proportion * window.innerHeight
  );
}

//build the menu using section information

const navigationList = document.getElementById("nav-list");

//get the number of sections. The number will be used in the following for loop.
const cards = document.getElementsByClassName("card").length;

//This loop was originally inspired by https://mischegoss.github.io/Udacity-Landing-Page/,
// but I have since significantly reduced the code and have used new element properties.

for (let i = 1; i <= cards; i++) {
  //Create a nav list item
  let newLi = document.createElement("li");
  newLi.innerHTML = "Section " + i;
  navigationList.appendChild(newLi);
  let section = document.querySelector("#section" + i);

  document.addEventListener("scroll", function () {
    //show the nav bar for 5 seconds when the user scrolls
    // navigationList.style = "display: block;";
    // setTimeout(function () {
    //   navigationList.style = "display: none";
    // }, 5000);

    //add active styling to the navigation items and sections if the sections
    //are in the viewport
    if (inViewport(section, 0.5)) {
      // newLi.classList.add("active");
      section.classList.add("section-active");
    } else {
      // newLi.classList.remove("active");
      section.classList.remove("section-active");
    }

    if (inViewport(section, 1)) {
      newLi.classList.add("active");
    } else {
      newLi.classList.remove("active");
    }
  });

  //when the user clicks the navigation item, the pages smoothly scrolls down to
  //the start of the associated section
  newLi.addEventListener("click", function () {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

//button takes you to the top of the page when clicked
const topButton = document.getElementById("top-btn");
const header = document.getElementById("header");
topButton.addEventListener("click", function () {
  header.scrollIntoView({ behavior: "smooth", block: "start" });
});

//show the 'scroll to top' button only when the top of the page is not in view
const navBar = document.getElementById("navbar");
let navBarTimer = setTimeout(function () {
  navBar.style.display = "block";
}, 5000);
document.addEventListener("scroll", function () {
  const rect = header.getBoundingClientRect();
  if (rect.top >= 0) {
    topButton.style.display = "none";
    clearTimeout(navBarTimer);
    navBar.style.display = "block";
  } else {
    topButton.style.display = "block";
    navBar.style.display = "block";
    clearTimeout(navBarTimer);

    navBarTimer = setTimeout(function () {
      navBar.style.display = "none";
    }, 2000);
  }
});
