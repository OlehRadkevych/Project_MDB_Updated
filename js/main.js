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
let response = await fetch("https://countriesnow.space/api/v0.1/countries/capital")
    let jsonData = await response.json()


    let countryInArray = new Array();
    for (let i=0; i<jsonData.data.length-1; i++){
    countryInArray[i]= jsonData.data[i].name;
    }

    var list = document.getElementById('datalistOptions');
    countryInArray.forEach(function(item){
       var option = document.createElement('option');
       option.value = item;
       list.appendChild(option);
    });
}

async function searchCapital(a) {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "country": a
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};

let response = await   fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions)
let jsonDataCapital = await  response.json();
    if (jsonDataCapital.error == false) {
        document.getElementById('capitalName').innerHTML = jsonDataCapital.data.capital;
        document.getElementById('countryName').value = jsonDataCapital.data.name
        }
    else ( document.getElementById('capitalName').innerHTML = "Country doesn`t exist")
    }              


buttFind.onclick = function (){
    const country = document.getElementById('countryName').value.trim().toLowerCase(); 
    searchCapital(country);
    buttonStateChange();
    }

buttClear.onclick = function () {
    document.getElementById('capitalName').innerHTML = "";
    document.getElementById('countryName').value = "";
    buttonStateChange();
}