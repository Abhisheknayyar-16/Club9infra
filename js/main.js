/* ==========================================================================
   CLUB 9 INFRA - INTERACTIVE FUNCTIONALITY
   Est. 2007 | Complete Clubhouse & Recreational Infrastructure Partner
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAmenityTabs();
  initProjectFilters();
  initModal();
  initScrollAnimations();
});

/* 1. NAVBAR & MOBILE MENU */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking links
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 2. ONE PARTNER. EVERY AMENITY. (INTERACTIVE TABS DATA & LOGIC) */
const amenityData = {
  gym: {
    category: 'FITNESS & WELLNESS',
    title: 'Complete Residential Gym Infrastructure',
    desc: 'From ergonomic cardio suites to heavy-duty strength racks and functional zone equipment, we design and equip complete fitness environments tailored for modern residential clubhouses.',
    chips: ['Cardio Suites', 'Strength Racks', 'Functional Training', 'Fitness Accessories', 'Rubber Flooring'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85'
  },
  indoor: {
    category: 'INDOOR RECREATION',
    title: 'Multi-Game Indoor Recreation Rooms',
    desc: 'Engaging indoor sports setups built for all age groups. Premium tournament-grade table tennis, slate pool tables, carrom boards, chess tables, and complete games room layout design.',
    chips: ['Table Tennis', 'Billiards & Pool', 'Carrom Sets', 'Chess Stations', 'Indoor Games'],
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=1200&q=85'
  },
  kids: {
    category: 'OUTDOOR PLAY',
    title: "Children's Outdoor Play Equipment",
    desc: "Vibrant, certified outdoor play systems engineered for active safety and high durability. High-density climbers, spiral slides, swing sets, and multi-activity play towers for community parks.",
    chips: ['Multi-Play Systems', 'Safety Slides', 'Swing Arrays', 'Geodesic Climbers', 'Outdoor Activity Equipment'],
    image: 'https://images.unsplash.com/photo-1566454825485-6923f545f111?auto=format&fit=crop&w=1200&q=85'
  },
  sports: {
    category: 'SPORTS INFRASTRUCTURE',
    title: 'Multi-Sport Outdoor Infrastructure',
    desc: 'Professional-grade outdoor pickleball courts, basketball hoops, high-density artificial turf fields, and outdoor fitness stations crafted for residential community sports zones.',
    chips: ['Pickleball Courts', 'Basketball Hoops', 'Synthetic Turf', 'Outdoor Fitness Stations', 'Sports Netting'],
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=1200&q=85'
  },
  poolside: {
    category: 'POOLSIDE & LEISURE',
    title: 'Poolside Benches & Teak Sun Beds',
    desc: 'Luxury wooden sun-bathing beds, weather-resistant lounger seating, poolside benches, and elegant deck furniture that elevate the aesthetic appeal of community leisure decks.',
    chips: ['Wooden Sun Beds', 'Sun Loungers', 'Poolside Benches', 'Deck Seating', 'Outdoor Leisure Furniture'],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85'
  },
  fitness: {
    category: 'OUTDOOR WELLNESS',
    title: 'Outdoor Open-Air Gym Equipment',
    desc: 'Weatherproof outdoor bodyweight training gear, pull-up systems, cross trainers, and stretch stations designed for outdoor fitness trails and garden clearings.',
    chips: ['Calisthenics Racks', 'Outdoor Cross Trainers', 'Bodyweight Stations', 'Stretch Benches'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85'
  },
  leisure: {
    category: 'LEISURE AMENITIES',
    title: 'Clubhouse Deck & Patio Seating',
    desc: 'High-end teak and woven resin outdoor dining and lounge setups for executive clubhouse patios, garden gazebos, and outdoor social gatherings.',
    chips: ['Patio Dining Sets', 'Teak Benches', 'Resort Loungers', 'Garden Seating'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85'
  },
  pool: {
    category: 'FLAGSHIP OFFERING',
    title: 'Swimming Pool & Jacuzzi Installations',
    desc: 'Our flagship aquatic amenity offering. From beautifully designed swimming pools to hydrotherapy jacuzzis, we deliver complete aquatic environments that define the clubhouse experience at any residential development.',
    chips: ['Swimming Pools', 'Jacuzzi & Hydrotherapy', 'Pool Filtration', 'Underwater Lighting', 'Pool Surround & Deck'],
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1200&q=85'
  },
  cinema: {
    category: 'NEW OFFERING — CLUBHOUSE CINEMA',
    title: 'Private Cinema & Entertainment Spaces',
    desc: 'Our newest offering. Transform your clubhouse into a private entertainment destination with theatre-quality recliners, projection systems, acoustic treatment and immersive lighting designed for residential communities.',
    chips: ['Cinema Recliners', 'Projection Screens', 'High-Quality Projectors', 'Acoustic Treatment', 'Theatre Lighting', 'Complete AV Systems'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85'
  }
};

function initAmenityTabs() {
  const tabs = document.querySelectorAll('.amenity-tab-btn');
  const catEl = document.getElementById('amenity-category');
  const titleEl = document.getElementById('amenity-title');
  const descEl = document.getElementById('amenity-desc');
  const chipsEl = document.getElementById('amenity-chips');
  const imgEl = document.getElementById('amenity-img');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-tab');
      const data = amenityData[key];

      if (data) {
        // Fade out
        imgEl.style.opacity = '0.2';
        
        setTimeout(() => {
          catEl.textContent = data.category;
          titleEl.textContent = data.title;
          descEl.textContent = data.desc;
          imgEl.src = data.image;
          imgEl.alt = data.title;

          // Render chips
          chipsEl.innerHTML = data.chips
            .map(chip => `<span class="amenity-chip">${chip}</span>`)
            .join('');

          imgEl.style.opacity = '1';
        }, 200);
      }
    });
  });
}

/* 3. PROJECTS PORTFOLIO FILTER */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* 4. MODAL DIALOG ("DISCUSS YOUR PROJECT") */
function initModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.querySelector('.modal-close-btn');
  const projectForm = document.getElementById('projectForm');

  if (!modalBackdrop) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formBody = projectForm.innerHTML;
      
      projectForm.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 60px; height: 60px; background: rgba(185, 150, 85, 0.15); border: 2px solid #B99655; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: #B99655; font-size: 1.5rem;">
            ✓
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-navy); margin-bottom: 0.75rem;">Project Inquiry Received</h3>
          <p style="color: var(--color-grey-muted); font-size: 1rem; line-height: 1.6; max-width: 440px; margin: 0 auto 2rem auto;">
            Thank you for reaching out to Club 9 Infra. Our senior project planning team will review your requirements and connect with you shortly.
          </p>
          <button type="button" class="btn btn-primary" onclick="location.reload()">Done</button>
        </div>
      `;
    });
  }
}

/* 5. GENTLE SCROLL ANIMATIONS */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableElements = document.querySelectorAll(
    '.solution-card, .why-card, .project-card, .feature-image-box, .heritage-badge-card'
  );

  animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Inject CSS style rule dynamically for animate-in
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleTag);
}
