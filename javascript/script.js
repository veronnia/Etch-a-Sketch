const sketch = document.querySelector('.grd');
let slider = document.getElementById("myRange");
let size = 25;
let output = document.getElementById("value");
let progress = document.getElementById("prog");

slider.oninput = function() {
    output.value = this.value;
    progress.value = slider.value;  
    deleteGrid();
    createGrid(this.value);  
}

output.oninput = function() {
    if (this.value > 100) {
        this.value = 100;
        progress.value = this.value;
        slider.value = this.value;
        deleteGrid();
        createGrid(this.value);
    }
    else if (this.value < 1) { 
        progress.value = this.value;
        slider.value = 1;
        deleteGrid();
        createGrid(1);
    }
    else {
        progress.value = this.value;
        slider.value = this.value;
        deleteGrid();
        createGrid(this.value);
    }
}

createGrid(size);

let squares = document.querySelectorAll('.squares');

function createGrid(size) {
    let area = 500 / size;

    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            let square = document.createElement("div");
            square.classList.add('squares');
            square.style.width = `${area}px`;
            square.style.height = `${area}px`;
            console.log("hi");
            
            sketch.append(square);
        }
    }
}

function deleteGrid() {
    while (sketch.firstChild) {
        sketch.lastChild = null;
        sketch.removeChild(sketch.lastChild);
    }
}

output.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
});