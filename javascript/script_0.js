const sketch = document.querySelector('.grd');
let slider = document.getElementById("myRange");
let size = 25;
let output = document.getElementById("value");
let progress = document.getElementById("prog");

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

slider.oninput = function() {
    output.innerHTML = this.value;
    progress.value = slider.value;  
        deleteGrid();
        createGrid(this.value);
}

function deleteGrid() {
    while (sketch.firstChild) {
        sketch.lastChild = null;
        sketch.removeChild(sketch.lastChild);
    }
}
