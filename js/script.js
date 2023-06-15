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

// skills 설명 부분 - stack-tab
const $stackTab = document.querySelector(".stack-tab");
const $stackIcon = document.querySelectorAll(".icon-list > li");

let stackData;
fetch("./data/stackData.json")
  .then((response) => response.json())
  .then((data) => {
    stackData = data;
    stackData.forEach((item, i) => {
      let HTML = ``;

      const stackItem = item.content
        .map((content) => `<li>${content}</li>`)
        .join("");

      HTML += `
      <div class="stackTextCon">
                  <h3 class="en">${item.title}</h3>
                  <ul class="stackText">${stackItem}
                  </ul>
                </div>
      `;

      $stackTab.innerHTML += HTML;
    });

    // stack tab 기능 구현
    const $skillText = $stackTab.querySelectorAll("div");
    $skillText[0].classList.add("on");
    $stackIcon.forEach((iconitem, index) => {
      iconitem.addEventListener("click", () => {
        $stackIcon.forEach((icon, i) => {
          icon.classList.remove("on");
          if (index == i) {
            icon.classList.add("on");
          }
        });
        $skillText.forEach((item, textIndex) => {
          item.classList.remove("on");
        });
        $skillText[index].classList.add("on");
      });
    });
  })
  .catch((err) => {
    console.log("error:", err);
  });

// project 영역 슬라이드
var swiper = new Swiper(".swiper-container", {
  direction: "vertical",
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let $slides = document.querySelectorAll(".swiper-slide");
for (let i of $slides) {
  i.addEventListener("mouseover", function () {
    swiper.autoplay.stop();
  });
  i.addEventListener("mouseout", function () {
    swiper.autoplay.start();
  });
}

// project 설명 부분 - project-tab
const $projectTab = document.querySelector(".project-tab");
const $slideCon = document.querySelectorAll(".swiper-slide");

let projectData;
fetch("./data/projectData.json")
  .then((response) => response.json())
  .then((data) => {
    projectData = data;
    projectData.forEach((item, i) => {
      let HTML = ``;

      const images = item.images.map((images) => `<p>${images}</p>`).join("");

      HTML += `
      <ul>
                <li class="project-desc">
                  <div>
                    <p>${item.project}</p>
                    <p>${item.title}</p>
                    <p>${item.tags}</p>
                    <p>${item.duration}</p>
                  </div>
                  <div>
                    <span>- Description -</span>
                    <p>${item.description}</p>
                    <span>- Goal -</span>
                    <p>${item.goal}
                    </p>
                  </div>
                  <div>
                  ${images}
                  </div>
                  <div>
                    <button>DEMO</button>
                    <button>GitHub</button>
                  </div>
                </li>
              </ul>
      `;

      $projectTab.innerHTML += HTML;
    });

    // stack tab 기능 구현
    const $projectText = $projectTab.querySelectorAll("div");
    $projectText[0].classList.add("on");
    $slideCon.forEach((slideitem, index) => {
      slideitem.addEventListener("click", () => {
        $slideCon.forEach((icon, i) => {
          icon.classList.remove("on");
          if (index == i) {
            icon.classList.add("on");
          }
        });
        $projectText.forEach((item, textIndex) => {
          item.classList.remove("on");
        });
        $projectText[index].classList.add("on");
      });
    });
  })
  .catch((err) => {
    console.log("error:", err);
  });
