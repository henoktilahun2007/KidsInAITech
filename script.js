/* KidsInAITech student project — vanilla JavaScript, no external dependencies. */
(() => {
  'use strict';

  // A usable mobile navigation menu, including closing on navigation or Escape.
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open menu');
    };
    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 780) closeMenu(); });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Filter cards without reloading the Programs page.
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.catalog-card[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
  }));

  // Switch the information shown to parents, volunteers and supporters.
  const audience = {
    parents: {
      kicker: 'For families', title: 'Give their curiosity room to grow.',
      text: 'Help your child explore new skills, build confidence, and discover that technology is something they can create—not just consume.',
      bullets: ['Kid-friendly learning experiences', 'Program information in one clear place', 'Easy ways to express interest'],
      href: 'programs.html', link: 'Explore programs'
    },
    volunteers: {
      kicker: 'For volunteers', title: 'Share what you know. Spark what they can do.',
      text: 'Your time, encouragement, and ideas could help a young learner feel right at home exploring technology.',
      bullets: ['Support hands-on activities', 'Encourage experimentation and teamwork', 'Help grow a welcoming tech community'],
      href: 'get-involved.html#volunteer', link: 'Explore volunteering'
    },
    supporters: {
      kicker: 'For supporters', title: 'Help open the door to opportunity.',
      text: 'Community support and partnerships can help make technology learning more accessible to children and families.',
      bullets: ['Learn about the mission', 'Explore ways to provide support', 'Help more families discover programs'],
      href: 'get-involved.html#support', link: 'Explore ways to help'
    }
  };
  const panel = document.querySelector('#audience-content');
  const audienceButtons = [...document.querySelectorAll('[data-audience]')];
  if (panel) {
    audienceButtons.forEach(button => button.addEventListener('click', () => {
      const entry = audience[button.dataset.audience];
      if (!entry) return;
      audienceButtons.forEach(b => b.setAttribute('aria-selected', String(b === button)));
      panel.replaceChildren();
      const kicker = document.createElement('span'); kicker.textContent = entry.kicker;
      const heading = document.createElement('h3'); heading.textContent = entry.title;
      const copy = document.createElement('p'); copy.textContent = entry.text;
      const list = document.createElement('ul');
      entry.bullets.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
      const link = document.createElement('a'); link.className = 'text-link'; link.href = entry.href;
      link.textContent = entry.link + ' →';
      panel.append(kicker, heading, copy, list, link);
    }));
  }

  // Program-interest modal: users can try the proposed form, without sending personal data.
  const dialog = document.querySelector('#interest-dialog');
  let previousFocus = null;
  if (dialog) {
    document.querySelectorAll('[data-open-interest]').forEach(button => button.addEventListener('click', () => {
      previousFocus = document.activeElement;
      const desired = button.dataset.openInterest;
      const select = dialog.querySelector('select[name="program"]');
      if (select && [...select.options].some(opt => opt.value === desired)) select.value = desired;
      const feedback = dialog.querySelector('.form-feedback');
      if (feedback) feedback.hidden = true;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      dialog.querySelector('input')?.focus();
    }));
    const closeDialog = () => {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      previousFocus?.focus();
    };
    dialog.querySelector('[data-close-dialog]')?.addEventListener('click', closeDialog);
    dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
    dialog.addEventListener('close', () => previousFocus?.focus());
  }

  // Form demo: prepares a copyable message. Never pretends an inquiry was delivered.
  document.querySelectorAll('form.demo-form').forEach(form => {
    const feedback = form.querySelector('.form-feedback');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity() || !feedback) return;
      const data = new FormData(form);
      const fields = [...data.entries()]
        .filter(([, value]) => String(value).trim())
        .map(([key, value]) => `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${String(value).trim()}`);
      const message = `${form.dataset.formType || 'Inquiry'} — KidsInAITech website prototype\n\n${fields.join('\n')}\n\n(This message was created in a classroom prototype and has not been sent.)`;
      const heading = document.createElement('strong');
      heading.textContent = 'Your message draft is ready — nothing has been sent.';
      const explanatory = document.createElement('p');
      explanatory.textContent = 'Copy the draft below if you want to keep it. This prototype has no inbox or registration system.';
      const preview = document.createElement('pre');
      preview.textContent = message;
      const copy = document.createElement('button');
      copy.type = 'button'; copy.className = 'btn btn-dark btn-sm'; copy.textContent = 'Copy message';
      const copyStatus = document.createElement('span');
      copyStatus.style.marginLeft = '12px'; copyStatus.style.fontWeight = '800';
      copy.addEventListener('click', async () => {
        try {
          if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(message);
          else {
            const temporary = document.createElement('textarea');
            temporary.value = message; temporary.style.position = 'fixed'; temporary.style.opacity = '0';
            document.body.append(temporary); temporary.select();
            if (!document.execCommand('copy')) throw Error('Copy not supported');
            temporary.remove();
          }
          copyStatus.textContent = 'Copied!';
        } catch (_) {
          copyStatus.textContent = 'Select the draft above to copy it.';
        }
      });
      feedback.replaceChildren(heading, explanatory, preview, copy, copyStatus);
      feedback.hidden = false;
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  const topic = new URLSearchParams(window.location.search).get('topic');
  const topicSelect = document.querySelector('#contact-topic');
  if (topic && topicSelect && [...topicSelect.options].some(o => o.value === topic)) topicSelect.value = topic;
})();
