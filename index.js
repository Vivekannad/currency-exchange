let list = countryList;
const dropDowns = document.querySelectorAll('.drop-downs select')
const button = document.getElementById('convert-btn');
const input = document.querySelector('.input-field input');
const renderCurr = document.querySelector('.final-result')
// dropDowns.forEach((val) => {
// const newOption = document.createElement('option');
// for(let code in list){
//     newOption.innerText = code; 
//     console.log(code,list[code])
// };
// val.append(newOption)

// });
// dropDowns.id = 'DROPDOWN'

let url = 'api.frankfurter.app'

for(let select of dropDowns){
    for(let code in list){
        const newOption = document.createElement('option');
        newOption.innerText = code; 
        if(code === 'PKR' && select.id === 'to-select'){
            newOption.selected = 'selected';
            newOption.value = code;
        } else if(code === 'USD' && select.id === 'from-select'){
            newOption.selected = 'selected';
        }
        updateImg(select)
        // console.log(code,list[code])
        select.append(newOption);       
    };
    select.addEventListener('change',(e) => {
        updateImg(e.target);
    })
}

button.addEventListener('click',(e) => {
    e.preventDefault();
    console.log(dropDowns[0].value , dropDowns[1].value)
    apifun();
    // updateCurr()
})

function updateImg (select){
    const code = select.value;
    const countryCode = list[code]
const img = select.parentElement.querySelector('.flag');
const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
img.src = newSrc;
}


const updateCurr = async() => {
    const response = await fetch(`https://${url}/latest?amount=${input.value}&from=${dropDowns[0].value}&to=${dropDowns[1].value}`);
    const Object = await response.json();
    // renderCurr.innerText = data;
    console.log(Object)
}

const apifun = async() => {
    // const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_0t5hqRnSa4bBjRp8gR8EVGPxgxZQjgZt96RyJaOw&currencies=INR,USD`;
    // const fetc = await fetch(url)
    // const conver = await fetc.json();
    // const rate = conver.results.INR.value / conver.results.USD.value;
    // const convertedAmount = amount * rate;
    // console.log(`Converted amount: ${convertedAmount} USD`);
    var myHeaders = new Headers();
    myHeaders.append("apikey", "5lmjnL119m8YzK5RQK0srut7T4uL8Dwa");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      if(!input.value.trim()){
        input.value = 1;
      }
      const currData = await fetch(`https://api.apilayer.com/currency_data/convert?to=${dropDowns[1].value}&from=${dropDowns[0].value}&amount=${input.value}`, requestOptions);
      const response = await currData.json();
      console.log(response);
      console.log(response.result);
      const finalResult = response.result.toFixed(2);
      console.log(finalResult);
      renderCurr.innerText = `${finalResult}  ${dropDowns[1].value}`;
      const sibling = renderCurr.previousElementSibling;
      console.log(sibling);
      sibling.innerText = `${input.value}  ${dropDowns[0].value}`
      // .then(response => response.text()).then(final => {
        //     console.log(final)
        // })
}
window.addEventListener('load',() => {
    input.value = 1;
    apifun()
})


 