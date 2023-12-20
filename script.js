function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    multiplier: 0.5,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();
const t1 = gsap.timeline();

t1.from(
  "nav",
  1,
  {
    opacity: 0,
  },
  0
);

t1.from(
  ".page1-elem>h1",
  1,
  {
    y: 200,
    opacity: 0,
    duration: 1,
  },
  0
);

t1.from(
  ".page2-elem1",
  1,
  {
    y: 190,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2-elem1",
      start: "top 40%", // Adjust this value based on your layout
      end: "top 10%",
      //   pin: true,
      scrub: 1,
      //   markers: true,
    },
  },
  0
);

t1.from(
  ".page2-elem2",
  1,
  {
    x: 190,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2-elem1",
      start: "top 50%", // Adjust this value based on your layout
      end: "top 10%",
      //   pin: true,
      scrub: 1,
      //   markers: true,
    },
  },
  0
);

t1.from(
  ".page2-elem4",
  1,
  {
    x: -190,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2-elem1",
      start: "top 50%", // Adjust this value based on your layout
      end: "top 10%",
      //   pin: true,
      scrub: 1,
      //   markers: true,
    },
  },
  0
);

t1.from(
  ".page2-elem5,.page2-elem6",
  1,
  {
    y: -190,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2-elem1",
      start: "top 50%", // Adjust this value based on your layout
      end: "top 10%",
      //   pin: true,
      scrub: 1,
      //   markers: true,
    },
  },
  0
);

t1.to(
  ".page2-elem3",

  {
    height: "100vh",
    width: "100vw",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".page2",
      start: "top 0%", // Adjust this value based on your layout
      end: "top -100%",
      pin: true,
      scrub: 1,
      // markers: true,
    },
  }
);
