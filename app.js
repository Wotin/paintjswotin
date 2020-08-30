// js 에서 css 수정하려면 getElementById 로 가져와야 함.

const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const fill_btn = document.getElementById("jsMode");
const save_btn = document.getElementById("jsSave");
const current_color = document.getElementById("current_color")
const current_color_text = document.getElementById("current_color_text")
const eraser_btn = document.getElementById("eraser_canvas_btn")

const INITIAL_COLOR = "2c2c2c"
const CANVAS_SIZE = 700

let modeFill = false

let color = ""

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillSTyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!modeFill){
        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function handleColorClick(event) {
    color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color
    current_color.style.backgroundColor = color
    current_color_text.innerHTML = "CURRENT_COLOR : " + color
    console.log(color)
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value
    console.log(event.target.value)
}

function clickedFillBtn(event) {
    if(modeFill) {
        fill_btn.innerText = "Fill"
    } else {
        fill_btn.innerText = "PAINT"
    }
    modeFill = !modeFill
}

function clickedCanvas(event) {
    if(modeFill) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleCM(event) {
    event.preventDefault()
}

function clickedSaveBtn(event) {
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = "PaintJSWotin"
    link.click()
}

function clickedEraser(event) {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.fillStyle = color
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", clickedCanvas)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(fill_btn){
    fill_btn.addEventListener("click", clickedFillBtn)
}

if(save_btn) {
    save_btn.addEventListener("click", clickedSaveBtn)
}

if(eraser_btn) {
    eraser_btn.addEventListener("click", clickedEraser)
}