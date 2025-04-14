// ###################################  rincon declarativo global #########################################
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let mouseDown = false;
let lapiz = null;


// ##############################################################################################

//  dibujar el canvas 
function dibujarCanvas() {
   ctx.beginPath();
   ctx.fillStyle = 'pink'; // Fondo
   ctx.fillRect(0, 0, canvasWidth, canvasHeight);
   ctx.closePath();
}


// ####################################################################################################

// Eventos del mouse
canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;

   //  obtener posicion exacta dentro del canvas para el arreglo del fucking bug del cursor =) 
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Crear nueva instancia de Lapiz cuando se presiona el mouse
    lapiz = new Lapiz(x, y, 'black', ctx, 'stroke');
});

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown && lapiz) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        lapiz.moveTo(x, y);
        lapiz.draw();
    }
});

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
    lapiz = null;
});
// ########################################################################################3333

// Esperar a que el DOM esté listo
window.addEventListener('load', main);

// main debe llamarse cuando todo esté cargado
function main() {
   dibujarCanvas();
}   


