const task3 = document.querySelector(".task3");
const resultSection = document.querySelector(".result");
const task3Plus = document.querySelector(".task3-plus");
const task3Minus = document.querySelector(".task3-minus");


const METHOD = "GET";
const URL = "https://jsonplaceholder.typicode.com/photos?_limit=";

function checkNumber(value) {
    return (value >= 1 && value <= 10) ? true : false;
}

function connection(url, method, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log(`stauts: ${xhr.status}`)
        }
        else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    }
    xhr.onerror = () => {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    }

    xhr.send();
}


function createElement(typeElement = "div", attrubute = {}, inner = null, addElements = []) {
    const element = document.createElement(typeElement);
    for (key in attrubute) element.setAttribute(key, attrubute[key]);
    for (el of addElements) element.appendChild(el);
    if (inner) element.innerHTML = inner;
    return element;
}

function createCardElement(url, title) {
    const imageTag = createElement("img", { "src": url, 'class':'card-image' });
    const titleTag = createElement("h2", {'class':'card-text'}, title);
    const cardElement = createElement("div", {'class':'card'}, null, [imageTag, titleTag]);
    return cardElement;
}


function showResult(result) {
    resultSection.innerHTML = "";
    for (res of result) {
        resultSection.appendChild(createCardElement(res.url, res.title));
    }
}

function changeShowElements() {
    if (checkNumber(task3.value)) {
        connection(URL + task3.value, METHOD, showResult);
    }
    else {
        resultSection.innerHTML = "No elements here...";
    }
}

task3.addEventListener('input', changeShowElements);

task3Plus.addEventListener('click', () => {
    task3.value = Number(task3.value) + 1;
    changeShowElements();
})
task3Minus.addEventListener('click', () => {
    task3.value = Number(task3.value) - 1;
    changeShowElements();
})