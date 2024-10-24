const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_code) {
        // selecting USD by default as FROM currency
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i ==1){
            selected = currency_code == "USD" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e=>{
      loadFlag(e.target); // Calling LoadFlag with passing target element as an argument
    });

}

function loadFlag(element) {
    // Ensure country_code is properly structured (as a map of currency to country code)
    for (let code in country_code) {
        if (code === element.value) {
            let imgTag = element.parentElement.querySelector("img"); // Select the img tag inside the dropdown container
            
            if (imgTag) {  // Check if img tag exists to avoid errors
                // Construct the flag URL using the corresponding country code
                imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
            } else {
                console.error("Image tag not found in the parent element.");
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    const getButton = document.querySelector("button");
    getButton.addEventListener("click", (e) => {
        e.preventDefault(); // Correct spelling of preventDefault
        getExchangeRate(fromCurrency, toCurrency);
        getExchangeRate();
    });

    const exchangeIcon = document.querySelector(".drop-list .icon");
    exchangeIcon.addEventListener("click", () => {
        let tempCode = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = tempCode;        
         
        loadFlag(fromCurrency);
        loadFlag(toCurrency);
         getExchangeRate();
    
       
    });
    

    function getExchangeRate(fromCurrency, toCurrency) {
        const amount = document.querySelector(".amount input");
         exchangeRateTxt = document.querySelector(".exchange-rate");

        let amountVal = amount.value;

        if (amountVal === "" || amountVal === "0") {
            amount.value = "1";
            amountVal = 1;
        }

        const fromCurrencyValue = fromCurrency.value; // Fetching the actual currency value
        const toCurrencyValue = toCurrency.value;

        exchangeRateTxt.innerText = "Getting exchange Rate...";

        const url = `https://v6.exchangerate-api.com/v6/ecd216ed0831c88bb49b591d/latest/${fromCurrencyValue}`;
        
        // Fetch the exchange rate data
        fetch(url).then(response => response.json()).then(result => {
                let exchangeRate = result.conversion_rates[toCurrencyValue];
               let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
               exchangeRateTxt.innerText = `${amountVal} ${fromCurrencyValue} = ${totalExchangeRate} ${toCurrencyValue}`;
                // Process the response
            })
            .catch(error => {
                console.error("Error fetching exchange rates:", error);
            });
    }
});



