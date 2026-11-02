'use strict';

(() => {
  function failure(code) {
    const error = new Error('Contact delivery could not be confirmed');
    error.code = code;
    return error;
  }

  async function send(endpoint, payload, options = {}) {
    const fetcher = options.fetcher || globalThis.fetch;
    if (!endpoint || typeof fetcher !== 'function') throw failure('rejected');
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, options.timeoutMs ?? 25000);
    try {
      const response = await fetcher(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
        mode: 'cors',
        redirect: 'error',
        signal: controller.signal,
        body: JSON.stringify(payload)
      });
      let result;
      try { result = await response.json(); } catch (_) { throw failure('rejected'); }
      if (!response.ok || !result || typeof result !== 'object') throw failure('rejected');
      const message = typeof result.message === 'string' ? result.message : '';
      if (/activat|confirm.{0,40}e-?mail|verif.{0,40}e-?mail/i.test(message)) throw failure('activation');
      if (result.success !== true && result.success !== 'true') throw failure('rejected');
      return { accepted: true };
    } catch (error) {
      if (timedOut) throw failure('timeout');
      if (['activation', 'rejected'].includes(error?.code)) throw error;
      throw failure('network');
    } finally {
      clearTimeout(timer);
    }
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { send };
  if (typeof window !== 'undefined') window.VARIANA_DELIVERY = Object.freeze({ send });
})();
