export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Record<string, any> | undefined): string {
  if (!!data || typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys: string[] = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

// [{key, value}, ...]

function codeUrlParams(params: Record<string, any>[]) {
  let url = new URL('https://google.com/search');
  params.forEach(param => url.searchParams.set(param.key, param.value));
  return url;
}

interface Options {
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  method?: METHODS;
}

export class HttpTransport {
  get = (url: string, options: Options = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url: string, options: Options = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url: string, options: Options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url: string, options: Options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, data, method } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const isGet: boolean = method === METHODS.GET;
      const targetUrl: string = isGet || !!data ? `${url}${queryStringify(data)}` : url;

      const xhr = new XMLHttpRequest();
      xhr.open(method, targetUrl);
      Object.entries(headers).forEach(([header, value]) => xhr.setRequestHeader(header, value));

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
