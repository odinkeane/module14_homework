const resultDiv = document.querySelector('.result');
const btnSend = document.querySelector('.send');
const URL = "https://dummyimage.com/";

function checkNumber(number){
    return (Number.isFinite(number) &&  number >=100 && number <=300);
}


const useRequest = (url, width, height)=>{
    return fetch(`${url}${width}x${height}`)
    .then((res)=>{
        return res.url;
    })
    // .then((url)=>{
    //     showResult(url);
    // })
    .catch((error)=>{
        console.log(`Ошибка ${error}`);
    });
}

const showResult = (url)=>{
    resultDiv.innerHTML = ``;
    const resultImage = document.createElement('img');
    resultImage.setAttribute('src',url);
    resultDiv.appendChild(resultImage);
}




btnSend.addEventListener('click', async ()=>{
    const width = Number(document.querySelector('.width').value);
    const height = Number(document.querySelector('.height').value);
    if (checkNumber(width) && checkNumber(height)){
        const url = await useRequest(URL, Math.floor(width), Math.floor(height));
        showResult(url);
    } else {
        resultDiv.innerHTML = "одно из чисел вне диапазона от 100 до 300";
    }


});