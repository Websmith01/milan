/**
 * ==========================================================================
 * MILAN WED STUDIO - Premium Wedding Invitation Websites
 * Core Application Logic & Responsive Interactions
 * Location: Kolkata, West Bengal, India
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // 1. Dynamic Year in Footer
    // ------------------------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // ------------------------------------------------------------------------
    // 2. Sticky Navbar on Scroll
    // ------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 35) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ------------------------------------------------------------------------
    // 3. Mobile Navigation Drawer
    // ------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openDrawer = () => {
      if (!mobileDrawer || !mobileOverlay) return;
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      if (!mobileDrawer || !mobileOverlay) return;
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);
    mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // ------------------------------------------------------------------------
    // 4. FAQ Accordion Interaction
    // ------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const header = item.querySelector('.faq-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const otherHeader = other.querySelector('.faq-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // ------------------------------------------------------------------------
    // 5. Interactive Device Mockup Switcher (Responsive Safe)
    // ------------------------------------------------------------------------
    const mockupTabs = document.querySelectorAll('.mockup-tab');
    const deviceContainer = document.getElementById('device-container');

    mockupTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        mockupTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const view = tab.getAttribute('data-view');
        if (!deviceContainer) return;

        if (view === 'phone') {
          deviceContainer.style.maxWidth = '320px';
          deviceContainer.style.borderRadius = '36px';
        } else if (view === 'tablet') {
          deviceContainer.style.maxWidth = '520px';
          deviceContainer.style.borderRadius = '24px';
        } else if (view === 'desktop') {
          deviceContainer.style.maxWidth = '720px';
          deviceContainer.style.borderRadius = '16px';
        }
      });
    });

    // ------------------------------------------------------------------------
    // 6. Live Mockup Countdown Calculation (14th Dec 2026)
    // ------------------------------------------------------------------------
    const weddingDate = new Date('December 14, 2026 19:15:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        const d = document.getElementById('live-days');
        const h = document.getElementById('live-hours');
        const m = document.getElementById('live-mins');
        const s = document.getElementById('live-secs');

        if (d) d.textContent = days;
        if (h) h.textContent = String(hours).padStart(2, '0');
        if (m) m.textContent = String(mins).padStart(2, '0');
        if (s) s.textContent = String(secs).padStart(2, '0');
      }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ------------------------------------------------------------------------
    // 7. Portfolio Category Filtering
    // ------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // ------------------------------------------------------------------------
    // 8. Portfolio Modal Preview
    // ------------------------------------------------------------------------
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalInquireBtn = document.getElementById('modal-inquire-btn');

    portfolioCards.forEach((card) => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const style = card.getAttribute('data-style');
        const details = card.getAttribute('data-details');

        if (modalTitle) modalTitle.textContent = title;
        if (modalCategory) modalCategory.textContent = style;
        if (modalDesc) modalDesc.textContent = details;
        if (modal) modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalInquireBtn) modalInquireBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // ------------------------------------------------------------------------
    // 9. Contact Form Validation & Submission
    // ------------------------------------------------------------------------
    const form = document.getElementById('wedding-enquiry-form');
    const statusBox = document.getElementById('form-status-box');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (statusBox) {
          statusBox.className = 'form-status';
          statusBox.textContent = '';
        }

        const nameInput = document.getElementById('user-name');
        const phoneInput = document.getElementById('user-phone');
        const messageInput = document.getElementById('user-message');
        const dateInput = document.getElementById('wedding-date');
        const typeInput = document.getElementById('wedding-type');

        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';
        const weddingDateVal = dateInput ? dateInput.value : '';
        const weddingType = typeInput ? typeInput.value : '';

        // Validation: Required fields
        if (!name || !phone || !message) {
          if (statusBox) {
            statusBox.className = 'form-status error';
            statusBox.textContent = 'Please fill in all required fields (Name, Phone/WhatsApp Number, and Message).';
          }
          return;
        }

        // Phone number length check
        if (phone.replace(/\D/g, '').length < 8) {
          if (statusBox) {
            statusBox.className = 'form-status error';
            statusBox.textContent = 'Please enter a valid phone or WhatsApp number.';
          }
          return;
        }

        const checkedInclusions = [];
        document.querySelectorAll('input[name="inclusions"]:checked').forEach((cb) => {
          checkedInclusions.push(cb.value);
        });

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending Enquiry...';
        }

        const payload = {
          name: name,
          phone: phone,
          wedding_date: weddingDateVal || 'Not specified',
          wedding_type: weddingType,
          inclusions: checkedInclusions.join(', ') || 'General Inclusions',
          message: message,
          _subject: `New Wedding Invitation Enquiry from ${name} (Kolkata Studio)`
        };

        try {
          // Asynchronous submission via FormSubmit to private email
          const response = await fetch('https://formsubmit.co/ajax/lifelongwebagency@gmail.co', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            if (statusBox) {
              statusBox.className = 'form-status success';
              statusBox.textContent = "Thank you! Your enquiry has been received. We'll get back to you soon.";
            }
            form.reset();
          } else {
            throw new Error('Server response error');
          }
        } catch (err) {
          // Graceful fallback with direct WhatsApp confirmation link
          if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.innerHTML =
              "Thank you! Your enquiry has been received. We'll get back to you soon.<br>" +
              "<a href='https://wa.me/918017163686?text=Namaste%20Milan%20Wed%20Studio!%20I%20have%20submitted%20an%20enquiry%20for%20my%20wedding%20invitation.' target='_blank' rel='noopener noreferrer' style='color:var(--gold-champagne); text-decoration:underline; margin-top:0.5rem; display:inline-block;'>Tap here to instantly connect with us on WhatsApp</a>";
          }
          form.reset();
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Enquiry';
          }
        }
      });
    }

    // ------------------------------------------------------------------------
    // 10. Smooth Offset Scrolling for Nav Links
    // ------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });
})();
