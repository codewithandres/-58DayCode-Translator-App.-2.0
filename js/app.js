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
            const selected = dropdowm.querySelector('.selected');
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;
            translate();
        });
    });
});

document.addEventListener('click', event => {
    dropdowms.forEach(dropdowm => {

        if (!dropdowm.contains(event.target))
            dropdowm.classList.remove('active');
    });
});

// fuction to translate text
const inputTextElemet = document.querySelector('#input-text');
const ouputTextElement = document.querySelector('#output-text');
const inputLanguage = inputLeneguageDropdowm.querySelector('.selected');
const outputLanguage = ouputLeneguageDropdowm.querySelector('.selected');
const swapBtn = document.querySelector('.swap-position');

const translate = async () => {
    const inputText = inputTextElemet.value;
    const inputLaguage = inputLeneguageDropdowm.querySelector('.selected').dataset.value;
    const outputLanguage = ouputLeneguageDropdowm.querySelector('.selected').dataset.value;
    //api Url 
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLaguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
        inputText
    )}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            ouputTextElement.value = json[0].map(item => item[0]).join('');
        })
        .catch(error => console.log(error));
};

inputTextElemet.addEventListener('input', event => {
    if (inputTextElemet.value.length > 500) {
        inputTextElemet.value = inputTextElemet.value.slice(0, 500);
    }
    translate();
});

swapBtn.addEventListener('click', event => {
    const temp = inputLanguage.innerHTML;
    inputLanguage.innerHTML = outputLanguage.innerHTML;
    outputLanguage.innerHTML = temp;

    const tempValue = inputLanguage.dataset.value;
    inputLanguage.dataset.value = outputLanguage.dataset.value;
    outputLanguage.dataset.value = tempValue;

    const tempInputText = inputTextElemet.value;
    inputTextElemet.value = ouputTextElement.value;
    ouputTextElement.value = tempInputText;

    translate();
});

const uploadDocument = document.querySelector('#upload-document'),
    uploadTitle = document.querySelector('#upload-title');

uploadDocument.addEventListener('change', event => {
    const file = event.target.files[0];

    if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'text/plain') {
        uploadTitle.innerHTML = file.name;

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = event => {
            inputTextElemet.value = event.target.result;
            translate();
        };
    } else {
        alert('Please selected a valid file');
    };
});

const downloadDocument = document.querySelector('#dowmload-document');

downloadDocument.addEventListener('click', event => {
    const outputText = ouputTextElement.value;
    const outputLenguage = ouputLeneguageDropdowm.querySelector('.selected').innerHTML;

    if (outputText) {
        const blob = new Blob([outputText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.download = `translated-to-${outputLenguage}.txt`;
        a.href = url;
        a.click();
    };
});

const inputChars = document.querySelector('#input-chart');

inputTextElemet.addEventListener('input', event => {
    inputChars.innerHTML = event.target.value.length;
});

const darkModeBtn = document.querySelector('.dark-mode-btn');

darkModeBtn.addEventListener('change', () => {
    console.log('click');
    document.body.classList.toggle('dark');
});