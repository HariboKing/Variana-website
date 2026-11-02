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
  const endpoint = window.VARIANA_CONFIG?.contactEndpoint || '';
  const delivery = window.VARIANA_DELIVERY;
  const deliveryReady = typeof endpoint === 'string' && !!endpoint && typeof delivery?.send === 'function';
  const button = document.getElementById('contact-submit');
  const mode = document.getElementById('contact-mode');
  const status = document.getElementById('form-status');
  let isSubmitting = false;
  const topic = new URLSearchParams(location.search).get('onderwerp');
  const aliases = { dienstverlening: 'samenwerking', analyse: 'opdracht', advies: 'opdracht', licenties: 'licentie' };
  const topicPayload = document.querySelector('[data-contact-topics]');
  let resultTopics = {};
  try {
    const parsed = JSON.parse(topicPayload?.textContent || '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) resultTopics = parsed;
  } catch (_) { /* Ordinary contact topics remain available. */ }
  function setTopic(value) {
    if (typeof value !== 'string') return false;
    const selected = Object.prototype.hasOwnProperty.call(aliases, value) ? aliases[value] : value;
    const resultLabel = selected.startsWith('keuze-') && Object.prototype.hasOwnProperty.call(resultTopics, selected)
      && typeof resultTopics[selected] === 'string' && resultTopics[selected] ? resultTopics[selected] : null;
    const ordinary = [...form.elements.topic.options].some(item => !item.hasAttribute('data-contact-result') && item.value === selected);
    if (!resultLabel && !ordinary) return false;
    // One generated option is enough, even after closing and choosing another result.
    form.elements.topic.querySelectorAll('[data-contact-result]').forEach(item => item.remove());
    if (resultLabel) {
      const option = document.createElement('option');
      option.value = selected;
      option.textContent = resultLabel;
      option.setAttribute('data-contact-result', '');
      form.elements.topic.append(option);
    }
    form.elements.topic.value = selected;
    return true;
  }
  setTopic(topic);

  const contactDialog = document.getElementById('contact-dialog');
  if (contactDialog && form.closest('dialog') === contactDialog && typeof contactDialog.showModal === 'function') {
    let contactTrigger;
    window.VARIANA_CONTACT = Object.freeze({
      open(topicValue, trigger) {
        const previousTopic = form.elements.topic.value;
        // A request already in flight keeps its original subject and status.
        if (!isSubmitting && !setTopic(topicValue)) return false;
        try {
          if (!contactDialog.open) contactDialog.showModal();
        } catch (_) { return false; } // The ordinary contact link remains the fallback.
        contactTrigger = trigger;
        document.body.classList.add('contact-dialog-open');
        if (!isSubmitting && previousTopic !== form.elements.topic.value) {
          status.textContent = '';
          form.dataset.contactState = deliveryReady ? 'ready' : 'unavailable';
        }
        contactDialog.scrollTop = 0;
        if (isSubmitting) contactDialog.querySelector('[data-close-contact]')?.focus({ preventScroll: true });
        else form.elements.name.focus({ preventScroll: true });
        return true;
      }
    });
    contactDialog.querySelector('[data-close-contact]')?.addEventListener('click', () => contactDialog.close());
    // Native modal behavior keeps focus inside and closes on Escape.
    contactDialog.addEventListener('close', () => {
      document.body.classList.remove('contact-dialog-open');
      if (contactTrigger?.isConnected) contactTrigger.focus({ preventScroll: true });
      contactTrigger = null;
    });
  }
  if (emailReady) {
    document.querySelectorAll('[data-contact-address]').forEach((link) => {
      link.href = `mailto:${configured}`;
      link.textContent = configured;
    });
  }
  button.textContent = 'Verstuur aanvraag';
  form.dataset.contactState = deliveryReady ? 'ready' : 'unavailable';
  if (!deliveryReady) {
    mode.textContent = 'Het formulier kan op dit moment geen aanvragen versturen. Probeer het later opnieuw.';
  }
  function requestPayload() {
    const values = new FormData(form);
    const topicText = form.elements.topic.selectedOptions[0].textContent;
    const value = name => String(values.get(name) || '').trim();
    return {
      name: value('name'),
      email: value('email'),
      Organisatie: value('organization') || 'Niet ingevuld',
      Telefoonnummer: value('phone') || 'Niet ingevuld',
      Onderwerp: topicText,
      message: value('message') || 'Niet ingevuld',
      _subject: `Aanvraag Variana — ${topicText}`,
      _template: 'table',
      _honey: value('_honey'),
      _url: /^https?:$/.test(location.protocol) ? location.origin + location.pathname
        : 'https://variana.nl' + (contactDialog ? '/toepassingen/' : '/contact/')
    };
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting || !deliveryReady) return;
    if (!form.reportValidity()) return;
    const payload = requestPayload();
    if (payload._honey) {
      form.dataset.contactState = 'error';
      status.textContent = 'We konden de verzending niet bevestigen. Je invoer blijft staan. Probeer het opnieuw.';
      return;
    }
    const controls = [...form.querySelectorAll('input, select, textarea, button')]
      .map(control => ({ control, disabled: control.disabled }));
    isSubmitting = true;
    form.setAttribute('aria-busy', 'true');
    form.dataset.contactState = 'sending';
    status.textContent = 'Je aanvraag wordt verstuurd…';
    button.textContent = 'Bezig met versturen…';
    controls.forEach(({ control }) => { control.disabled = true; });
    try {
      const result = await delivery.send(endpoint, payload);
      if (result?.accepted !== true) throw new Error('Unconfirmed submission');
      // Clear personal input only after the service has accepted this request.
      ['name', 'organization', 'email', 'phone', 'message', '_honey'].forEach(name => {
        const control = form.elements.namedItem(name);
        if (control) control.value = '';
      });
      form.dataset.contactState = 'success';
      status.textContent = 'Bedankt. Je aanvraag is verstuurd. We nemen contact met je op.';
    } catch (error) {
      form.dataset.contactState = 'error';
      status.textContent = error?.code === 'activation'
        ? 'Het formulier kan op dit moment nog geen aanvragen versturen. Je invoer blijft staan. Probeer het later opnieuw.'
        : 'We konden de verzending niet bevestigen. Je invoer blijft staan. Probeer het opnieuw.';
    } finally {
      controls.forEach(({ control, disabled }) => { control.disabled = disabled; });
      isSubmitting = false;
      form.removeAttribute('aria-busy');
      button.textContent = 'Verstuur aanvraag';
    }
  });
  button.disabled = !deliveryReady;
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

