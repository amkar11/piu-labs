import { store } from './store.js';
import pickColor from './helpers.js';

class userInterface {
    #gridContainer = null;

    constructor() {
        store.subscribe(this.updateCounters.bind(this));
        this.#gridContainer = document.querySelector('#grid-container');
        console.log('Grid container: ' + this.#gridContainer);
    }

    changeCursor(exit = false) {
        if (exit) {
            document.body.classList.remove('brush-mode');
            store.brushActive = false;
        } else {
            document.body.classList.add('brush-mode');
            store.brushActive = true;
        }

        const event = new MouseEvent('mouseout', {
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0,
        });
        document.dispatchEvent(event);
    }

    pickShapeColor(element) {
        element.style.backgroundColor = pickColor();
        store.changeColor(element, getComputedStyle(element).backgroundColor);
    }

    updateCounters(shapesList) {
        const circlesCount = shapesList.filter((shape) =>
            shape.classList.contains('circle'),
        ).length;
        const squaresCount = shapesList.filter((shape) =>
            shape.classList.contains('square'),
        ).length;
        const circlesP = document.querySelector('h3:nth-child(1)');
        const squaresP = document.querySelector('h3:nth-child(2)');
        circlesP.textContent = 'Circles: ' + circlesCount;
        squaresP.textContent = 'Squares: ' + squaresCount;
    }

    addElement(shapeClass, bgColor = null) {
        const container = document.createElement('div');
        container.classList.add('shape-container');
        const shape = document.createElement('div');
        shape.classList.add(shapeClass == 'square' ? 'square' : 'circle');
        if (bgColor) shape.style.backgroundColor = bgColor;
        container.appendChild(shape);
        this.#gridContainer.appendChild(container);
        store.addElement(shape);
    }

    deleteElement(e) {
        e.target.parentNode.remove();
        store.deleteElement(e.target);
    }

    displaySavedData() {
        if (store.savedCounters !== null && store.savedData !== null) {
            document.querySelector('h3:nth-child(1)').textContent =
                'Circles: ' + store.savedCounters.circles;
            document.querySelector('h3:nth-child(2)').textContent =
                'Squares: ' + store.savedCounters.squares;
            console.log('displaySavedData fired');
            for (const shape of store.savedData) {
                this.addElement(shape.class, shape.color);
            }
        }
    }
}

export const ui = new userInterface();
