import { languages } from "./lenguages.js";

const dropdowms = document.querySelectorAll('.ropdowm-container'),
    inputLeneguageDropdowm = document.querySelector('#input-language'),
    ouputLeneguageDropdowm = document.querySelector('#output-language');

const populateDropdowm = (dropdowm, options) => {
    dropdowm.querySelector('ul').innerHTML = '';

    options.forEach(option => {

        const li = document.createElement('li');
        const title = `${option.name}(${option.native})`;

        li.innerHTML = title;
        li.dataset.value = option.code;
        li.classList.add('option');
        dropdowm.querySelector('ul').appendChild(li);
    });
};

populateDropdowm(inputLeneguageDropdowm, languages);
populateDropdowm(ouputLeneguageDropdowm, languages);


