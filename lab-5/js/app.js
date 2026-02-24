import { ui } from './ui.js';

const buttonsContainer = document.querySelector('#buttons-container');
const buttons = buttonsContainer.querySelectorAll('button');
const gridContainer = document.querySelector('#grid-container');

buttonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const button = e.target.closest('button');
    if (button === buttons[2]) {
        ui.changeCursor();
    } else {
        ui.addElement(button.id);
    }
});

gridContainer.addEventListener('click', (e) => {
    console.log('Delete event fired');
    const shapeClass = e.target.classList[0];
    if (shapeClass == 'square' || shapeClass == 'circle') {
        ui.deleteElement(e);
    }
});
