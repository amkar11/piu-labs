class Store {
    #state = {
        shapesList: [],
        savedData: null,
        savedCounters: null,
        brushActive: false,
    };

    #subscribers = new Set();

    get shapesList() {
        return this.#state.shapesList;
    }

    get savedData() {
        return this.#state.savedData;
    }

    get brushActive() {
        return this.#state.brushActive;
    }

    set brushActive(bool) {
        if (typeof bool !== 'boolean') {
            throw new Error(`Variable ${bool} must be true or false`);
        }
        this.#state.brushActive = bool;
        console.log(this.brushActive);
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
        console.log(this.savedData);
        this.savedCounters = JSON.parse(localStorage.getItem('savedCounters'));
        console.log(this.savedCounters);
    }

    addElement(element) {
        this.shapesList.push(element);
        this.#notify();
        this.#saveData();
    }

    deleteElement(element) {
        const index = this.shapesList.indexOf(element);
        this.shapesList.splice(index, 1);
        this.#notify();
        this.#saveData();
    }

    changeColor(element, color) {
        console.log('changeColor inside store fired');
        const index = this.shapesList.indexOf(element);
        this.shapesList[index].style.backgroundColor = color;
        this.#saveData();
    }

    #saveData() {
        const data = [];
        this.shapesList.forEach((shape) =>
            data.push({
                color: getComputedStyle(shape).backgroundColor,
                class: shape.classList.contains('circle') ? 'circle' : 'square',
            }),
        );
        localStorage.setItem('savedData', JSON.stringify(data));
        const circlesCount = this.shapesList.filter((shape) =>
            shape.classList.contains('circle'),
        ).length;
        const squaresCount = this.shapesList.filter((shape) =>
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
