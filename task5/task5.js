const btnRequest = document.querySelector(".btn-request");
const pageNumber = document.querySelector(".page-number");
const limitNumber = document.querySelector(".limit-number");
const resultDiv = document.querySelector(".result");

function checkNumber(page, limit){
    if (page >= 1 && page <= 10 && limit >= 1 && limit <= 10) {
        resultDiv.innerHTML = "";
        return true;
    }
    if (page < 1 || page > 10) {
        resultDiv.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    } else if (limit < 1 || limit > 10) {
        resultDiv.innerHTML = "Лимит вне диапазона от 1 до 10";
    } else {
        resultDiv.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    }
    return false;
}

function generateRequest(page, limit){
    return `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`;
}

const useRequest = (url) =>{
    return fetch(url)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        return data;
    })
    .catch((error)=>{
        console.log("Обнаружена ошибка: ", error);
    });
}


function createElement(typeElement = "div", attrubute = {}, inner = null, addElements = []) {
    const element = document.createElement(typeElement);
    for (key in attrubute) element.setAttribute(key, attrubute[key]);
    for (el of addElements) element.appendChild(el);
    if (inner) element.innerHTML = inner;
    return element;
}


function showResult(result){ 
    for (r of result){
        imageTag = createElement('img',{'src':r.url});
        divElement = createElement('div',{},null,[imageTag]);
        resultDiv.appendChild(divElement);
    }
}


btnRequest.addEventListener('click', async () => {
    const page = pageNumber.value;
    const limit = limitNumber.value;
    if (checkNumber(page, limit)) {
        result = await useRequest(generateRequest(page, limit));
        showResult(result);
        localStorage.setItem("limit", limit);
        localStorage.setItem("page", page);
    };

});


window.onload = async ()=>{
    const page = localStorage.getItem('page');
    const limit = localStorage.getItem('limit');
    if (checkNumber(page, limit)) {
        result = await useRequest(generateRequest(page, limit));
        showResult(result);
    };
    pageNumber.value = page;
    limitNumber.value = limit;
}

