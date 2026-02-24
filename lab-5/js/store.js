class Store {
    #state = {
        shapesList: [],
        savedData: null,
        savedCounters: null,
    };

    #subscribers = new Set();

    get shapesList() {
        return this.#state.shapesList;
    }

    get savedData() {
        return this.#state.savedData;
    }

    set savedData(data) {
        this.#state.savedData = data;
    }

    get savedCounters() {
        return this.#state.savedCounters;
    }

    set savedCounters(data) {
        this.#state.savedCounters = data;
    }

    constructor() {
        this.savedData = JSON.parse(localStorage.getItem('savedData'));
        this.savedCounters = JSON.parse(localStorage.getItem('savedCounters'));
    }

    addElement(element) {
        this.shapesList.push(element);
        this.#notify();
    }

    deleteElement(element) {
        const index = this.shapesList.indexOf(element);
        this.shapesList.splice(index, 1);
        this.#notify();
    }

    saveData(shapesList) {
        const data = [];
        shapesList.forEach((shape) =>
            data.push({
                color: getComputedStyle(shape).backgroundColor,
                class: shape.classList.contains('circle') ? 'circle' : 'square',
            }),
        );
        localStorage.setItem('savedData', JSON.stringify(data));

        const circlesCount = shapesList.filter((shape) =>
            shape.classList.contains('circle'),
        ).length;
        const squaresCount = shapesList.filter((shape) =>
            shape.classList.contains('square'),
        ).length;
        localStorage.setItem(
            'savedCounters',
            JSON.stringify({
                circles: circlesCount,
                squares: squaresCount,
            }),
        );
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
        callback(this.shapesList);
        return () => this.#subscribers.delete(callback);
    }

    #notify() {
        for (const sub of this.#subscribers) {
            sub(this.shapesList);
        }
    }
}

export const store = new Store();
