function pageOnload(){
    arrayCountries();
    buttClear.disabled=true;
    buttFind.disabled = false;
}

function buttonStateChangeEvent(){
buttClear.disabled=true;
buttFind.disabled = false;
document.getElementById('capitalName').innerHTML = "";
}

function buttonStateChange(){
    if (buttClear.disabled ==true){
        buttClear.disabled = false;
    }
     else buttClear.disabled = true;

    if (buttFind.disabled = true){
        buttFind.disabled = false;
    }
    else buttFind.disabled = true;  
}


const input = document.querySelector('input');
input.addEventListener('change', buttonStateChangeEvent);

async function arrayCountries() {
// Кунули запит на API 
let response = await fetch("https://countriesnow.space/api/v0.1/countries/capital")
// Отримали відповідь
    let jsonData = await response.json()

// Перенесли дані з API відповіді в масив за допомогою циклу
    let countryInArray = new Array();
    for (let i=0; i<jsonData.data.length-1; i++){
    countryInArray[i]= jsonData.data[i].name;
    }
// Створили даталист із даних в масиві
    var list = document.getElementById('datalistOptions');
    countryInArray.forEach(function(item){
       var option = document.createElement('option');
       option.value = item;
       list.appendChild(option);
    });
}

async function searchCapital(a) {
// Кунули запит на API 
    let response = await fetch("https://countriesnow.space/api/v0.1/countries/capital")
// Отримали відповідь
    let jsonData = await response.json()

// Запустили цикл для перевірки   
    for (let i=0; i<jsonData.data.length-1; i++){
        if (a == jsonData.data[i].name){
// Якщо тру то присвоюємо значення і показуємо результат
            let capital = jsonData.data[i].capital;
            document.getElementById('capitalName').innerHTML = capital;
            break;
            }
// Якщо фолс видаємо текст що такої країни не існує
        else (document.getElementById('capitalName').innerHTML = "Country doesn`t exist")    
    }
        
}

buttFind.onclick = function () {
    // .trim() = ігнор пробілів перед і після значення
    const country = document.getElementById('countryName').value.trim();
     
    //TODO: пофіксити форматування для країн з 2+ слів
    // Форматування тексту відповідно до формату даних.
    // const countryDebug = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
    // console.log(countryDebug);
    
    searchCapital(country);
    buttonStateChange();
    }

buttClear.onclick = function () {
    document.getElementById('capitalName').innerHTML = "";
    document.getElementById('countryName').value = "";
    buttonStateChange();
}