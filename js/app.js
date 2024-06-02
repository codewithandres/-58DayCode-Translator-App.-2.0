import { languages } from "./lenguages.js";

const dropdowms = document.querySelectorAll('.dropdowm-container'),
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


dropdowms.forEach(dropdowm => {

    dropdowm.addEventListener('click', event => {
        dropdowm.classList.toggle('active');
    });

    dropdowm.querySelectorAll('.option').forEach(item => {
        item.addEventListener('click', event => {
            //   remove active from other options
            dropdowm.querySelectorAll('.option').forEach(item => {
                item.classList.remove('active');
            });
            // add active to cliked
            item.classList.add('active');
        });
    });
});

document.addEventListener('click', event => {
    dropdowms.forEach(dropdowm => {

        if (!dropdowm.contains(event.target))
            dropdowm.classList.remove('active');
    });
});