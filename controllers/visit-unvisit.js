'use strict';

const fetch = require('node-fetch');

// const generate = require('./listCreator');

const visitButton = document.getElementsByClassName('place__visited_checkbox');
Array.prototype.slice.call(visitButton, 0);

const visit = async (values) => {
    return await fetch('https://webdev-task-2-dylksngchm.now.sh/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'plain/text' },
        body: values
    });
};

Array.prototype.forEach.call(visitButton, (button, index) => {
    button.addEventListener('click', () => {
        const name = document.getElementsByClassName('place__name')[index].value;
        const isVisited = Boolean(button.checked);

        const newList = visit({ name, isVisited });

        Array.prototype.forEach.call(newList, place => {
            generate(place);
        });
    });
});

function generate({ name, description, created, isVisited }) {
    let list = document.getElementsByClassName('list')[0];

    let hr = document.createElement('hr');
    hr.className = 'hr-small';
    list.appendChild(hr);

    const listLength = list.childElementCount;
    let newPLace = document.createElement('section');
    newPLace.className = 'place';
    newPLace.innerHTML = `<div class="place__title">
        <input type="image" src="/pics/edit.svg" alt="" class="place__edit">
        <input type="image" src="/pics/delete.svg" alt="" class="place__delete">
        <div class="place__name">${name}</div>
        <input type="text" class="place__name_edit" name="nameEdit">
        <input type="image" src="/pics/cancel.svg" alt="" class="place__edit_cancel">
        <input type="image" src="/pics/accept.svg" alt="" class="place__edit_accept">
    </div>
    <div class="place__description">${description}</div>
    <div class="place__create-date">
        <div>Добавлено</div>
        <div>${created}</div>
    </div>
    <input type="checkbox" name="isVisit"
    id="visit_checkbox_${listLength}" class="place__visited_checkbox">
    <label for="visit_checkbox_${listLength}" class="place__visited">`;
    list.appendChild(newPLace);

    if (isVisited) {
        const inputIdStr = 'visit_checkbox_' + listLength;
        document.getElementById(inputIdStr).checked = true;
    }
}