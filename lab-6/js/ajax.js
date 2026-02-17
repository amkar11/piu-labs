export class Ajax {
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        },
        baseURL: 'https://jsonplaceholder.typicode.com/',
        defalutTimeout: 20000,
    };

    constructor(options) {
        this.options = options ?? this.options;
    }

    async get(url = '', options = this.options) {
        try {
            let controller = new AbortController();
            setTimeout(
                () => controller.abort(),
                options.defalutTimeout ?? 20000,
            );
            const res = await fetch(options.baseURL + url, {
                signal: controller.signal,
            });
            if (!res.ok) throw new Error('Błąd HTTP: ' + res.status);
            const data = await res.json();
            return data;
        } catch (err) {
            if (err.name == 'AbortError') {
                await this.displayErrorPopup(
                    `Aborted after wait time of ${options.defalutTimeout}`,
                );
            } else {
                this.displayErrorPopup(err);
            }
        }
    }

    async post(url = '', data = this.options.body, options = this.options) {
        try {
            const controller = new AbortController();
            setTimeout(
                () => controller.abort(),
                options.defalutTimeout ?? 20000,
            );
            const res = await fetch(options.baseURL + url, {
                method: options.method,
                headers: options.headers,
                body: JSON.stringify(data),
                signal: controller.signal,
            });
            if (!res.ok) throw new Error('Błąd HTTP: ' + res.status);
            const json = await res.json();
            console.log(json);
            return json;
        } catch (err) {
            if (err.name == 'AbortError') {
                await this.displayErrorPopup(
                    `Aborted after wait time of ${options.defalutTimeout}`,
                );
            } else {
                this.displayErrorPopup(err);
            }
        }
    }

    async put(url = '', data = this.options.body, options = this.options) {
        try {
            const controller = new AbortController();
            setTimeout(
                () => controller.abort(),
                options.defalutTimeout ?? 20000,
            );
            const res = await fetch(options.baseURL + url, {
                method: options.method,
                headers: options.headers,
                body: JSON.stringify(data),
                signal: controller.signal,
            });
            if (!res.ok) throw new Error('Błąd HTTP: ' + res.status);
            const json = await res.json();
            console.log(json);
            return json;
        } catch (err) {
            if (err.name == 'AbortError') {
                await this.displayErrorPopup(
                    `Aborted after wait time of ${options.defalutTimeout}`,
                );
            } else {
                this.displayErrorPopup(err);
            }
        }
    }

    async delete(url = '', options = this.options) {
        try {
            const controller = new AbortController();
            setTimeout(
                () => controller.abort(),
                options.defalutTimeout ?? 20000,
            );
            const res = await fetch(options.baseURL + url, {
                method: options.method,
                signal: controller.signal,
            });
            if (!res.ok) throw new Error('Błąd HTTP: ' + res.status);
            const json = await res.json();
            console.log(json);
            return json;
        } catch (err) {
            if (err.name == 'AbortError') {
                await this.displayErrorPopup(
                    `Aborted after wait time of ${options.defalutTimeout}`,
                );
            } else {
                this.displayErrorPopup(err);
            }
        }
    }

    async displayErrorPopup(err) {
        const errorPopup = document.querySelector('.error-popup');
        errorPopup.style.display = 'flex';
        const error = document.createElement('p');
        error.innerHTML = err;
        errorPopup.appendChild(error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        error.remove();
        errorPopup.style.display = 'none';
    }
}
