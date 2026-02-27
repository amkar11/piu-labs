import { ui } from './ui.js';
import { store } from './store.js';

const buttonsContainer = document.querySelector('#buttons-container');
const buttons = buttonsContainer.querySelectorAll('button');
const gridContainer = document.querySelector('#grid-container');

document.addEventListener('DOMContentLoaded', () => {
    ui.displaySavedData();
});

buttonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const button = e.target.closest('button');
    if (button === buttons[2]) {
        ui.changeCursor(store.brushActive === true ? true : false);
    } else {
        ui.addElement(button.id);
        ui.changeCursor(true);
    }
});

gridContainer.addEventListener('click', (e) => {
    console.log('Delete event fired');
    const shapeClass = e.target.classList[0];
    if (shapeClass == 'square' || shapeClass == 'circle') {
        if (store.brushActive === true) {
            ui.pickShapeColor(e.target);
            ui.changeCursor(true);
            return;
        }
        console.log('Delent event reached deleteElement function');
        ui.deleteElement(e);
    }
});
