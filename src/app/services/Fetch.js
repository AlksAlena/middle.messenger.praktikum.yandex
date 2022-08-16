const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
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
