

//######################################## declaracion global #######################################3

 window.addEventListener('load', main);


 //############################# funcion main ##############################################################################

function main() {
    //################## declaraciones importantes #######################################
    const canvas = document.querySelector('#canvas');

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const btnFil1 = document.getElementById('filtro1');
    const btnBlur = document.getElementById('filtro2');
    const btnSobel = document.getElementById('filtro3');
    const btnNegative= document.getElementById('filtro4');
    const btnSepia = document.getElementById('filtro5');


    const file_input = document.getElementById('file');
    const colorPicker = document.getElementById('color');

    const clearTodo = document.getElementById('borrar');
    const btnReverse = document.getElementById('reverse');
    const btnBorrador = document.getElementById('borrador');
    const btnRectangulo = document.getElementById('rectangulo');
    const btnElipse = document.getElementById('elipse');

    let mouseDown = false;
    let lapiz =  document.getElementById('lapiz');
    let Myimage = new Imagen(canvasWidth, canvasHeight, ctx);
    let modoActual = null; // puede ser 'lapiz', 'rectangulo', etc.
 
    let herramienta= null ;
    // Dibujar el fondo del canvas
    dibujarCanvas(ctx, canvasWidth, canvasHeight);

    // Para poder Cargar la  imagen
    file_input.addEventListener('change', (e) => {
        Myimage.loadImage(e.target.files[0]);
        console.log("Intentando cargar imagen...");
        e.target.value = null;
    });

//    ############### eventos del mouse adaptados por herramientas de eleccion del canvas ###############



// evento mouse presionado 
canvas.addEventListener('mousedown', (e) => {
        mouseDown = true;
        const { x, y } = getMousePos(canvas, e);
    
        if (modoActual === 'lapiz') {
            herramienta = new Lapiz(x, y, colorPicker.value, ctx, 'stroke');
        } else if (modoActual === 'rectangulo') {
            herramienta = new Rectangulo(x, y, colorPicker.value, ctx);
        } else if (modoActual === 'elipse') {
            herramienta = new Elipse(x, y, colorPicker.value, ctx);
        } else if (modoActual === 'borrador') {
            herramienta = new Borrador(x, y, colorPicker.value, ctx, 20);  // Tamaño de 20 px para el borrador
        }
        });


        // evento mouse en movimiento
    
    canvas.addEventListener('mousemove', (e) => {
        if (mouseDown && herramienta) {
            const { x, y } = getMousePos(canvas, e);
            if (modoActual === 'lapiz'|| modoActual === 'borrador') {
                herramienta.moveTo(x, y);
                herramienta.draw();
            } else {
                herramienta.setFinal(x, y);
            }
        }
    });
    

// ##### evento mouse suelto
    canvas.addEventListener('mouseup', () => {
        if (modoActual !== 'lapiz' && herramienta) {
            herramienta.draw();
        }
    
        mouseDown = false;
        herramienta = null;
    });

 
    



// ############# eventos de las herramientas #####################3
    lapiz.addEventListener('click', () => {
        modoActual = 'lapiz';

    })


    btnBorrador.addEventListener('click', () => {
        modoActual = 'borrador';
    });
    
    btnRectangulo.addEventListener('click', () => {
        modoActual = 'rectangulo';
    });
    
  btnElipse.addEventListener('click', () => {
        modoActual = 'elipse';
    });


    // ##evento de borrar lapiz y/o imagen cargada

    clearTodo.addEventListener('click', () => {
        ctx.clearRect(0,0, canvasWidth , canvasHeight);
        dibujarCanvas(ctx, canvasWidth, canvasHeight);

    })

// ###################################### eventos botones de filtros ##########################################################3
    
    // # evento de aplicar escala de grises a la imagen
    
    btnFil1.addEventListener('click', () => {

      if (Myimage.cargada){
            Myimage.escalaDeGrises();

      }else{
            console.log("el boton no existe");
      }


    })

    // # evento de aplicar filtro de blur a la imagen

    btnBlur.addEventListener('click', () => {

         if(Myimage.cargada){
                Myimage.BlurImage();
           }else{
             console.log('el boton no existe o no funciona');
           }
    })



    //  evento aplicar filtro de sobel a la imagen

     btnSobel.addEventListener('click', ()=> {
         
           if(Myimage.cargada){
              Myimage.SobelFiltro();
           } else{
               console.log("el boton no existe o no funciona , sobel")
           }
     })

     btnNegative.addEventListener('click', ()=> {
          if(Myimage.cargada){
               Myimage.FiltroNegativo();
          }else{
              console.log("el boton no existe o no funciona, negativo");
          }
     })


    btnSepia.addEventListener('click',()=> {
           if(Myimage.cargada){
                  Myimage.FiltroSepia(); 
           }else{
            console.log("el boton no existe o no funciona, sepia");
           }
    })


        
    // 3. Reiniciar la imagen cargada 
    Myimage = new Imagen(canvasWidth, canvasHeight, ctx);

    console.log('Canvas e imagen limpiados.');
    
   

    // # evento de reestablecer imagen con filtro/s aplicado/s a su modo original
    
    
    btnReverse.addEventListener('click',()=>{
        if (Myimage.originalImage) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            dibujarCanvas(ctx, canvasWidth, canvasHeight);
            Myimage.loadImage(Myimage.originalImage);
        } else {
            console.log("No hay imagen cargada para revertir.");
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
