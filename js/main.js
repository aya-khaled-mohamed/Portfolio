let menu = document.getElementsByClassName("menu-toggle")[0];
let ul = document.getElementsByClassName("nav-links")[0];
menu.addEventListener("click", () => {
  ul.classList.toggle("show-ul");
});

AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

let btn = document.getElementsByClassName("scroller")[0];
const scrollY = window.scrollY || document.documentElement.scrollTop;
function scrolling() {
  if (window.scrollY < 300) {
    btn.style.display = "none";
  } else {
    btn.style.display = "flex";
  }
}

btn.addEventListener("click", () => {
  if (window.scrollY >300) {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
  scrolling();
});

window.addEventListener("DOMContentLoaded", scrolling);
window.addEventListener("scroll", scrolling);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

let form = document.getElementsByTagName("form")[0];
let inputs = document.querySelectorAll(".input");
let check = false;

function PText(element, message, padding) {
  element.nextElementSibling.innerText = message;
  element.nextElementSibling.style.padding = `${padding}px`;
}
function giveBorder(element) {
  element.style.border = "1px solid rgba(16, 185, 129, 0.5)";
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (let i = 0; i < inputs.length; ++i) {
    if (inputs[i].value === "") {
      giveBorder(inputs[i]);
      PText(
        inputs[i],
        `Please Enter Your ${inputs[i].getAttribute("name")}`,
        10
      );
      check = false;
    } else {
      PText(inputs[i], ``, 0);
      check = true;
    }
    if (inputs[i].name === "email" && inputs[i].value !== "") {
      if (!emailValidation.test(inputs[i].value)) {
        giveBorder(inputs[i]);
        PText(inputs[i], `Enter valid email`, 10);
        check = false;
      } else {
        PText(inputs[i], "", 0);
        check = true;
      }
    }
  }

  if (check) {
    let formData = new FormData(form);

    try {
      let response = await fetch("https://formspree.io/f/xeorgpyy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        PText(
          inputs[inputs.length - 1],
          "Your Message was submitted I will response in short time",
          10
        );
        form.reset();

        setTimeout(() => {
          PText(inputs[inputs.length - 1], "", 0);
        }, 2000);
      } else {
        PText(
          inputs[inputs.length - 1],
          "There was a problem, please try again",
          10
        );
      }
    } catch {
      console.error("There was a problem submitting the form.");
    }
  }
});

window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
const toggleBtn = document.getElementById("modeToggle");
const body = document.body;

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove("dark-mode");
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

function toggleTheme() {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

function checkSystemPreference() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme")
  ) {
    body.classList.add("dark-mode");
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  }
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        body.classList.add("dark-mode");
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        body.classList.remove("dark-mode");
        toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  checkSystemPreference();
  toggleBtn.addEventListener("click", toggleTheme);
});

const sendBtn=document.querySelector('.send-btn');

sendBtn.addEventListener('click',()=>{
  sendBtn.classList.add('sent');
  setTimeout(()=>{
    sendBtn.classList.remove('sent');
  },1000)
})

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const minTime = 3500;
  const startTime = Date.now();

  window.addEventListener("load", () => {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(minTime - elapsed, 0);

    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
      }, 900);
    }, delay);
  });
});