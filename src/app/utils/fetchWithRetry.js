export default function fetchWithRetry(url, options = {}) {
  const { tries = 1 } = options;

  function onError(err) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options).catch(onError);
}
