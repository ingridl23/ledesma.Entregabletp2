

//  @type (HTMLCanvasElement)

let canvas =document.querySelector('#canvas');
let ctx = canvas.getContext('2d');


let canvasWidth = canvas.width;
let canvasHeight = canvas.height

// boton derecho del mouse
let mouseDown = false;
let lapiz = null
let mouseUp= false;
let mousemove = false;
// mouse down boton presionado

canvas.addEventListener('mousedown', (e) => {
   mouseDown = true;
   lapiz = new Lapiz(e.ClientX, e.ClientY, 'black', ctx, 'black');


})
// boton en movimiento
canvas.addEventListener('mousemove', (e) => {
   mousemove = true;
     if(mouseDown == true && (lapiz != null)){

           lapiz.moveTo(e.layerX, e.layerY);
           lapiz.draw();
     }
})



//  evento de boton soltado 

canvas.addEventListener('mouseup', (e) => {

   mouseDown = false;
   lapiz = null;
   mousemove = false;
   mouseUp = true;

  



})





function dibujarCanvas (){

   ctx.beginPath();
   ctx.fillStyle ='pink';
   //   pintar y rellenar el canvas
   ctx.fillRect(0,0,canvasWidth,canvasHeight);
   
   ctx.strokeStyle= 'black';
   ctx.stroke();
   ctx.lineWidth = 2;
   ctx.closePath();
}





   function main() {
           dibujarCanvas();
   }

















    









