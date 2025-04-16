class Imagen {
  constructor(width, height, context) {
      this.width = width;
      this.height = height;
      this.ctx = context;
      this.cargada = false;
      this.imageData = null;
  }

  loadImage(file) {
      this.actualWidth = this.width;
      this.actualHeight = this.height;
      this.image = new Image(); // ¡IMPORTANTE! usar Image, no Imagen

      this.image.src = URL.createObjectURL(file); // crea url temporal para evitar error

      this.image.onload = () => {
          this.cargada = true;


          // Calcular el tamaño proporcional de la imagen
          const imageRatio = this.image.width / this.image.height;
          const canvasRatio = this.width / this.height;

          let imgWidth = this.width;
          let imgHeight = this.height;

          if (imageRatio > canvasRatio) {
              // Si la imagen es más ancha que alta
              imgHeight = this.width / imageRatio;
          } else {
              // Si la imagen es más alta que ancha
              imgWidth = this.height * imageRatio;
          }

        // obtenemos y lo plasmamos en el canvas
          this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
          this.imageData = this.ctx.getImageData(0, 0, imgWidth, imgHeight);
      };

      this.image.onerror = () => {
          console.error("Error al cargar la imagen: " + file.name);
      };
  }



// ################## filtro de grises
   escalaDeGrises() {
         console.log("boton presionado");

         //obtenemos la imagen actual

         let imageData = this.ctx.getImageData(0,0,this.actualWidth, this.actualHeight);
         let data = imageData.data;


         // calcular filtro de pixeles en escala de  grises

         for(let pixel =0 ; pixel< data.length ; pixel+=4){
               let promedio = (data[pixel]+ data [pixel+1] + data [pixel+2] )/3 ;

               data [pixel] = promedio;
               data [pixel+1]= promedio;
               data [pixel+2]= promedio;
             
         }
          this.ctx.putImageData(imageData,0,0);
   }




// ############# filtro de blur
    BlurImage(){
    let imageData = this.ctx.getImageData(0, 0, this.actualWidth, this.actualHeight);
    let data = imageData.data;
    let kernel = [];
    let kernelSize = 3;
    for (let i = 0; i < kernelSize; i++) {
        kernel[i] = [];
        for (let j = 0; j < kernelSize; j++) {
            kernel[i][j] = 1;
        }
    }
    for (let y = 0; y < this.actualHeight; y++) {
        for (let x = 0; x < this.actualWidth; x++) {
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            let cant = 0;
            let offsetX;
            let offsetY;
            let index;
            let indice;
            let valorKernel;
            for (let i = 0; i < kernelSize; i++) {
                for (let j = 0; j < kernelSize; j++) {
                    offsetX = x + i - Math.floor(kernelSize / 2);
                    offsetY = y + j - Math.floor(kernelSize / 2);
                    if (offsetX < 0 || offsetY < 0 || offsetX > this.actualWidth -1 || offsetY > this.actualHeight -1) { continue; }
                    index = (offsetX + (offsetY * this.actualWidth)) * 4;
                    valorKernel = kernel[i][j];
                    sumR += data[index] * valorKernel;
                    sumG += data[index + 1] * valorKernel;
                    sumB += data[index + 2] * valorKernel;
                    cant++;
                }
            }
            indice = (x + (y * this.actualWidth)) * 4;
            data[indice] = sumR / cant;
            data[indice + 1] = sumG / cant;
            data[indice + 2] = sumB / cant;
        }
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

}



