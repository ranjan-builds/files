 
    /* ==========================================================================
       SINGLE CONFIG OBJECT — EDIT ALL PERSONAL CONTENT HERE
       ========================================================================== */
    const CONFIG = {
      // EDIT ME: Recipient and sender names
      herName: "Anjali",
      hisName: "Ranjan",
      herCity: "Korba",
      hisCity: "Champa",

      // EDIT ME: Her exact birth moment in local time
      // 28 October 2004 at 00:00:00
      birthDate: {
        year: 2004,
        month: 10, // 10 = October (1-indexed for human readability)
        day: 28,
        hour: 0,
        minute: 0,
        second: 0
      },

      // EDIT ME: The 22nd birthday milestone date
      birthdayYear: 2026,
      birthdayMonth: 10,
      birthdayDay: 28,

      // EDIT ME: The handwritten letter text (line breaks preserved)
      letterText: `Happy Birthday, my girl.

I wish I could be beside you today, see your smile, and give you the biggest hug. But even with all this distance between us, I want you to know that you're someone very special to me.

I hope this new year of your life brings you happiness, peace, good health, and all the little things you've been wishing for.

Thank you for being a part of my life. I wish I could make today beautiful for you in person, but until that day comes, I'm sending you all my love from here.

Enjoy your day, smile a little extra, and remember that somewhere, there's a boy who is really happy that you were born.

Happy Birthday once again.

With love,
Ranjan ❤️`,

      // EDIT ME: 28 compliments — personalize each of these 28 items
    compliments: [
  "Tumhari smile",
  "Tumhari hasi",
  "Tumhara mujhse baat karne ka tareeka",
  "Tumhare cute-cute expressions",
  "Tumhari kindness",
  "Tumhara normal si baaton ko bhi special bana dena",
  "Tumhara mujhe kiss karna",
  "Tumhari pyari si naak",
  "Tumhara sense of humour",
  "Tumhara caring aur thoughtful side",
  "Tumhara courage",
  "Tumhari honesty",
  "Tumhare cute reactions",
  "Tumhara apne din ki har chhoti-badi baat share karna",
  "Tumhari unique personality",
  "Tumhari awaaz",
  "Tumhara mujhe smile karwa dena",
  "Tumhara mor mann",
  "Tumhari aankhon mein laga kajal",
  "Tumhari chhoti-chhoti aadatein",
  "Tumhari dark chocolates",
  "Tumhara beautiful heart",
  "Tumhara mere saath yaadein banana",
  "Tumhara mujhse pyaar karna",
  "Tumhare messages se milne wali khushi",
  "Tumhari cute si imperfections",
  "Tumhara har din aur bhi behtar insaan bante jaana",
  "Bas tumhara tum hona ❤️"
],
      // EDIT ME: Long distance future dream text & next adventure promise
      futureDreamText: "One day, we won't have to say goodbye through screens or count down weeks on a calendar. We'll have lazy Sunday mornings, quiet walks, and a home full of warmth.",
      nextAdventureText: " don't know exactly when or where, but I promise we'll find a little pocket of time that belongs only to us. Maybe a long drive with a playlist, maybe a cozy corner table — something simple, something ours. No pressure, just a gentle promise.",

      // EDIT ME: Photo moments with relative paths (GitHub Pages project safe)
      photos: [
        { src: "images/quite.png", caption: "The quiet moments where simple conversations felt like everything." },
        { src: "images/smile.png", caption: "Every smile of yours that made the distance disappear." },
        { src: "images/sunset.png", caption: "Counting days until we share sunsets without screens between us." },
        { src: "images/laught.png", caption: "Here's to all our favorite laughs, late-night talks, and dreams." }
      ],

      // EDIT ME: Optional gift link (e.g. digital card, playlist, voucher). Leave empty "" if none.
      giftLink: "",

      // EDIT ME: WhatsApp number (placeholder format with country code, no "+" or dashes)
      whatsappNumber: "6266245085",

      // EDIT ME: Optional background music URL (leave empty "" to hide music player button)
      musicSrc: ""
    };


    /* ==========================================================================
       GLOBAL DATE HELPERS & TEST OVERRIDE SUPPORT (?testDate=YYYY-MM-DD)
       ========================================================================== */
    function getNowDate() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const testParam = urlParams.get('testDate');
        if (testParam) {
          // If provided as YYYY-MM-DD or full ISO
          const parsed = new Date(testParam.includes('T') ? testParam : testParam + 'T00:00:00');
          if (!isNaN(parsed.getTime())) {
            return parsed;
          }
        }
      } catch (err) {
        // Fallback to real system date
      }
      return new Date();
    }

    const birthDateObj = new Date(
      CONFIG.birthDate.year,
      CONFIG.birthDate.month - 1,
      CONFIG.birthDate.day,
      CONFIG.birthDate.hour || 0,
      CONFIG.birthDate.minute || 0,
      CONFIG.birthDate.second || 0
    );

    const birthdayMilestone = new Date(
      CONFIG.birthdayYear,
      CONFIG.birthdayMonth - 1,
      CONFIG.birthdayDay,
      0, 0, 0
    );


    /* ==========================================================================
       SECTION 2: CALENDAR-ACCURATE AGE CALCULATOR ENGINE
       ========================================================================== */
    /**
     * Pure function: Calculates calendar-accurate breakdown (years, months, days, hours, mins, secs)
     * Handles leap years and variable month borrowing with high precision.
     */
    function getAgeBreakdown(birth, now) {
      if (now.getTime() < birth.getTime()) {
        return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();
      let hours = now.getHours() - birth.getHours();
      let minutes = now.getMinutes() - birth.getMinutes();
      let seconds = now.getSeconds() - birth.getSeconds();

      // Borrowing chain
      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }

      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }

      if (hours < 0) {
        hours += 24;
        days -= 1;
      }

      if (days < 0) {
        // Add days in previous month relative to `now`
        // Month in Date constructor is 0-indexed; passing 0 as day returns last day of previous month
        const prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDate;
        months -= 1;
      }

      if (months < 0) {
        months += 12;
        years -= 1;
      }

      if (years < 0) {
        return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return { years, months, days, hours, minutes, seconds };
    }

    /**
     * Pure function: Computes cumulative totals from total millisecond delta
     */
    function getAgeTotals(birth, now) {
      const diffMs = Math.max(0, now.getTime() - birth.getTime());
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const remainingDays = totalDays % 7;

      return {
        totalWeeks,
        remainingDays,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds
      };
    }

    const odometerInstances = new Map();

    function setAnimatedNumber(element, value) {
      const numericValue = Number(value);
      if (typeof window.Odometer !== 'function') {
        element.textContent = numericValue.toLocaleString();
        return;
      }

      let odometer = odometerInstances.get(element);
      if (!odometer) {
        const initialValue = Number(element.textContent.replace(/,/g, '')) || 0;
        odometer = new window.Odometer({
          el: element,
          value: initialValue,
          format: '(,ddd)',
          duration: 700,
          theme: 'minimal'
        });
        odometerInstances.set(element, odometer);
      }

      odometer.update(numericValue);
    }

    function updateAgeDisplay() {
      const now = getNowDate();
      const breakdown = getAgeBreakdown(birthDateObj, now);
      const totals = getAgeTotals(birthDateObj, now);

      setAnimatedNumber(document.getElementById('age-years'), breakdown.years);
      setAnimatedNumber(document.getElementById('age-months'), breakdown.months);
      setAnimatedNumber(document.getElementById('age-days'), breakdown.days);
      setAnimatedNumber(document.getElementById('age-hours'), breakdown.hours);
      setAnimatedNumber(document.getElementById('age-mins'), breakdown.minutes);
      setAnimatedNumber(document.getElementById('age-secs'), breakdown.seconds);

      setAnimatedNumber(document.getElementById('total-weeks'), totals.totalWeeks);
      setAnimatedNumber(document.getElementById('rem-days'), totals.remainingDays);
      setAnimatedNumber(document.getElementById('total-days'), totals.totalDays);
      setAnimatedNumber(document.getElementById('total-hours'), totals.totalHours);
      setAnimatedNumber(document.getElementById('total-minutes'), totals.totalMinutes);

      // Check if today matches her 22nd birthday (28 Oct 2026)
      const isBirthdayDay = (
        now.getFullYear() === CONFIG.birthdayYear &&
        now.getMonth() === (CONFIG.birthdayMonth - 1) &&
        now.getDate() === CONFIG.birthdayDay
      );

      const banner = document.getElementById('birthday-banner-22');
      if (isBirthdayDay) {
        banner.style.display = 'block';
      } else {
        banner.style.display = 'none';
      }
    }


    /* ==========================================================================
       SECTION 3: BIRTHDAY COUNTDOWN & CELEBRATION CONTROLLER
       ========================================================================== */
    function updateCountdownAndCelebration() {
      const now = getNowDate();
      const timerView = document.getElementById('countdown-timer-view');
      const cakeView = document.getElementById('cake-celebration-view');
      const pastView = document.getElementById('past-birthday-view');
      const cdDesc = document.getElementById('countdown-desc');

      // Normalize midnight for day comparison
      const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const bdayMidnight = new Date(CONFIG.birthdayYear, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay).getTime();
      const nextDayMidnight = bdayMidnight + (24 * 60 * 60 * 1000);

      if (todayMidnight < bdayMidnight) {
        // STATE 1: BEFORE
        timerView.style.display = 'block';
        cakeView.style.display = 'none';
        pastView.style.display = 'none';
        cdDesc.textContent = "Every passing day brings us closer to celebrating you.";

        const diffMs = Math.max(0, birthdayMilestone.getTime() - now.getTime());
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diffMs / (1000 * 60)) % 60);
        const secs = Math.floor((diffMs / 1000) % 60);

        setAnimatedNumber(document.getElementById('cd-days'), days);
        setAnimatedNumber(document.getElementById('cd-hours'), hours);
        setAnimatedNumber(document.getElementById('cd-mins'), mins);
        setAnimatedNumber(document.getElementById('cd-secs'), secs);

      } else if (todayMidnight === bdayMidnight) {
        // STATE 2: ON THE BIRTHDAY
        timerView.style.display = 'none';
        cakeView.style.display = 'block';
        pastView.style.display = 'none';
        cdDesc.textContent = "Today is your day, full of smiles and heartfelt wishes.";

      } else {
        // STATE 3: AFTER THE BIRTHDAY
        timerView.style.display = 'none';
        cakeView.style.display = 'none';
        pastView.style.display = 'block';
        cdDesc.textContent = "Another wonderful year of your journey has begun.";
      }
    }


    /* ==========================================================================
       INTERACTIVE BLOW OUT CANDLES & CAKE
       ========================================================================== */
    const cakeElement = document.getElementById('cake-element');
    const blowBtn = document.getElementById('btn-blow-candles');
    const wishStatus = document.getElementById('wish-status-text');
    let candlesBlown = false;

    if (blowBtn) {
      blowBtn.addEventListener('click', function() {
        if (!candlesBlown) {
          candlesBlown = true;
          cakeElement.classList.add('blown');
          wishStatus.textContent = "Wish made! May every dream come true for you ✨";
          blowBtn.textContent = "Wish Made ❤️";
          blowBtn.disabled = true;
          triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 60);
        }
      });
    }

    const replayCandlesBtn = document.getElementById('btn-replay-candles');
    if (replayCandlesBtn) {
      replayCandlesBtn.addEventListener('click', function() {
        document.getElementById('past-birthday-view').style.display = 'none';
        document.getElementById('cake-celebration-view').style.display = 'block';
        cakeElement.classList.remove('blown');
        candlesBlown = false;
        wishStatus.textContent = "Your birthday wishes are waiting ✨";
        blowBtn.textContent = "Blow out the candles 💨";
        blowBtn.disabled = false;
      });
    }


    /* ==========================================================================
       SECTION 4: BIRTHDAY LETTER INTERACTION (ENVELOPE)
       ========================================================================== */
    const envelopeClosed = document.getElementById('envelope-closed');
    const letterCard = document.getElementById('letter-card');
    const letterContent = document.getElementById('letter-content-target');

    letterContent.textContent = CONFIG.letterText;

    function openEnvelope() {
      envelopeClosed.style.display = 'none';
      letterCard.classList.add('is-open');
      letterCard.setAttribute('aria-hidden', 'false');
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.5, 35);
    }

    if (envelopeClosed) {
      envelopeClosed.addEventListener('click', openEnvelope);
      envelopeClosed.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEnvelope();
        }
      });
    }


    /* ==========================================================================
       SECTION 5: LOVE METER SIMULATION
       ========================================================================== */
    const loveSimulationButton = document.getElementById('btn-love-simulation');
    const loveCounter = document.getElementById('love-counter');
    const loveProgressFill = document.getElementById('love-progress-fill');
    const loveProgressTrack = document.getElementById('love-progress-track');
    const loveSimulationStatus = document.getElementById('love-simulation-status');
    const loveSimulationDuration = 5200;
    let loveSimulationFrame = null;

    if (loveSimulationButton) {
      loveSimulationButton.addEventListener('click', () => {
        if (loveSimulationFrame !== null) {
          return;
        }

        const stages = [
          'Gathering every little moment...',
          'Adding every laugh and lovely message...',
          'Checking for a number big enough...'
        ];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let lastStage = -1;

        loveSimulationButton.disabled = true;
        loveSimulationButton.innerHTML = '<span>Measuring...</span><span aria-hidden="true">💗</span>';
        loveCounter.textContent = '0';
        loveProgressFill.style.width = '0%';
        loveProgressTrack.setAttribute('aria-valuenow', '0');
        loveSimulationStatus.textContent = 'Starting the love simulation...';

        function finishLoveSimulation() {
          loveCounter.textContent = '∞';
          loveProgressFill.style.width = '100%';
          loveProgressTrack.setAttribute('aria-valuenow', '100');
          loveSimulationStatus.textContent =
            `Result: ${CONFIG.herName} is loved beyond every number. Some feelings are simply infinite. ❤️`;
          loveSimulationButton.disabled = false;
          loveSimulationButton.innerHTML = '<span>Run the simulation again</span><span aria-hidden="true">❤️</span>';
          loveSimulationFrame = null;
        }

        if (reducedMotion) {
          finishLoveSimulation();
          return;
        }

        let startedAt;
        function animateLoveSimulation(timestamp) {
          if (startedAt === undefined) {
            startedAt = timestamp;
          }

          const progress = Math.min((timestamp - startedAt) / loveSimulationDuration, 1);
          const easedProgress = progress * progress;
          const loveUnits = Math.floor(easedProgress * 999999);
          const stageIndex = Math.min(Math.floor(progress * stages.length), stages.length - 1);

          loveCounter.textContent = new Intl.NumberFormat().format(loveUnits);
          loveProgressFill.style.width = `${progress * 100}%`;
          loveProgressTrack.setAttribute('aria-valuenow', String(Math.round(progress * 100)));

          if (stageIndex !== lastStage) {
            loveSimulationStatus.textContent = stages[stageIndex];
            lastStage = stageIndex;
          }

          if (progress < 1) {
            loveSimulationFrame = window.requestAnimationFrame(animateLoveSimulation);
          } else {
            finishLoveSimulation();
          }
        }

        loveSimulationFrame = window.requestAnimationFrame(animateLoveSimulation);
      });
    }


    /* ==========================================================================
       SECTION 6: 28 LITTLE THINGS (COMPLIMENTS)
       ========================================================================== */
    const complimentsContainer = document.getElementById('compliments-container');
    const revealedCountSpan = document.getElementById('revealed-count');
    const progressBar = document.getElementById('progress-bar');
    const bonusBanner = document.getElementById('bonus-unlocked-banner');
    const revealedIndices = new Set();

    function renderCompliments() {
      complimentsContainer.innerHTML = '';
      CONFIG.compliments.forEach((text, idx) => {
        const tile = document.createElement('button');
        tile.className = 'compliment-card';
        tile.type = 'button';
        tile.setAttribute('aria-label', `Reveal reason ${idx + 1}`);
        tile.setAttribute('aria-pressed', 'false');

        tile.innerHTML = `
          <span class="compliment-card-inner">
            <span class="compliment-face compliment-face-front">
              <span class="card-badge">${idx + 1}</span>
              <span class="card-content-hidden">Tap to open <span aria-hidden="true">💌</span></span>
            </span>
            <span class="compliment-face compliment-face-back">
              <span class="card-badge" aria-hidden="true">♥</span>
              <span class="card-content-revealed">${escapeHTML(text)}</span>
            </span>
          </span>
        `;

        function reveal() {
          if (!tile.classList.contains('is-revealed')) {
            tile.classList.add('is-revealed');
            tile.setAttribute('aria-pressed', 'true');
            tile.setAttribute('aria-label', `Reason ${idx + 1}: ${text}`);
            revealedIndices.add(idx);
            updateComplimentProgress();
          }
        }

        tile.addEventListener('click', reveal);

        complimentsContainer.appendChild(tile);
      });
    }

    function updateComplimentProgress() {
      const count = revealedIndices.size;
      setAnimatedNumber(revealedCountSpan, count);
      const pct = (count / CONFIG.compliments.length) * 100;
      progressBar.style.width = pct + '%';
      const progressTrack = progressBar.parentElement;
      progressTrack.setAttribute('aria-valuemax', CONFIG.compliments.length);
      progressTrack.setAttribute('aria-valuenow', count);

      if (count === CONFIG.compliments.length) {
        bonusBanner.style.display = 'block';
        triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.6, 70);
      }
    }


    /* ==========================================================================
       SECTION 7: NEXT ADVENTURE REVEAL
       ========================================================================== */
    document.getElementById('future-dream-text').textContent = CONFIG.futureDreamText;
    const nextAdvTextEl = document.getElementById('next-adventure-text');
    nextAdvTextEl.textContent = CONFIG.nextAdventureText;

    const btnNextAdventure = document.getElementById('btn-next-adventure');
    const adventureBox = document.getElementById('adventure-reveal-box');

    if (btnNextAdventure) {
      btnNextAdventure.addEventListener('click', function() {
        adventureBox.style.display = 'block';
        btnNextAdventure.style.display = 'none';
      });
    }


    /* ==========================================================================
       SECTION 8: POLAROID GALLERY & ACCESSIBLE LIGHTBOX
       ========================================================================== */
    const polaroidsWrap = document.getElementById('polaroids-wrap');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxCaption = document.getElementById('lightbox-caption-text');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxPrev = document.getElementById('lightbox-prev-btn');
    const lightboxNext = document.getElementById('lightbox-next-btn');

    let currentPhotoIndex = 0;

    /**
     * Elegant SVG fallback for missing photo assets (safe for any hosting environment)
     */
    function getFallbackSvg(index) {
      const colors = ['#C76D81', '#591C2B', '#E5A9B4', '#D4AF37'];
      const color = colors[index % colors.length];
      return `
        <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFF5F7">
          <circle cx="200" cy="180" r="70" fill="${color}" opacity="0.12"/>
          <path d="M 200 145 C 190 130, 160 130, 160 160 C 160 190, 200 220, 200 220 C 200 220, 240 190, 240 160 C 240 130, 210 130, 200 145 Z" fill="${color}"/>
          <text x="200" y="270" text-anchor="middle" font-family="'Playfair Display', serif" font-size="16" fill="#591C2B" font-style="italic">Memory Snapshot</text>
          <text x="200" y="295" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#7A5B64">A little memory of us</text>
        </svg>
      `;
    }

    function renderGallery() {
      polaroidsWrap.innerHTML = '';
      CONFIG.photos.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'polaroid-item';
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View photograph: ${photo.caption}`);

        item.innerHTML = `
          <div class="polaroid-pin" aria-hidden="true"></div>
          <div class="polaroid-img-wrapper" id="img-wrap-${idx}">
            <img src="${photo.src}" alt="${escapeHTML(photo.caption)}" class="polaroid-img" loading="lazy">
          </div>
          <p class="polaroid-caption">${escapeHTML(photo.caption)}</p>
        `;

        const imgEl = item.querySelector('img');
        imgEl.addEventListener('error', function() {
          const wrap = document.getElementById(`img-wrap-${idx}`);
          if (wrap) {
            wrap.innerHTML = getFallbackSvg(idx);
          }
        });

        item.addEventListener('click', () => openLightbox(idx));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(idx);
          }
        });

        polaroidsWrap.appendChild(item);
      });
    }

    function openLightbox(idx) {
      currentPhotoIndex = idx;
      updateLightboxContent();
      lightbox.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      const photo = CONFIG.photos[currentPhotoIndex];
      lightboxCaption.textContent = photo.caption;

      const testImg = new Image();
      testImg.src = photo.src;
      testImg.onload = function() {
        lightboxImgContainer.innerHTML = `<img src="${photo.src}" alt="${escapeHTML(photo.caption)}" class="lightbox-img">`;
      };
      testImg.onerror = function() {
        lightboxImgContainer.innerHTML = `<div style="width:280px; height:280px;">${getFallbackSvg(currentPhotoIndex)}</div>`;
      };
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => {
      currentPhotoIndex = (currentPhotoIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
      updateLightboxContent();
    });
    lightboxNext.addEventListener('click', () => {
      currentPhotoIndex = (currentPhotoIndex + 1) % CONFIG.photos.length;
      updateLightboxContent();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    });


    /* ==========================================================================
       SECTION 9: GIFT BOX SURPRISE
       ========================================================================== */
    const giftBox = document.getElementById('gift-box-element');
    const giftMessage = document.getElementById('gift-message-box');
    const externalGiftWrap = document.getElementById('external-gift-wrap');
    const externalGiftLink = document.getElementById('external-gift-link');
    let giftOpened = false;

    if (CONFIG.giftLink && CONFIG.giftLink.trim() !== '') {
      externalGiftWrap.style.display = 'block';
      externalGiftLink.href = CONFIG.giftLink;
    }

    function openGiftBox() {
      if (!giftOpened) {
        giftOpened = true;
        giftBox.classList.add('is-open');
        giftMessage.style.display = 'block';
        triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.5, 65);
      }
    }

    if (giftBox) {
      giftBox.addEventListener('click', openGiftBox);
      giftBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGiftBox();
        }
      });
    }


    /* ==========================================================================
       SECTION 10: WHATSAPP HUG & REPLAY
       ========================================================================== */
    const btnWhatsapp = document.getElementById('btn-whatsapp-hug');
    const btnReplay = document.getElementById('btn-replay-all');
    const toast = document.getElementById('toast-message');

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('is-visible');
      setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 4000);
    }

    if (btnWhatsapp) {
      btnWhatsapp.addEventListener('click', function() {
        const rawNum = CONFIG.whatsappNumber || "";
        const isPlaceholder = rawNum.includes('X') || rawNum.length < 8 || rawNum === "91XXXXXXXXXX";

        if (isPlaceholder) {
          showToast(`Ranjan hasn't added his phone number yet! Send him a message directly on WhatsApp ❤️`);
        } else {
          const text = encodeURIComponent(`Happy Birthday to me! Thank you for the sweet surprise website, ${CONFIG.hisName}. Sending you the biggest hug! ❤️`);
          const url = `https://wa.me/${rawNum}?text=${text}`;
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
    }

    if (btnReplay) {
      btnReplay.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Soft reset
        showToast("Starting the journey from the beginning... ❤️");
      });
    }

    // Landing screen button smooth scroll
    const btnOpenSurprise = document.getElementById('btn-open-surprise');
    if (btnOpenSurprise) {
      btnOpenSurprise.addEventListener('click', function() {
        triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.4, 45);
        const ageSection = document.getElementById('age-story');
        if (ageSection) {
          ageSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }


    /* ==========================================================================
       BACKGROUND AMBIENT CANVAS (HEARTS & TWINKLES)
       ========================================================================== */
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId = null;
    let isCanvasActive = true;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor(isBurst = false, burstX = 0, burstY = 0) {
        this.reset(isBurst, burstX, burstY);
      }

      reset(isBurst = false, burstX = 0, burstY = 0) {
        this.isBurst = isBurst;
        this.type = Math.random() > 0.4 ? 'heart' : 'star';
        this.x = isBurst ? burstX : Math.random() * canvas.width;
        this.y = isBurst ? burstY : Math.random() * canvas.height;
        this.size = isBurst ? (Math.random() * 8 + 6) : (Math.random() * 6 + 3);
        
        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed - 1.5;
          this.alpha = 1;
          this.decay = Math.random() * 0.015 + 0.01;
        } else {
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = -(Math.random() * 0.6 + 0.2); // Gentle upward float
          this.alpha = Math.random() * 0.5 + 0.2;
          this.decay = 0;
        }

        const hues = ['#E5A9B4', '#C76D81', '#FCECEF', '#D4AF37'];
        this.color = hues[Math.floor(Math.random() * hues.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.isBurst) {
          this.vy += 0.1; // gravity
          this.alpha -= this.decay;
        } else {
          if (this.y < -20) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
          }
        }
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);

        if (this.type === 'heart') {
          const s = this.size / 10;
          ctx.beginPath();
          ctx.moveTo(0, -3 * s);
          ctx.bezierCurveTo(-5 * s, -10 * s, -12 * s, -2 * s, 0, 8 * s);
          ctx.bezierCurveTo(12 * s, -2 * s, 5 * s, -10 * s, 0, -3 * s);
          ctx.fill();
        } else {
          // Soft glowing star
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Determine particle count (fewer on mobile for 60fps)
    const particleCount = window.innerWidth < 640 ? 22 : 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(false));
    }

    function triggerConfettiBurst(x, y, count = 40) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(true, x, y));
      }
    }

    function animateParticles() {
      if (!isCanvasActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if (p.isBurst && p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Pause canvas when page hidden to preserve battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isCanvasActive = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isCanvasActive = true;
        animateParticles();
      }
    });

    animateParticles();


    /* ==========================================================================
       OPTIONAL BACKGROUND MUSIC CONTROLLER
       ========================================================================== */
    const musicWrap = document.getElementById('music-player-wrap');
    const musicStatusText = document.getElementById('music-status-text');
    let audioInstance = null;
    let isPlaying = false;

    if (CONFIG.musicSrc && CONFIG.musicSrc.trim() !== '') {
      musicWrap.style.display = 'flex';
      audioInstance = new Audio(CONFIG.musicSrc);
      audioInstance.loop = true;

      musicWrap.addEventListener('click', toggleAudio);
      musicWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAudio();
        }
      });
    }

    function toggleAudio() {
      if (!audioInstance) return;
      if (isPlaying) {
        audioInstance.pause();
        isPlaying = false;
        musicWrap.classList.remove('is-playing');
        musicStatusText.textContent = 'Play music';
      } else {
        audioInstance.play().then(() => {
          isPlaying = true;
          musicWrap.classList.add('is-playing');
          musicStatusText.textContent = 'Playing';
        }).catch(() => {
          showToast("Tap again to allow music playback");
        });
      }
    }


    /* ==========================================================================
       UTILITY: HTML ESCAPING
       ========================================================================== */
    function escapeHTML(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }


    /* ==========================================================================
       DOM CONTENT INITIALIZATION
       ========================================================================== */
    window.addEventListener('DOMContentLoaded', () => {
      // Dynamic names
      document.getElementById('hero-name-target').textContent = CONFIG.herName;
      document.getElementById('hero-hisname-target').textContent = CONFIG.hisName;
      document.getElementById('final-hisname').textContent = CONFIG.hisName;
      document.querySelectorAll('.her-name-span').forEach(el => el.textContent = CONFIG.herName);
      document.getElementById('postcard-his-name').textContent = CONFIG.hisName;
      document.getElementById('postcard-her-name').textContent = CONFIG.herName;
      document.getElementById('story-her-name').textContent = CONFIG.herName;
      document.getElementById('postcard-his-city').textContent = CONFIG.hisCity;
      document.getElementById('postcard-her-city').textContent = CONFIG.herCity;
      document.getElementById('story-his-city').textContent = CONFIG.hisCity;
      document.getElementById('story-her-city').textContent = CONFIG.herCity;
      document.getElementById('compliment-total').textContent = CONFIG.compliments.length;
      document.querySelector('.progress-track').setAttribute('aria-valuemax', CONFIG.compliments.length);

      // Render sections
      renderCompliments();
      renderGallery();

      // Initial computations
      updateAgeDisplay();
      updateCountdownAndCelebration();

      // Live tick every second
      setInterval(() => {
        updateAgeDisplay();
        updateCountdownAndCelebration();
      }, 1000);
    });
