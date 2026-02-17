export class Options {
    method = null;
    headers = null;
    body = null;
    baseURL = null;
    defaultTimeout = null;
    constructor(method, headers, body, baseURL, defaultTimeout) {
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.baseURL = baseURL;
        this.defaultTimeout = defaultTimeout;
    }
}
