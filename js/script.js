// 2.5초 뒤에 scroll-down 애니메이션 시작
setTimeout(function () {
  let circle = document.querySelector(".circle");
  circle.style.visibility = "visible";
}, 2500);

// gnb 숨기기
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    document.querySelector(".hd").classList.add("header-visible");
  } else {
    document.querySelector(".hd").classList.remove("header-visible");
  }

  prevScrollPos = currentScrollPos;
};

// scrollTop의 높이에 따라 fadeOut의 투명도가 1에서 0으로 변하게 만들기
const fadeOut = document.querySelector(".fade-out");
const hd = document.querySelector(".hd");

document.addEventListener("scroll", function () {
  var scrollTop = document.documentElement.scrollTop;
  // console.log(scrollTop);

  fadeOut.style.opacity = 1 - scrollTop / 500;

  if (scrollTop <= 980) {
    hd.style.display = "none";
  } else {
    hd.style.display = "flex";
  }
});
