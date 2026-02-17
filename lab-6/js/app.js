import { Ajax } from './ajax.js';
import { Options } from './options.js';

// Selects, inputs and buttons
const refreshButton = document.querySelector('#refresh-button');
const successRequestButton = document.querySelector('#success-button');
const errorRequestButton = document.querySelector('#error-button');
const methodSelect = document.querySelector('#http-select');
const dataSelect = document.querySelector('#endpoint-select');
const timeoutInput = document.querySelector('#timeout-input');
const inputs = document.querySelectorAll('.select');

// Inputs to switch between while selecting method

// Resource title
const titleContainer = document.createElement('div');
titleContainer.classList.add('select');
titleContainer.classList.add('switch-input');
const titleLabel = document.createElement('label');
titleLabel.for = 'title-input';
titleLabel.innerHTML = 'Enter resourse title';
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.name = 'title-input';
titleInput.id = 'title-input';
titleInput.placeholder = "'foo' for example";
titleContainer.appendChild(titleLabel);
titleLabel.after(titleInput);

// Resource body
const bodyContainer = document.createElement('div');
bodyContainer.classList.add('select');
bodyContainer.classList.add('switch-input');
const bodyLabel = document.createElement('label');
bodyLabel.for = 'body-input';
bodyLabel.innerHTML = 'Enter resource body';
const bodyInput = document.createElement('input');
bodyInput.type = 'text';
bodyInput.name = 'body-input';
bodyInput.id = 'body-input';
bodyInput.placeholder = "'bar' for example";
bodyContainer.appendChild(bodyLabel);
bodyLabel.after(bodyInput);

// Resource user ID
const userIdContainer = document.createElement('div');
userIdContainer.classList.add('select');
userIdContainer.classList.add('switch-input');
const userIdLabel = document.createElement('label');
userIdLabel.for = 'user-id-input';
userIdLabel.innerHTML = 'Enter user ID';
const userIdInput = document.createElement('input');
userIdInput.type = 'number';
userIdInput.name = 'user-id-input';
userIdInput.id = 'user-id-input';
userIdInput.placeholder = 'Enter value from 1 to 1000';
userIdInput.min = '1';
userIdInput.max = '1000';
userIdContainer.appendChild(userIdLabel);
userIdLabel.after(userIdInput);

// Resource ID
const resourceIdContainer = document.createElement('div');
resourceIdContainer.classList.add('select');
resourceIdContainer.classList.add('switch-input');
const resourceIdLabel = document.createElement('label');
resourceIdLabel.for = 'resourse-id-input';
resourceIdLabel.innerHTML = 'Enter resource ID';
const resourceIdInput = document.createElement('input');
resourceIdInput.type = 'number';
resourceIdInput.name = 'resourse-id-input';
resourceIdInput.id = 'resourse-id-input';
resourceIdInput.placeholder = 'Enter value from 1 to 1000';
resourceIdInput.min = '1';
resourceIdInput.max = '1000';
resourceIdContainer.appendChild(resourceIdLabel);
resourceIdLabel.after(resourceIdInput);

inputs[0].after(resourceIdContainer);

refreshButton.addEventListener('click', () => {
    const switchInputs = document.querySelectorAll('.switch-input');
    if (switchInputs) switchInputs.forEach((e) => e.remove());
    methodSelect.value = 'get';
    dataSelect.value = 'posts';
    timeoutInput.value = '';
    location.reload();
});

successRequestButton.addEventListener('click', async () => {
    const resourceId = document.querySelector('#resourse-id-input')?.value;
    const cards = document.querySelectorAll('.fetch-results-card');
    cards.forEach((e) => e.remove());
    if (methodSelect.value == 'get') {
        const options = new Options();
        options.method = 'GET';
        options.baseURL = 'https://jsonplaceholder.typicode.com/';
        options.headers = null;
        options.body = null;
        options.defaultTimeout = timeoutInput.value * 1000;

        const ajax = new Ajax(options);

        const result = await ajax.get(
            dataSelect.value + '/' + resourceId,
            options,
        );

        if (Array.isArray(result)) {
            for (let i = 0; i < result.length; i++) {
                const card = document.createElement('div');
                card.classList.add('fetch-results-card');

                const pUserId = document.createElement('p');
                pUserId.innerHTML = `User ID: ${result[i].userId}`;
                const pId = document.createElement('p');
                pId.innerHTML = `Resource ID: ${result[i].id}`;
                const pTitle = document.createElement('p');
                pTitle.innerHTML = `Title: ${result[i].title}`;
                const pBody = document.createElement('p');
                pBody.innerHTML = `Body: ${result[i].body}`;
                card.appendChild(pUserId);
                card.appendChild(pId);
                card.appendChild(pTitle);
                card.appendChild(pBody);

                const cardsContainer = document.querySelector('.fetch-results');
                cardsContainer.appendChild(card);
            }
        } else {
            const card = document.createElement('div');
            card.classList.add('fetch-results-card');

            const pUserId = document.createElement('p');
            pUserId.innerHTML = `User ID: ${result.userId}`;
            const pId = document.createElement('p');
            pId.innerHTML = `Resource ID: ${result.id}`;
            const pTitle = document.createElement('p');
            pTitle.innerHTML = `Title: ${result.title}`;
            const pBody = document.createElement('p');
            pBody.innerHTML = `Body: ${result.body}`;
            card.appendChild(pUserId);
            card.appendChild(pId);
            card.appendChild(pTitle);
            card.appendChild(pBody);

            const cardsContainer = document.querySelector('.fetch-results');
            cardsContainer.appendChild(card);
        }
    } else if (methodSelect.value == 'post') {
        const titleInput = document.querySelector('#title-input');
        const bodyInput = document.querySelector('#body-input');
        const userIdInput = document.querySelector('#user-id-input');

        const options = new Options();
        options.method = 'POST';
        options.baseURL = 'https://jsonplaceholder.typicode.com/';
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
        options.body = {
            title: titleInput.value,
            body: bodyInput.value,
            userId: userIdInput.value,
        };
        options.defaultTimeout = timeoutInput.value * 1000;

        const ajax = new Ajax(options);

        const result = await ajax.post(dataSelect.value, options.body, options);
        createSingleCard(result);
    } else if (methodSelect.value == 'put') {
        const titleInput = document.querySelector('#title-input');
        const bodyInput = document.querySelector('#body-input');
        const userIdInput = document.querySelector('#user-id-input');

        const options = new Options();
        options.method = 'PUT';
        options.baseURL = 'https://jsonplaceholder.typicode.com/';
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
        options.body = {
            title: titleInput.value,
            body: bodyInput.value,
            userId: userIdInput.value,
        };
        options.defaultTimeout = timeoutInput.value * 1000;

        const ajax = new Ajax(options);

        const result = await ajax.put(
            dataSelect.value + '/' + resourceId,
            options.body,
            options,
        );
        createSingleCard(result);
    } else {
        const options = new Options();
        options.method = 'DELETE';
        options.baseURL = 'https://jsonplaceholder.typicode.com/';
        options.headers = null;
        options.body = null;
        options.defaultTimeout = timeoutInput.value * 1000;

        const ajax = new Ajax(options);

        const result = await ajax.delete(
            dataSelect.value + '/' + resourceId,
            options,
        );
        createSingleCard(result, options, true);
    }
});

methodSelect.addEventListener('change', switchInputFields);

function switchInputFields(e) {
    const switchInputs = document.querySelectorAll('.switch-input');
    if (switchInputs) switchInputs.forEach((e) => e.remove());
    if (e.target.value == 'get' || e.target.value == 'delete') {
        inputs[0].after(resourceIdContainer);
    }
    if (e.target.value == 'post') {
        inputs[0].after(titleContainer);
        titleContainer.after(bodyContainer);
        bodyContainer.after(userIdContainer);
    }
    if (e.target.value == 'put') {
        inputs[0].after(resourceIdContainer);
        resourceIdContainer.after(titleContainer);
        titleContainer.after(bodyContainer);
        bodyContainer.after(userIdContainer);
    }
}

function createSingleCard(result, isDelete = false) {
    const card = document.createElement('div');
    card.classList.add('fetch-results-card');
    if (isDelete) {
        const deleteResult = document.createElement('p');
        deleteResult.innerHTML = 'Resource successfully deleted';
        card.appendChild(deleteResult);
    } else {
        const pUserId = document.createElement('p');
        pUserId.innerHTML = `User ID: ${result.userId}`;
        const pId = document.createElement('p');
        pId.innerHTML = `Resource ID: ${result.id}`;
        const pTitle = document.createElement('p');
        pTitle.innerHTML = `Title: ${result.title}`;
        const pBody = document.createElement('p');
        pBody.innerHTML = `Body: ${result.body}`;
        card.appendChild(pUserId);
        card.appendChild(pId);
        card.appendChild(pTitle);
        card.appendChild(pBody);
    }
    const cardsContainer = document.querySelector('.fetch-results');
    cardsContainer.appendChild(card);
}

errorRequestButton.addEventListener('click', async () => {
    const resourceId = document.querySelector('#resourse-id-input')?.value;
    const cards = document.querySelectorAll('.fetch-results-card');
    cards.forEach((e) => e.remove());
    const options = new Options();
    options.method = 'GET';
    options.baseURL = 'https://jsonplaceholder.typicode.com/users';
    options.headers = null;
    options.body = null;
    options.defaultTimeout = timeoutInput.value * 1000;

    const ajax = new Ajax(options);

    const result = await ajax.get('/' + 13, options);
});
