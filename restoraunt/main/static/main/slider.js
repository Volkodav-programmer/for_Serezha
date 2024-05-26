function ChangeSlide(slides) {
  let currentSlide = 0;

  return function () {
    slides[currentSlide].style.display = "none";

    if (currentSlide == slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    slides[currentSlide].style.display = "block";
  };
}

function StartSlider(changeSlideFunction) {
  return setInterval(changeSlideFunction, 4000);
}

function main() {
  var slides = document.getElementById("slider").children;
  slides[0].style.display = "block";

  var changeSlide = ChangeSlide(slides);
  var timer = StartSlider(changeSlide);

  var slider = document.getElementById("slider");
  slider.addEventListener("mouseover", function () {
    clearInterval(timer);
  });
  slider.addEventListener("mouseout", function () {
    timer = StartSlider(changeSlide);
  });
}

main();
