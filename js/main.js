const billInput = document.querySelector('.bill-input');
const peopleInput = document.querySelector('.people-input');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const resetButton = document.querySelector('.reset');
const billErr = document.querySelector('.bill-error');
const pplErr = document.querySelector('.people-error');
const tipBtn = document.querySelectorAll('.tip');
const custom = document.querySelector('.custom');

let bill = 0, ppl = 1, tipPercentage = 0;

resetValues();
tipBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("selected")) {
            tipPercentage = 0;
            btn.classList.remove("selected");
            btn.classList.add("unselected")
        } else {
            tipBtn.forEach(e => {
                e.classList.remove("selected");
            })
            tipPercentage = btn.value;
            btn.classList.remove("unselected");
            btn.classList.add("selected")
        }
        calculation();
    })
});

resetButton.addEventListener("click", resetValues);

custom.addEventListener("input", () => {
    if (custom.value >= 0) {
        tipBtn.forEach(e => {
            e.classList.remove("selected");
        })
        tipPercentage = custom.value;
        calculation();
    }
});

billInput.addEventListener("input", () => {
    bill = Number(billInput.value);

    if (bill <= 0 && bill != "") {
        billInput.classList.add("error");
        billErr.style.visibility = "visible";
    } else {
        billInput.classList.remove("error");
        billErr.style.visibility = "hidden";
        calculation();
    }
})

peopleInput.addEventListener("input", () => {
    ppl = peopleInput.value;
    if (ppl <= 0 && ppl != "") {
        peopleInput.classList.add("error");
        pplErr.style.visibility = "visible";
    } else {
        peopleInput.classList.remove("error");
        pplErr.style.visibility = "hidden";
        calculation();
    }
});
function calculation() {
    if (bill >= 0 && ppl >= 1) {
        let tip = (tipPercentage * bill) / (100);
        let totalAmt = bill + tip;
        tipAmount.innerHTML = `$${((tip) / (ppl)).toFixed(2)}`;
        totalAmount.innerHTML = `$${((totalAmt) / (ppl)).toFixed(2)}`;
        resetButton.style.opacity = "1";
    }
}

function resetValues() {
    bill.value = "";
    peopleInput.value = 1;
    tipAmount.innerHTML = '$0.00';
    totalAmount.innerHTML = '$0.00'

    tipBtn.forEach(e => {
        e.classList.remove("selected");
        e.classList.add("unselected");
    })
    resetButton.style.opacity = "0.2";
}