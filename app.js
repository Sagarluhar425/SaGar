/**
 * Rachel Blue — Portfolio Interactive Script
 * Plain Vanilla JavaScript (ES5/ES6 browser DOM, zero frameworks or libraries)
 */

(function () {
  'use strict';

  var PROJECT_DETAILS = {
    'project-1': {
      kicker: '01 · Dr. John Griffin’s Lab · 2021–Present',
      title: 'Conserved Regulators of Stem Cell Differentiation & Meiotic Entry',
      summary:
        'Investigated conserved genetic regulators governing stem cell differentiation and meiotic entry to generate foundational insight into cancer biology and human reproductive assistance.',
      methods: [
        'Executed nucleic acid purification, quantification, and quality-control workflows for downstream next-generation sequencing (NGS) and DNA/RNA assays.',
        'Applied statistical modeling to establish 95% confidence limits across experimental datasets.',
        'Standardized bench protocols and maintained laboratory records at a 100% accuracy benchmark.'
      ],
      tools: 'NGS · PCR · DNA/RNA Assays · GraphPad Prism · Python · Galaxy · UCSC Genome Browser',
      outcome:
        'Delivered repeatable assay pipelines and high-confidence regulator validation supporting ongoing reproductive and oncology studies.'
    },
    'project-2': {
      kicker: '02 · St. John’s Research Facility · 2014–2021',
      title: 'Post-Operative Case Analysis & Nucleic Acid Workflow Calibration',
      summary:
        'Combined multi-case clinical database evaluation of post-operative complications with rigorous molecular biology protocol refinement and laboratory instrument calibration.',
      methods: [
        'Analyzed 5–10 concurrent case files and clinical outcome databases to identify post-operative complication patterns.',
        'Refined nucleic acid biochemistry, PCR, and NGS preparation workflows to reduce inter-run variability.',
        'Managed full experimental lifecycles covering study planning, calibration, assay execution, and quantitative evaluation.'
      ],
      tools: 'Nucleic Acid QC · Gene Codes Sequencher · MATLAB · Tableau · Western Blotting',
      outcome:
        'Improved cross-project workflow consistency and delivered verified analytical reports for critical clinical research initiatives.'
    },
    'project-3': {
      kicker: '03 · University of Albany · 2021–2023',
      title: 'Red Kidney Bean Enzyme Hydrolysis Protocol & Lab Pedagogy',
      summary:
        'Engineered an inventive enzyme hydrolysis protocol for canning red kidney beans while mentoring undergraduate and Master’s researchers in laboratory troubleshooting and experimental design.',
      methods: [
        'Developed and validated a repeatable canning enzyme hydrolysis protocol tailored to red kidney bean substrates.',
        'Provided hands-on mentoring, strategic troubleshooting, and protocol reviews for multiple undergraduate and Master’s students.',
        'Designed and graded structured laboratory quizzes and practical exercises to strengthen experimental rigor.'
      ],
      tools: 'Enzyme Hydrolysis Assays · ImageJ · Visual Molecular Dynamics (VMD) · D3.js · Python',
      outcome:
        'Established a reproducible biochemical hydrolysis workflow and elevated student laboratory proficiency across multiple cohorts.'
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initProjectFilters();
    initProjectModal();
    initCopyEmail();
    initContactForm();
  });

  function initMobileMenu() {
    var toggleBtn = document.getElementById('mobile-menu-toggle');
    var drawer = document.getElementById('mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', function () {
      var isHidden = drawer.hasAttribute('hidden');
      if (isHidden) {
        drawer.removeAttribute('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        drawer.setAttribute('hidden', '');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    var links = drawer.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        drawer.setAttribute('hidden', '');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function initProjectFilters() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');
    if (!filterButtons.length || !projectCards.length) return;

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', function (event) {
        var selectedFilter = event.currentTarget.getAttribute('data-filter');

        for (var j = 0; j < filterButtons.length; j++) {
          filterButtons[j].classList.remove('is-active');
        }
        event.currentTarget.classList.add('is-active');

        for (var k = 0; k < projectCards.length; k++) {
          var categories = projectCards[k].getAttribute('data-category') || '';
          if (selectedFilter === 'all' || categories.indexOf(selectedFilter) !== -1) {
            projectCards[k].removeAttribute('hidden');
          } else {
            projectCards[k].setAttribute('hidden', '');
          }
        }
      });
    }
  }

  function initProjectModal() {
    var modal = document.getElementById('project-modal');
    var closeBtn = document.getElementById('modal-close-btn');
    var openButtons = document.querySelectorAll('[data-open-project]');
    if (!modal || !closeBtn || !openButtons.length) return;

    var lastFocusedElement = null;

    function openModal(projectId) {
      var data = PROJECT_DETAILS[projectId];
      if (!data) return;

      lastFocusedElement = document.activeElement;
      document.getElementById('modal-kicker').textContent = data.kicker;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-summary').textContent = data.summary;
      document.getElementById('modal-tools').textContent = data.tools;
      document.getElementById('modal-outcome').textContent = data.outcome;

      var methodsList = document.getElementById('modal-methods');
      methodsList.innerHTML = '';
      for (var i = 0; i < data.methods.length; i++) {
        var li = document.createElement('li');
        li.textContent = data.methods[i];
        methodsList.appendChild(li);
      }

      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    for (var i = 0; i < openButtons.length; i++) {
      openButtons[i].addEventListener('click', function (event) {
        var projectId = event.currentTarget.getAttribute('data-open-project');
        openModal(projectId);
      });
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }

  function initCopyEmail() {
    var copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn) return;

    var emailAddress = 'rachel@novoresume.com';
    var resetTimer = null;

    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(emailAddress).then(
          function () {
            showCopiedState();
          },
          function () {
            fallbackCopy();
          }
        );
      } else {
        fallbackCopy();
      }
    });

    function showCopiedState() {
      copyBtn.textContent = 'Copied';
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        copyBtn.textContent = 'Copy';
      }, 2000);
    }

    function fallbackCopy() {
      var tempInput = document.createElement('input');
      tempInput.value = emailAddress;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        showCopiedState();
      } catch (_err) {
        copyBtn.textContent = 'rachel@novoresume.com';
      }
      document.body.removeChild(tempInput);
    }
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var nameInput = document.getElementById('sender-name');
    var emailInput = document.getElementById('sender-email');
    var topicSelect = document.getElementById('inquiry-topic');
    var messageInput = document.getElementById('sender-message');
    var counterEl = document.getElementById('message-counter');

    var nameError = document.getElementById('name-error');
    var emailError = document.getElementById('email-error');
    var messageError = document.getElementById('message-error');

    var submitBtn = document.getElementById('submit-btn');
    var statusBox = document.getElementById('form-status');
    var statusText = document.getElementById('form-status-text');
    var resetBtn = document.getElementById('reset-form-btn');

    messageInput.addEventListener('input', function () {
      var len = messageInput.value.length;
      counterEl.textContent = len + ' / 1000';
      if (len >= 10) {
        clearFieldError(messageInput, messageError);
      }
    });

    nameInput.addEventListener('input', function () {
      if (nameInput.value.trim().length >= 2) {
        clearFieldError(nameInput, nameError);
      }
    });

    emailInput.addEventListener('input', function () {
      if (isValidEmail(emailInput.value.trim())) {
        clearFieldError(emailInput, emailError);
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var nameVal = nameInput.value.trim();
      var emailVal = emailInput.value.trim();
      var topicVal = topicSelect.value;
      var messageVal = messageInput.value.trim();

      var hasError = false;

      if (nameVal.length < 2) {
        setFieldError(nameInput, nameError, 'Please enter your full name.');
        hasError = true;
      } else {
        clearFieldError(nameInput, nameError);
      }

      if (!isValidEmail(emailVal)) {
        setFieldError(emailInput, emailError, 'Please enter a valid email address.');
        hasError = true;
      } else {
        clearFieldError(emailInput, emailError);
      }

      if (messageVal.length < 10) {
        setFieldError(messageInput, messageError, 'Please include at least 10 characters in your message.');
        hasError = true;
      } else {
        clearFieldError(messageInput, messageError);
      }

      if (hasError) {
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        statusText.textContent =
          'Thank you, ' +
          nameVal +
          '. Your inquiry regarding "' +
          topicVal +
          '" has been recorded for rachel@novoresume.com.';
        statusBox.removeAttribute('hidden');
        form.reset();
        counterEl.textContent = '0 / 1000';
      }, 180);
    });

    resetBtn.addEventListener('click', function () {
      statusBox.setAttribute('hidden', '');
      nameInput.focus();
    });

    function setFieldError(inputEl, errorEl, message) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    }

    function clearFieldError(inputEl, errorEl) {
      inputEl.classList.remove('is-invalid');
      inputEl.removeAttribute('aria-invalid');
      errorEl.textContent = '';
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
  }
})();
