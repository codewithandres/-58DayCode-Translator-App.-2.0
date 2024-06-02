// Importamos los lenguajes desde el archivo "lenguages.js"
import { languages } from "./lenguages.js";

// Seleccionamos los elementos del DOM necesarios
const dropdowms = document.querySelectorAll('.dropdowm-container'),
    inputLeneguageDropdowm = document.querySelector('#input-language'),
    ouputLeneguageDropdowm = document.querySelector('#output-language');

// Función para llenar los menús desplegables con las opciones de idiomas
const populateDropdowm = (dropdowm, options) => {
    // Limpiamos el contenido anterior del menú desplegable
    dropdowm.querySelector('ul').innerHTML = '';

    // Iteramos sobre cada opción de idioma
    options.forEach(option => {
        // Creamos un nuevo elemento de lista (li)
        const li = document.createElement('li');
        // Definimos el título de la opción como el nombre del idioma y su nombre nativo
        const title = `${option.name}(${option.native})`;

        // Asignamos el título al elemento de lista y establecemos su valor de datos como el código del idioma
        li.innerHTML = title;
        li.dataset.value = option.code;
        // Añadimos la clase 'option' al elemento de lista
        li.classList.add('option');
        // Añadimos el elemento de lista al menú desplegable
        dropdowm.querySelector('ul').appendChild(li);
    });
};

// Llenamos los menús desplegables con las opciones de idiomas
populateDropdowm(inputLeneguageDropdowm, languages);
populateDropdowm(ouputLeneguageDropdowm, languages);

// Añadimos eventos de clic a cada menú desplegable
dropdowms.forEach(dropdowm => {
    // Al hacer clic en un menú desplegable, alternamos la clase 'active'
    dropdowm.addEventListener('click', event => {
        dropdowm.classList.toggle('active');
    });

    // Añadimos eventos de clic a cada opción del menú desplegable
    dropdowm.querySelectorAll('.option').forEach(item => {
        item.addEventListener('click', event => {
            // Eliminamos la clase 'active' de las otras opciones
            dropdowm.querySelectorAll('.option').forEach(item => {
                item.classList.remove('active');
            });
            // Añadimos la clase 'active' a la opción clicada
            item.classList.add('active');
            // Actualizamos el valor seleccionado en el menú desplegable
            const selected = dropdowm.querySelector('.selected');
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;
            // Llamamos a la función de traducción
            translate();
        });
    });
});

// Añadimos un evento de clic al documento para cerrar los menús desplegables cuando se hace clic fuera de ellos
document.addEventListener('click', event => {
    dropdowms.forEach(dropdowm => {
        if (!dropdowm.contains(event.target))
            dropdowm.classList.remove('active');
    });
});

// Función para traducir el texto
const translate = async () => {
    // Obtenemos el texto de entrada y los códigos de idioma de entrada y salida
    const inputText = inputTextElemet.value;
    const inputLaguage = inputLeneguageDropdowm.querySelector('.selected').dataset.value;
    const outputLanguage = ouputLeneguageDropdowm.querySelector('.selected').dataset.value;
    // Construimos la URL de la API de traducción
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLaguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
        inputText
    )}`;

    // Hacemos una petición a la API de traducción
    fetch(url)
        .then(response => response.json())
        .then(json => {
            // Actualizamos el texto de salida con la traducción obtenida
            ouputTextElement.value = json[0].map(item => item[0]).join('');
        })
        .catch(error => console.log(error));
};

// Añadimos un evento de entrada al elemento de texto de entrada para llamar a la función de traducción cuando cambia el texto de entrada
inputTextElemet.addEventListener('input', event => {
    if (inputTextElemet.value.length > 500) {
        inputTextElemet.value = inputTextElemet.value.slice(0, 500);
    }
    translate();
});

// Añadimos un evento de clic al botón de intercambio para intercambiar los idiomas de entrada y salida y los textos de entrada y salida
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

// Añadimos un evento de cambio al botón de modo oscuro para alternar el modo oscuro
darkModeBtn.addEventListener('change', () => {
    console.log('click');
    document.body.classList.toggle('dark');
});
