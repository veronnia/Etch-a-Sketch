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
let isRandomMode = false;
let erase = false;

randomButton.addEventListener("click", () => {
    isRandomMode = !isRandomMode;
    selectedColor = null;
    colorInputs.forEach(i => i.classList.remove("selected-color"));
    randomButton.classList.toggle("active");
    erase = false;
});

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

eraserButton.addEventListener("click", () => {
    isRandomMode = false;
    colorInputs.forEach(i => i.classList.remove("selected-color"));
    erase = true;
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
                paintSquare(square);
            });

            square.addEventListener("mouseenter", () => {
                if (isMouseDown) {
                    paintSquare(square);
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
        isRandomMode = false;
        erase = false;
    });
});

colorInputs.forEach(input => {
    input.addEventListener("input", () => {
        selectedColor = input.value; 
        colorInputs.forEach(i => i.classList.remove("selected-color"));
        input.classList.add("selected-color");
        lastSelectedColor = selectedColor;
        isRandomMode = false;
        erase = false;
    });
});

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return null;

    const r = parseInt(result[0]).toString(16).padStart(2, '0');
    const g = parseInt(result[1]).toString(16).padStart(2, '0');
    const b = parseInt(result[2]).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

function darkenColor(hex, percent = 10) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));

    const toHex = x => x.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function handleColor(square) {
    let current = square.style.backgroundColor;

    if (!current || current === "white" || current === "rgb(255, 255, 255)") {
        if (isRandomMode) {
            square.style.backgroundColor = getRandomColor();
        } 
        else square.style.backgroundColor = selectedColor;
        return;
    }

    const currentHex = rgbToHex(current);
    if (!currentHex) return;

    const darker = darkenColor(currentHex, 10);
    square.style.backgroundColor = darker;
}

function paintSquare(square) {
    if (erase) {
        square.style.backgroundColor = "#ffffff";
    }
    else handleColor(square);
}