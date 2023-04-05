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

//make a magnify effect that shows a zoom part of an image
window.addEventListener("load", magnify);

function magnify() {
  var img, glass, w, h, bw;
  var zoom = 3;
  img = document.getElementById("image");
  //create magnifier glass
  glass = document.createElement("div");
  glass.setAttribute("class", "img-magnifier-glass");
  //insert magnifier glass
  img.parentElement.insertBefore(glass, img);
  //set background properties for the magnifier glass
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize =
    img.width * zoom + "px " + img.height * zoom + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  //execute a function when someone moves the magnifier glass over the image
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    //prevent any other actions that may occur when moving over the image
    e.preventDefault();
    //get the cursor's x and y positions
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    //prevent the magnifier glass from being positioned outside the image
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    //set the position of the magnifier glass
    glass.style.left = x - w + "px";
    glass.style.top = y - h + "px";
    //display what the magnifier glass shows
    glass.style.backgroundPosition =
      "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    //get the x and y positions of the image
    a = img.getBoundingClientRect();
    //calculate the cursor's x and y coordinates, relative to the image
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    //consider any page scrolling
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
};

//craate a draggable slider from scratch
//get the elements from the class name
const slider = document.querySelector(".slider");
const sliderInner = document.querySelector(".slider-inner");

// keep track of user's mouse down and up
let isPressedDown = false;
//x horizontal space of cursor from inner container
let cursorXSpace;

// grabbing mouse events
slider.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  cursorXSpace = e.offsetX - sliderInner.offsetLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
});

slider.addEventListener("mousemove", (e) => {
  //if mouse is pressed down don't continue
  if (!isPressedDown) return;
  //only dragging along the slider
  e.preventDefault();
  //get the coordinates relative to the parent slider div (left-hand)
  sliderInner.style.left = `${e.offsetX - cursorXSpace}px`;
  checkBound();
});

//check boundaries for non infinite continue scrolling
function checkBound() {
  //coordinates from the elements relative to the viewport
  const sliderRect = slider.getBoundingClientRect();
  const innerRect = sliderInner.getBoundingClientRect();

  //stop at scrolling at 0px (left side)
  if (parseInt(sliderInner.style.left) > 0) {
    sliderInner.style.left = '0px';
  //for right side
  } else if (innerRect.right < sliderRect.right) {
    sliderInner.style.left = `-${innerRect.width - sliderRect.width}px`;
  }
};

//Create Toggleable Tabs

function openCategory(evt, category) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(category).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" show as active tabcontent
document.getElementById("defaultOpen").click();
