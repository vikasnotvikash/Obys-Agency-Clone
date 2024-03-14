function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 28);
    },
  });
  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2.8,
  });
  tl.from("#page1", {
    delay: 0.2,
    y: 1600,
    duration: 0.6,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0
  })
  tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
    y: 140,
    stagger: 0.2
  })
  tl.from("#hero1 , #page2", {
    opacity: 0
  }, "-=1.2")
}
function cursorAnimation() {
  // document.addEventListener("mousemove", function (dets) {
  //   gsap.to("#crsr", {
  //     left: dets.x,
  //     top: dets.y,
  //   });
  // });
  Shery.mouseFollower({
    skew: true,
    ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
    duration: 1
  });

  Shery.makeMagnet("#nav-part2 h4");

  var video = document.querySelector('#video-container video');
  document.querySelector('#video-container').addEventListener('mouseenter', function () {
    this.addEventListener('mousemove', function (e) {
      gsap.to('.mousefollower', {
        opacity: 0
      })
      gsap.to('#video-cursor', {
        left: e.x - 570,
        top: e.y - 300
      })
    })
  })
  document.querySelector('#video-container').addEventListener('mouseleave', function () {
    gsap.to('.mousefollower', {
      opacity: 1
    })
    gsap.to('#video-cursor', {
      top: '-15%',
      left: '75%'
    })
  })
  var flag = 0
  video.addEventListener('click', function () {
    if (flag == 0) {
      video.play()
      video.style.opacity = 1
      document.querySelector('#video-cursor').innerHTML = `<i class="ri-pause-mini-fill"></i>`
      gsap.to('#video-cursor', {
        scale: 0.5
      })
      flag = 1
    }
    else {
      video.pause()
      video.style.opacity = 0
      document.querySelector('#video-cursor').innerHTML = ` <i class="ri-play-mini-fill"></i>`
      gsap.to('#video-cursor', {
        scale: 1
      })
      flag = 0
    }
  })
}
function dateset() {
  const date = document.getElementById('date');
  date.innerHTML = new Date().getFullYear();
}
function sheryanimation() {
  Shery.imageEffect('.image-div', {
    style: 5,
    gooey: true,
    config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7241195453907675 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.23, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.5, "range": [0, 10] }, "metaball": { "value": 0.33, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0.01, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } }
  })
}
function flag() {
  document.addEventListener('mousemove', function (e) {
    gsap.to('#flag', {
      x: e.x,
      y: e.y
    })
  })

  document.querySelector('#hero3').addEventListener('mouseenter', function () {
    gsap.to('#flag', {
      opacity: 1
    })
  })

  document.querySelector('#hero3').addEventListener('mouseleave', function () {
    gsap.to('#flag', {
      opacity: 0
    })
  })
}
function footer_Animation() {
  var adddd = "";
  document.querySelector('#footer h1').textContent.split("").forEach(function (e) {
    adddd += `<span>${e}</span>`;
  })
  document.querySelector('#footer h1').innerHTML = adddd;


  document.querySelector('.footer-text').addEventListener('mouseenter', function () {
    gsap.to('#footer h1 span', {
      opacity: 0,
      stagger: 0.05,
    })
  })

  document.querySelector('.footer-text').addEventListener('mouseleave', function () {
    gsap.to('#footer h1 span', {
      opacity: 1,
      stagger: 0.20,
      delay: 0.35
    })
  })
}


flag()
loadingAnimation()
cursorAnimation()
locomotive()
sheryanimation()
dateset()
footer_Animation()


// textAnimation()
// {
//   document.querySelector('#footer h1').addEventListener('mousemove', function () {
//     gsap.from('#footer h1', {
//       opacity: 0,
//       delay: 0.5,
//       duration: 1,
//       x: 50,
//       onStart: function () {
//         $('#footer h1').textillate({ in: { effect: 'rollIn' } });
//       }
//     })
//   })
// }
// textAnimation()


