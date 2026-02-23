const trHead = document.querySelector('.tr-head');
const todoButton = document.querySelector('#todo-button');
const doingButton = document.querySelector('#doing-button');
const doneButton = document.querySelector('#done-button');
const table = document.querySelector('table');

const defaultBgColor = 'rgba(255, 228, 196, 0.5)';

trHead.addEventListener('click', addCard);
table.addEventListener('click', deleteCard);
table.addEventListener('click', moveCard);
table.addEventListener('input', (e) => {
    console.log(e);
    if (e.target.type !== 'color') return;
    console.log('Input event fires');
    const input = e.target.closest("input[type='color']");
    input.parentNode.style.backgroundColor = input.value;
    if (input.parentNode.parentNode.tagName === 'TH') {
        const button = input.parentNode.previousElementSibling;
        if (button.tagName === 'BUTTON') {
            let rowName = button.id.split('-')[0];
            const tdList = document.querySelectorAll(`.${rowName}-td`);
            for (const td of tdList) {
                const crossIcon = td.querySelector('img');
                const buttons = td.querySelectorAll('button');
                const tdColorInput = td.querySelector('input');
                const tdColorInputWrapper = td.querySelector(
                    '.color-input-wrapper',
                );
                tdColorInputWrapper.style.backgroundColor = input.value;
                tdColorInput.value = input.value;
                td.style.backgroundColor = input.value;
                crossIcon.style.backgroundColor = input.value;
                for (const button of buttons) {
                    button.style.backgroundColor = input.value;
                }
            }
        }
    } else if (input.parentNode.parentNode.tagName === 'TD') {
        const div = input.parentNode.parentNode;
        const crossIcon = div.querySelector('img');
        const buttons = div.querySelectorAll('button');
        div.style.backgroundColor = input.value;
        crossIcon.style.backgroundColor = input.value;
        for (const button of buttons) {
            button.style.backgroundColor = input.value;
        }
    }
});

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const data = JSON.parse(localStorage.getItem('tableData'));
        if (data) {
            loadData();
            return;
        }
        const colorInputs = document.querySelectorAll("input[type='color']");
        const colorInputWrappers = document.querySelectorAll(
            '.color-input-wrapper',
        );
        for (let i = 0; i < colorInputs.length; i++) {
            colorInputWrappers[i].style.backgroundColor = colorInputs[i].value;
        }
    },
    { once: true },
);

window.addEventListener('beforeunload', storeData);

function addCard(e) {
    if (e.target.closest('#todo-button')) {
        const todoCards = document.getElementsByClassName('todo-td');
        if (todoCards.length != 0) {
            let rowFound = false;
            for (const card of todoCards) {
                if (card.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    card.style.opacity = '1';
                    card.querySelector('span').focus();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                tr.querySelector('.todo-td').style.opacity = '1';
                table.appendChild(tr);
                tr.querySelector('.todo-td span').focus();
            }
        } else {
            const tr = createRow();
            tr.querySelector('.todo-td').style.opacity = '1';
            table.appendChild(tr);
            tr.querySelector('.todo-td span').focus();
        }
    } else if (e.target.closest('#doing-button')) {
        const doingCards = document.getElementsByClassName('doing-td');
        if (doingCards.length != 0) {
            let rowFound = false;
            for (const card of doingCards) {
                if (card.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    card.style.opacity = '1';
                    card.querySelector('span').focus();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                tr.querySelector('.doing-td').style.opacity = '1';
                table.appendChild(tr);
                tr.querySelector('.doing-td span').focus();
            }
        } else {
            const tr = createRow();
            tr.querySelector('.doing-td').style.opacity = '1';
            table.appendChild(tr);
            tr.querySelector('.doing-td span').focus();
        }
    } else if (e.target.closest('#done-button')) {
        const doneCards = document.getElementsByClassName('done-td');
        if (doneCards.length != 0) {
            let rowFound = false;
            for (const card of doneCards) {
                if (card.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    card.style.opacity = '1';
                    card.querySelector('span').focus();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                tr.querySelector('.done-td').style.opacity = '1';
                table.appendChild(tr);
                tr.querySelector('.done-td span').focus();
            }
        } else {
            const tr = createRow();
            tr.querySelector('.done-td').style.opacity = '1';
            table.appendChild(tr);
            tr.querySelector('.done-td span').focus();
        }
    }
}

function deleteCard(e, ensureOnce = false) {
    if (
        e.target.tagName === 'IMG' ||
        (e.target.closest('td')?.classList.contains('todo-td') &&
            e.target == e.target.closest('.right-button') &&
            ensureOnce === true) ||
        (e.target.closest('td')?.classList.contains('done-td') &&
            e.target == e.target.closest('.left-button') &&
            ensureOnce === true) ||
        (e.target.closest('td')?.classList.contains('doing-td') &&
            e.target == e.target.closest('.left-button') &&
            ensureOnce === true) ||
        (e.target.closest('td')?.classList.contains('doing-td') &&
            e.target == e.target.closest('.right-button') &&
            ensureOnce === true)
    ) {
        console.log('deleteCard fires');
        const currentTd = e.target.closest('td');
        if (!currentTd) return;
        console.log(`${currentTd}`);
        const tdClass = currentTd.classList[0];
        const tdList = document.querySelectorAll(`.${tdClass}`);
        console.log(tdList);
        const tdListArray = Array.from(tdList);
        let currentTdIndex = tdListArray.indexOf(currentTd);
        console.log(`Current index of td: ${currentTdIndex}`);
        for (let i = currentTdIndex; i < tdList.length - 1; i++) {
            tdList[i].querySelector('span').innerHTML = tdList[i + 1]
                .querySelector('span')
                .textContent.trim();
        }
        const card = e.target.closest('td');
        const currentClass = card.classList[0];
        console.log(currentClass);
        const currentColumn = document.querySelectorAll(`.${currentClass}`);
        console.log(currentColumn);
        for (let i = currentColumn.length - 1; i != -1; i--) {
            console.log(i);
            if (getComputedStyle(currentColumn[i]).opacity == '1') {
                console.log('if fired');
                currentColumn[i].style.opacity = '0';
                currentColumn[i].querySelector('span').innerHTML = '';
                break;
            }
        }
        const rowsList = document.querySelectorAll('tr');
        const lastRow = rowsList[rowsList.length - 1];
        const lastRowTdList = lastRow.querySelectorAll('td');
        let opacityCounter = 0;
        for (const td of lastRowTdList) {
            if (getComputedStyle(td).opacity === '0') opacityCounter++;
        }
        if (opacityCounter == 3) table.removeChild(lastRow);
    }
}

function moveCard(e) {
    if (
        e.target.tagName == 'BUTTON' &&
        e.target.classList.contains('move-button')
    ) {
        const card = e.target.closest('td');
        const leftButton = card.querySelector('.left-button');
        const rightButton = card.querySelector('.right-button');
        if (
            (card.classList.contains('todo-td') && e.target == leftButton) ||
            (card.classList.contains('done-td') && e.target == rightButton)
        ) {
            return;
        } else if (
            card.classList.contains('todo-td') &&
            e.target == rightButton
        ) {
            const doingTdList = document.querySelectorAll('.doing-td');
            let rowFound = false;
            for (const doingTd of doingTdList) {
                if (doingTd.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    doingTd.style.opacity = '1';
                    doingTd.querySelector('span').innerHTML = card
                        .querySelector('span')
                        .textContent.trim();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                table.appendChild(tr);
                tr.querySelector('.doing-td').style.opacity = '1';
                tr.querySelector('.doing-td span').innerHTML = card
                    .querySelector('span')
                    .textContent.trim();
            }
            console.log('If it came here, then deleteCard must execute');
            deleteCard(e, true);
        } else if (
            card.classList.contains('done-td') &&
            e.target == leftButton
        ) {
            const doingTdList = document.querySelectorAll('.doing-td');
            let rowFound = false;
            for (const doingTd of doingTdList) {
                if (doingTd.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    doingTd.style.opacity = '1';
                    doingTd.querySelector('span').innerHTML = card
                        .querySelector('span')
                        .textContent.trim();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                table.appendChild(tr);
                tr.querySelector('.doing-td').style.opacity = '1';
                tr.querySelector('.doing-td').querySelector('span').innerHTML =
                    card.querySelector('span').textContent.trim();
            }
            deleteCard(e, true);
        } else if (
            card.classList.contains('doing-td') &&
            e.target == leftButton
        ) {
            const todoTdList = document.querySelectorAll('.todo-td');
            let rowFound = false;
            for (const todoTd of todoTdList) {
                if (todoTd.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    todoTd.style.opacity = '1';
                    todoTd.querySelector('span').innerHTML = card
                        .querySelector('span')
                        .textContent.trim();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                table.appendChild(tr);
                tr.querySelector('.todo-td').style.opacity = '1';
                tr.querySelector('.todo-td').querySelector('span').innerHTML =
                    card.querySelector('span').textContent.trim();
            }
            deleteCard(e, true);
        } else if (
            card.classList.contains('doing-td') &&
            e.target == rightButton
        ) {
            const doneTdList = document.querySelectorAll('.done-td');
            let rowFound = false;
            for (const doneTd of doneTdList) {
                if (doneTd.querySelector('span').textContent.trim() === '') {
                    rowFound = true;
                    doneTd.style.opacity = '1';
                    doneTd.querySelector('span').innerHTML = card
                        .querySelector('span')
                        .textContent.trim();
                    break;
                }
            }
            if (!rowFound) {
                const tr = createRow();
                table.appendChild(tr);
                tr.querySelector('.done-td').style.opacity = '1';
                tr.querySelector('.done-td').querySelector('span').innerHTML =
                    card.querySelector('span').textContent.trim();
            }
            deleteCard(e, true);
        }
    }
}

function createRow() {
    const tr = document.createElement('tr');
    const todoTd = document.createElement('td');
    todoTd.classList.add('todo-td');
    const doingTd = document.createElement('td');
    doingTd.classList.add('doing-td');
    const doneTd = document.createElement('td');
    doneTd.classList.add('done-td');

    const thList = document.querySelectorAll('th');
    const todoColor = thList[0].querySelector('input').value;
    const doingColor = thList[1].querySelector('input').value;
    const doneColor = thList[2].querySelector('input').value;

    todoTd.style.backgroundColor = todoColor;
    doingTd.style.backgroundColor = doingColor;
    doneTd.style.backgroundColor = doneColor;

    tr.appendChild(todoTd);
    tr.appendChild(doingTd);
    tr.appendChild(doneTd);
    for (let i = 0; i < 3; i++) {
        const crossIcon = document.createElement('img');
        crossIcon.src = './media/cross.png';
        crossIcon.alt = 'Cross icon';
        const leftButton = document.createElement('button');
        leftButton.innerHTML = '&#x003C;';
        leftButton.classList.add('move-button');
        leftButton.classList.add('left-button');
        const text = document.createElement('span');
        text.contentEditable = 'true';
        const rightButton = document.createElement('button');
        rightButton.innerHTML = '&#x003E;';
        rightButton.classList.add('move-button');
        rightButton.classList.add('right-button');
        const colorInputWrapper = document.createElement('div');
        colorInputWrapper.classList.add('color-input-wrapper');
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = '#ffe4c480';
        colorInputWrapper.style.backgroundColor = colorInput.value;
        colorInputWrapper.appendChild(colorInput);
        if (i == 0) {
            todoTd.appendChild(crossIcon);
            todoTd.appendChild(leftButton);
            todoTd.appendChild(text);
            todoTd.appendChild(rightButton);
            todoTd.appendChild(colorInputWrapper);
        } else if (i == 1) {
            doingTd.appendChild(crossIcon);
            doingTd.appendChild(leftButton);
            doingTd.appendChild(text);
            doingTd.appendChild(rightButton);
            doingTd.appendChild(colorInputWrapper);
        } else {
            doneTd.appendChild(crossIcon);
            doneTd.appendChild(leftButton);
            doneTd.appendChild(text);
            doneTd.appendChild(rightButton);
            doneTd.appendChild(colorInputWrapper);
        }
    }

    return tr;
}

function storeData() {
    const rows = table.querySelectorAll('tr:not(.tr-head)');
    const thColorsList = trHead.querySelectorAll('th input');
    const thColors = [
        thColorsList[0].value,
        thColorsList[1].value,
        thColorsList[2].value,
    ];
    const data = [];
    data.push(thColors);
    rows.forEach((row) => {
        const cards = row.querySelectorAll('td');
        cards.forEach((card) => {
            data.push({
                class: card.classList[0],
                color: card.style.backgroundColor,
                text: card.querySelector('span').textContent,
                opacity: getComputedStyle(card).opacity,
            });
        });
    });
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('tableData'));
    const thList = trHead.querySelectorAll('th');
    for (let i = 0; i < thList.length; i++) {
        thList[i].querySelector('div').style.backgroundColor = data[0][i];
        thList[i].querySelector('div input').style.backgroundColor = data[0][i];
    }

    for (let i = 0; i < data.length - 1; i++) {
        const row = createRow();
        let shiftIndex = i + 1 + i * 2;
        const todoCard = row.querySelector('.todo-td');
        const doingCard = row.querySelector('.doing-td');
        const doneCard = row.querySelector('.done-td');
        const cards = [todoCard, doingCard, doneCard];
        for (let j = 0; j < cards.length; j++) {
            cards[j].style.opacity = data[shiftIndex + j].opacity;
            cards[j].classList.add(data[shiftIndex + j].class);
            cards[j].style.backgroundColor = data[shiftIndex + j].color;
            cards[j].querySelector('img').style.backgroundColor =
                data[shiftIndex + j].color;
            cards[j]
                .querySelectorAll('button')
                .forEach(
                    (button) =>
                        (button.style.backgroundColor =
                            data[shiftIndex + j].color),
                );
            cards[j].querySelector('span').textContent =
                data[shiftIndex + j].text;
            cards[j].querySelector('div').style.backgroundColor =
                data[shiftIndex + j].color;
            cards[j].querySelector('input').value = data[shiftIndex + j].color;
        }
        table.appendChild(row);
    }
}
