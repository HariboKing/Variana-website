'use strict';

// Native links and details work without JavaScript. This adds only progressive behavior.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}
if (menuButton && navigation) {
  document.documentElement.classList.add('js');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  matchMedia('(min-width: 1061px)').addEventListener('change', closeMenu);
}

document.querySelectorAll('[data-demo]').forEach((demo) => {
  const tabs = [...demo.querySelectorAll('[data-demo-tab]')];
  function activate(tab, focus = false) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    demo.querySelectorAll('[data-demo-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.demoPanel !== tab.dataset.demoTab;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
});

const form = document.getElementById('contact-form');
if (form) {
  const configured = window.VARIANA_CONFIG?.contactEmail || '';
  const emailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configured);
  const button = document.getElementById('contact-submit');
  const mode = document.getElementById('contact-mode');
  const status = document.getElementById('form-status');
  const downloadButton = document.getElementById('contact-download');
  const topic = new URLSearchParams(location.search).get('onderwerp');
  const aliases = { dienstverlening: 'samenwerking', analyse: 'opdracht', advies: 'opdracht', licenties: 'licentie' };
  const selected = aliases[topic] || topic;
  if ([...form.elements.topic.options].some((item) => item.value === selected)) form.elements.topic.value = selected;
  if (emailReady) {
    button.textContent = 'Open aanvraag in mijn e-mailprogramma ↗';
    mode.textContent = `Je e-mailprogramma opent met een bericht aan ${configured}. Controleer het bericht en verstuur het daar zelf. Je kunt je aanvraag ook als tekst downloaden.`;
    document.querySelectorAll('[data-contact-address]').forEach((link) => {
      link.href = `mailto:${configured}`;
      link.textContent = configured;
    });
    downloadButton.hidden = false;
  }
  function requestText() {
    const values = new FormData(form);
    const topicText = form.elements.topic.selectedOptions[0].textContent;
    const subject = `Kennismaking Variana — ${topicText}`;
    const body = `Aanvraag Variana\n\nOnderwerp: ${topicText}\nNaam: ${values.get('name')}\nOrganisatie: ${values.get('organization') || 'Niet ingevuld'}\nE-mailadres: ${values.get('email')}\n\nVraagstuk:\n${values.get('message')}\n\nDit is een lokaal opgesteld aanvraagconcept. Er is niets automatisch verzonden.\n`;
    return { subject, body };
  }
  function downloadRequest(body) {
    const url = URL.createObjectURL(new Blob(['\uFEFF', body], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'variana-aanvraag.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = emailReady
      ? `Je aanvraagbestand is voorbereid voor download. Er is niets verzonden. Je kunt het bestand zelf naar ${configured} mailen.`
      : 'Je aanvraagbestand is voorbereid voor download. Er is niets verzonden. Bewaar het bestand; een contactadres moet nog worden ingesteld.';
  }
  downloadButton.addEventListener('click', () => {
    if (form.reportValidity()) downloadRequest(requestText().body);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const { subject, body } = requestText();
    if (emailReady) {
      location.href = `mailto:${configured}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Het e-mailconcept is aangeboden aan je e-mailprogramma. Controleer het bericht en verstuur het daar zelf. Opent er geen programma? Download je aanvraag en mail deze zelf. Er is niets automatisch verzonden.';
    } else {
      downloadRequest(body);
    }
  });
  button.disabled = false;
}

// Real product images remain ordinary links when JavaScript is unavailable.
const imageViewer = document.getElementById('image-viewer');
if (imageViewer && typeof imageViewer.showModal === 'function') {
  let imageTrigger;
  document.querySelectorAll('[data-image-zoom]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      imageTrigger = link;
      const sourceImage = link.querySelector('img');
      const enlarged = imageViewer.querySelector('img');
      enlarged.src = link.href;
      enlarged.alt = sourceImage.alt;
      document.getElementById('viewer-caption').textContent = sourceImage.alt;
      imageViewer.showModal();
    });
  });
  imageViewer.querySelector('[data-close-viewer]').addEventListener('click', () => imageViewer.close());
  imageViewer.addEventListener('close', () => imageTrigger?.focus());
}

