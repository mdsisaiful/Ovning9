// element.addEventListener(event, function, useCapture);

document.getElementById("startButton").addEventListener("click", function () {
    showResult();
});

// document.getElementsByClassName(form-group).addEventListener("click", function () {
//     showResult();
// });

function showResult(){
    
    outputText.value = "";

    for(var i = 1; i <= endNum.value; i++){
        if(i % bishNum.value == 0 & i % boshNum.value == 0){
            outputText.value += "Bish-Bosh" + "\n";
        }
        else if(i % bishNum.value == 0){
            outputText.value += "Bish" + "\n";
        }
        else if(i % boshNum.value == 0){
            outputText.value += "Bosh" + "\n";
        }
        else{
            outputText.value += i + "\n";
        }
    }
}

