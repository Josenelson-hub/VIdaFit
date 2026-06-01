/* ========================= */
/* HERO */
/* ========================= */

window.addEventListener('load', () => {

  document
    .querySelector('.hero-left')
    .classList
    .add('hero-loaded');

});

/* ========================= */
/* CTA */
/* ========================= */

document
  .querySelector('.primary-btn')
  ?.addEventListener('click', () => {

    console.log(
      'Ir para onboarding'
    );

  });

/* ========================= */
/* HEADER */
/* ========================= */

const header =
  document.getElementById('header');

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {

    header.classList.add('scrolled');

  } else {

    header.classList.remove('scrolled');

  }

});

/* ========================= */
/* REVEAL */
/* ========================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target
            .classList
            .add('active');

        }

      });

    },
    {
      threshold: .15
    }
  );

document
  .querySelectorAll('.reveal')
  .forEach(element => {

    observer.observe(element);

  });

/* ========================= */
/* FAQ */
/* ========================= */

document
  .querySelectorAll('.faq-item')
  .forEach(item => {

    item.addEventListener(
      'click',
      () => {

        item.classList.toggle(
          'open'
        );

      }
    );

  });

/* ========================= */
/* DASHBOARD */
/* ========================= */

const calories =
  document.querySelector(
    '.metric strong'
  );

if (calories) {

  setInterval(() => {

    const value =
      Math.floor(
        Math.random() * 300
      ) + 2350;

    calories.textContent =
      `${value} kcal`;

  }, 3000);

}

/* ========================= */
/* TILT GOALS */
/* ========================= */

document
  .querySelectorAll(
    '.goals-grid article'
  )
  .forEach(card => {

    card.addEventListener(
      'mousemove',
      e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const rotateY =
          (x / rect.width - .5) * 12;

        const rotateX =
          (y / rect.height - .5) * -12;

        card.style.transform =
          `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          `;
      }
    );

    card.addEventListener(
      'mouseleave',
      () => {

        card.style.transform =
          'perspective(1000px) rotateX(0) rotateY(0)';

      }
    );

  });

/* ========================= */
/* STEP CARDS STAGGER */
/* ========================= */

const steps =
  document.querySelectorAll(
    '.step-card'
  );

steps.forEach((card, index) => {

  card.style.transitionDelay =
    `${index * 120}ms`;

});
document
  .querySelector('.primary-btn')
  .addEventListener('click', () => {

    document
      .querySelector('#cta')
      .scrollIntoView({
        behavior: 'smooth'
      });

  });