let slider = document.getElementById("myRange");
let size = 25;
let output = document.getElementById("value");
let progress = document.getElementById("prog");

slider.oninput = function() {
    output.innerHTML = this.value;
    progress.value = slider.value;  
}

