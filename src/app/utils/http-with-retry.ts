import { HttpTransport } from '../modules/http';

interface FetchOptions extends RequestInit {
  tries?: number;
}

export function httpWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const tries: number = options.tries || 1;

  function onError(err: any): Promise<Response> {
    const triesLeft: number = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return httpWithRetry(url, { ...options, tries: triesLeft });
  }

  return new HttpTransport(url, options).catch(onError);
}
