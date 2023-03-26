window.addEventListener("scroll", () => {
  
  var reveals = document.querySelectorAll(".reveal");
  var navbar = document.getElementById("header");
  var sticky = navbar.offsetTop;

  //reveal items effect by adding a class on scroll
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 150;
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("show");
    } else {
      reveals[i].classList.remove("show");
    }
  }

  //make a sticky navbar by adding a class on scroll
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});


