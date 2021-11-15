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
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "country": a
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions)
.then(response => response.json())
.then(result => document.getElementById('capitalName').innerHTML = result.data.capital)
.catch(error => console.log('error', error));
            
        
}

buttFind.onclick = function (){
    // .trim() = ігнор пробілів перед і після значення
    const country = document.getElementById('countryName').value.trim().toLowerCase(); 
    searchCapital(country);
    buttonStateChange();
    }

buttClear.onclick = function () {
    document.getElementById('capitalName').innerHTML = "";
    document.getElementById('countryName').value = "";
    buttonStateChange();
}