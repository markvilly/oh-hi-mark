const words = ["Mark.", "a designer.", "a developer.", "a boyfriend."];

const words2 = ["designer,", "developer,", "creative,", "problem-solver,"];

// ANIMATED TEXT EFFECT START HERE.

gsap.registerPlugin(TextPlugin, ScrollTrigger);

let cursor = gsap.to(".cursor", {
  opacity: 0,
  ease: "bounce.inOut",
  repeat: -1,
});

let boxTl = gsap.timeline();

boxTl
  .to(".box", {
    duration: 1,
    width: "18vw",
    delay: 0.5,
    ease: "Power4.inOut",
  })
  .from(".hi", {
    duration: 1,
    y: "7vw",
    ease: "power3.out",
    onComplete: () => masterTl.play(),
  })
  .to(".box", {
    duration: 1,
    height: "7vw",
    ease: "elastic.out",
  })
  .to(".box", {
    duration: 2,
    autoAlpha: 0.5,
    yoyo: true,
    repeat: -1,
    ease: "rough({template: none.out, strength: 1, points: 20, taper:'none', randomize: true, clamp: false})",
  });

let masterTl = gsap.timeline({ repeat: -1 }).pause();
let animatedTextTl = gsap.timeline({ repeat: -1 }).play();

// Separate timelines for "text" and "animated-text" classes
words.forEach((word) => {
  let tl = gsap.timeline({ delay: 1, repeat: 1, yoyo: true, repeatDelay: 1 });
  tl.to(".text", { duration: 1, text: word });
  masterTl.add(tl);
});

words2.forEach((word) => {
  let tl = gsap.timeline({ delay: 1, repeat: 1, yoyo: true, repeatDelay: 1.2 });
  tl.to(".animated-text", { duration: 1, text: word });
  animatedTextTl.add(tl);
});

// gsap.registerPlugin(ScrollTrigger);

// THE MARQUEE EFFECT

let currentScroll = 0;
let isScrollingDown = true;
let isNotScrolling = true;

let tween = gsap
  .to(".marquee-part", {
    xPercent: -270,
    repeat: -1,
    duration: 20,
    ease: "linear",
  })
  .totalProgress(0.5);

gsap.set(".marquee-inner", { xPercent: -50 });

window.addEventListener("scroll", function () {
  if (this.window.pageYOffset > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  currentScroll = this.window.pageYOffset;
});
