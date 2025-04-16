

//######################################## declaracion global #######################################3

 window.addEventListener('load', main);


 //############################# funcion main ##############################################################################

function main() {
    //################## declaraciones importantes #######################################
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const btnFil1 = document.getElementById('filtro1');
    const btnBlur = document.getElementById('filtro2');
    const file_input = document.getElementById('file');
    const colorPicker = document.getElementById('color');

    let mouseDown = false;
    let lapiz = null;
    let Myimage = new Imagen(canvasWidth, canvasHeight, ctx);

    // Dibujar el fondo del canvas
    dibujarCanvas(ctx, canvasWidth, canvasHeight);

    // Para poder Cargar la  imagen
    file_input.addEventListener('change', (e) => {
        Myimage.loadImage(e.target.files[0]);
        console.log("Intentando cargar imagen...");
        e.target.value = null;
    });

    // Eventos del mouse para dibujar
    canvas.addEventListener('mousedown', (e) => {
        mouseDown = true;
        const { x, y } = getMousePos(canvas, e);
        lapiz = new Lapiz(x, y, colorPicker.value, ctx, 'stroke');
    });

    canvas.addEventListener('mousemove', (e) => {
        if (mouseDown && lapiz) {
            const { x, y } = getMousePos(canvas, e);
            lapiz.moveTo(x, y);
            lapiz.draw();
        }
    });

    canvas.addEventListener('mouseup', () => {
        mouseDown = false;
        lapiz = null;
    });
    
    
    
    btnFil1.addEventListener('click', () => {

      if (Myimage.cargada){
            Myimage.escalaDeGrises();

      }else{
            console.log("el boton no existe");
      }


    })

    btnBlur.addEventListener('click', () => {

         if(Myimage.cargada){
                Myimage.BlurImage();
           }else{
             console.log('el boton no existe o no funciona');
           }
    })

}

//############################### dibujar canvas ###################3

function dibujarCanvas(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

//############# obtener coordenadas del cursor para el trazo del lapiz #####################

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
