// 2초 뒤에 scroll-down 애니메이션 시작
setTimeout(function () {
  const circle = document.querySelector(".circle");
  circle.style.visibility = "visible";
}, 2000);

// 2.5초 후에 스크롤&gnb 활성화
setTimeout(function () {
  const hd = document.querySelector(".hd");
  hd.classList.add("header-visible");

  document.body.classList.remove("no-scroll");
}, 2500);

// gotop 버튼
const gotop = document.querySelector(".gotop");

gotop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

// 스크롤 내리면 gnb 나타나고 스크롤 올리면 gnb 숨기기
let prevScrollPos = window.pageYOffset; // 이전 스크롤 위치를 저장
const hd = document.querySelector(".hd");

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    hd.classList.add("header-visible");
  } else {
    hd.classList.remove("header-visible");
  }

  prevScrollPos = currentScrollPos;
};

// scrollTop의 높이에 따라 인트로 투명도가 1에서 0으로 변하게 만들기
const fadeOut = document.querySelector(".fade-out");

document.addEventListener("scroll", function () {
  const scrollTop = document.documentElement.scrollTop;
  // console.log(scrollTop);

  fadeOut.style.opacity = 1 - scrollTop / 500;

  if (scrollTop <= 600) {
    hd.style.display = "none";
  } else {
    hd.style.display = "flex";
  }

  if (scrollTop <= 900) {
    gotop.style.display = "none";
  } else {
    gotop.style.display = "block";
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
        <ul class="stackText">
          ${stackItem}
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
var swiper = new Swiper(".swiper-row", {
  direction: "horizontal",
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    480: {
      direction: "horizontal",
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      direction: "horizontal",
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      direction: "vertical",
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
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
      let images = ``;
      item.images.map((img, i) => {
        let imgHtml = `
        <img src="${img}" alt="이미지${i}"/>`;
        images += imgHtml;
      });
      // console.log(images, "===dd");
      // console.log(item.demo);

      HTML += `      
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
                  ${
                    item.demo
                      ? `<button class="en" onclick="window.open('${item.demo}')">DEMO</button>`
                      : `<button class="en" disabled>DEMO</button>`
                  }
                    <button class="en" onclick="window.open('${
                      item.github
                    }')">GitHub</button>
                  </div>
                </li>
      `;

      $projectTab.innerHTML += HTML;
    });

    // project-tab 기능 구현
    const $projectText = $projectTab.querySelectorAll("li");
    $projectText[0].classList.add("on");
    $slideCon.forEach((slideitem, index) => {
      // console.log(slideitem, index);
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

// 섹션 이동 시 nav 활성화
const sections = document.querySelectorAll(".sec");
const pgLinks = document.querySelectorAll(".gnb > a");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  sections.forEach((section, i) => {
    if (scrollTop >= section.offsetTop) {
      pgLinks.forEach((a) => {
        a.classList.remove("on");
      });
      pgLinks[i].classList.add("on");
    }
  });
});

AOS.init();
