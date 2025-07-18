const sketch = document.querySelector('.grd');
let slider = document.getElementById("myRange");
let size = 16;
let output = document.getElementById("value");
let progress = document.getElementById("prog");
let selectedColor = null;
let lastSelectedColor = null;
const colorInputs = document.querySelectorAll("#color-inputs input[type='color']");
let isMouseDown = false;
document.body.addEventListener("mousedown", () => isMouseDown = true);
document.body.addEventListener("mouseup", () => isMouseDown = false);
let randomButton = document.getElementById("random");
let eraserButton = document.getElementById("eraser");
let clearButton = document.getElementById("clear");

eraserButton.addEventListener("click", () => {
    selectedColor = "#ffffff";
    colorInputs.forEach(i => i.classList.remove("selected-color"));
});

clearButton.addEventListener("click", () => {
    selectedColor = null;
    colorInputs.forEach(i => i.classList.remove("selected-color"));
    deleteGrid();
    createGrid(size);
});
 
slider.oninput = function() {
    output.value = this.value;
    progress.value = slider.value;  
    size = this.value;
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
        size = this.value;
    }
    else if (this.value < 1) { 
        progress.value = this.value;
        slider.value = 1;
        deleteGrid();
        createGrid(1);
        size = this.value;
    }
    else {
        progress.value = this.value;
        slider.value = this.value;
        deleteGrid();
        createGrid(this.value);
        size = this.value;
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

            square.addEventListener("mousedown", () => {
                if (selectedColor) {
                    square.style.backgroundColor = selectedColor;
                }
            });

            square.addEventListener("mouseenter", () => {
                if (isMouseDown && selectedColor) {
                    square.style.backgroundColor = selectedColor;
                }
            });
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

colorInputs.forEach(input => {
    input.addEventListener("click", () => {
        selectedColor = input.value; 
        colorInputs.forEach(i => i.classList.remove("selected-color"));
        input.classList.add("selected-color");
        lastSelectedColor = selectedColor;
    });
});

colorInputs.forEach(input => {
    input.addEventListener("input", () => {
        selectedColor = input.value; 
        colorInputs.forEach(i => i.classList.remove("selected-color"));
        input.classList.add("selected-color");
        lastSelectedColor = selectedColor;
    });
});
