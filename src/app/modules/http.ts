const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

// [{key, value}, ...]
function codeUrlParams(params) {
  let url = new URL('https://google.com/search');
  params.forEach(param => url.searchParams.set(param.key, param.value));
  return url;
}

export class HttpTransport {
  get = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url, options, timeout = 5000) => {
    const { headers = {}, data, method } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const isGet = method === METHODS.GET;
      const targetUrl = isGet || !!data ? `${url}${queryStringify(data)}` : url;

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
