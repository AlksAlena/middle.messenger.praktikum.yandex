interface FetchOptions extends RequestInit {
  tries?: number;
}

export function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const tries: number = options.tries || 1;

  function onError(err: any): Promise<Response> {
    const triesLeft: number = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options).catch(onError);
}
