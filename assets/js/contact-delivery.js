'use strict';

(() => {
  function failure(code) {
    const error = new Error('Contact delivery could not be confirmed');
    error.code = code;
    return error;
  }

  async function send(endpoint, payload, options = {}) {
    const fetcher = options.fetcher || globalThis.fetch;
    if (typeof endpoint !== 'string' || !/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/.test(endpoint)
      || typeof fetcher !== 'function' || typeof FormData !== 'function'
      || !payload || typeof payload !== 'object') throw failure('rejected');
    const data = new FormData();
    for (const name of ['name', 'email', 'Organisatie', 'Telefoonnummer', 'Onderwerp', 'message']) {
      data.set(name, String(payload[name] ?? ''));
    }
    // Formspree's documented notification field is subject; old provider
    // settings and arbitrary payload properties must not enter the new request.
    if (payload._subject != null) data.set('subject', String(payload._subject));
    if (payload._url != null) data.set('Bronpagina', String(payload._url));
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, options.timeoutMs ?? 25000);
    try {
      const response = await fetcher(endpoint, {
        method: 'POST',
        // The browser supplies the multipart boundary for FormData.
        headers: { Accept: 'application/json' },
        credentials: 'omit',
        mode: 'cors',
        redirect: 'error',
        signal: controller.signal,
        body: data
      });
      let result;
      try { result = await response.json(); } catch (_) { /* Successful responses may have no JSON body. */ }
      if (timedOut) throw failure('timeout');
      if (!response.ok || (result && typeof result === 'object'
        && Object.prototype.hasOwnProperty.call(result, 'errors'))) throw failure('rejected');
      // HTTP acceptance is the documented AJAX success signal. It is not
      // a guarantee that a notification has reached the recipient's inbox.
      return { accepted: true };
    } catch (error) {
      if (timedOut) throw failure('timeout');
      if (error?.code === 'rejected') throw error;
      throw failure('network');
    } finally {
      clearTimeout(timer);
    }
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { send };
  if (typeof window !== 'undefined') window.VARIANA_DELIVERY = Object.freeze({ send });
})();
