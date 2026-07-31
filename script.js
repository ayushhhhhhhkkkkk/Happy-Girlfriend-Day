(function(){
  const scenes = {
    hero: document.getElementById('scene-hero'),
    countdown: document.getElementById('scene-countdown'),
    letter: document.getElementById('scene-letter'),
    coupon: document.getElementById('scene-coupon'),
  };

  function showScene(name){
    Object.values(scenes).forEach(s => s.classList.remove('active'));
    scenes[name].classList.add('active');
  }

  const bgm = document.getElementById('bgm');
  const musicToggle = document.getElementById('musicToggle');

  function playMusic(){
    bgm.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.innerHTML = '<span class="music-dot"></span> playing';
    }).catch(() => {
      // Autoplay might be blocked; user can tap the toggle manually.
    });
  }

  function toggleMusic(){
    if(bgm.paused){
      playMusic();
    } else {
      bgm.pause();
      musicToggle.classList.remove('playing');
      musicToggle.innerHTML = '<span class="music-dot"></span> our song';
    }
  }

  musicToggle.addEventListener('click', toggleMusic);

  // ---- Hero -> Countdown ----
  const openBtn = document.getElementById('openBtn');
  const countdownNum = document.getElementById('countdownNum');

  openBtn.addEventListener('click', () => {
    playMusic(); // user gesture, safe to attempt autoplay here
    showScene('countdown');
    let n = 5;
    countdownNum.textContent = n;
    const interval = setInterval(() => {
      n -= 1;
      if(n <= 0){
        clearInterval(interval);
        showScene('letter');
        return;
      }
      // restart the pulse animation
      countdownNum.style.animation = 'none';
      // force reflow
      void countdownNum.offsetWidth;
      countdownNum.style.animation = null;
      countdownNum.textContent = n;
    }, 1000);
  });

  // ---- Letter -> Coupon ----
  document.getElementById('toCouponBtn').addEventListener('click', () => {
    showScene('coupon');
  });

  // ---- Coupon -> Restart ----
  document.getElementById('restartBtn').addEventListener('click', () => {
    showScene('hero');
  });
})();
