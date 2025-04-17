class Imagen {
  constructor(width, height, context) {
      this.width = width;
      this.height = height;
      this.ctx = context;
      this.cargada = false;
      this.imageData = null;
  }

  loadImage(file) {

    this.originalImage = file;
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

               // Actualizar tamaño real
        this.actualWidth = imgWidth;
        this.actualHeight = imgHeight;

        // obtenemos y lo plasmamos en el canvas
          this.ctx.drawImage(this.image, 0, 0, imgWidth,imgHeight);
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



//   filtro de sobel 

  SobelFiltro() {
    const imageData = this.ctx.getImageData(0, 0, this.actualWidth, this.actualHeight);
    const data = imageData.data;
    const width = this.actualWidth;
    const height = this.actualHeight;

    // Matriz 2 del video (Sobel vertical)
    const kernel = [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
    ];

    // Copia de la imagen original para no alterar los valores al leer
    const copy = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let sumR = 0, sumG = 0, sumB = 0;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const offsetX = x + j - 1;
                    const offsetY = y + i - 1;
                    const index = (offsetY * width + offsetX) * 4;
                    const peso = kernel[i][j];

                    sumR += copy[index] * peso;
                    sumG += copy[index + 1] * peso;
                    sumB += copy[index + 2] * peso;
                }
            }

            const index = (y * width + x) * 4;
            const magnitude = Math.sqrt(sumR * sumR + sumG * sumG + sumB * sumB);

            data[index] = data[index + 1] = data[index + 2] = magnitude;
            // Alpha no se modifica
        }
    }

    this.ctx.putImageData(imageData, 0, 0);
}




//  filtro negativo aplicado a la imagen cargada 


FiltroNegativo() {
    const imageData = this.ctx.getImageData(0, 0, this.actualWidth, this.actualHeight);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        // invierte colores. Para cada valor de pixel se le resta a 255.  (osea valor - 255)
        data[i] = 255 - data[i];       // R  tonos rojos
        data[i + 1] = 255 - data[i + 1]; // G  tonos verdes
        data[i + 2] = 255 - data[i + 2]; // B   tonos azul
        // data[i + 3] = Alpha (no se modifica)
    }

    this.ctx.putImageData(imageData, 0, 0);
}



 FiltroSepia(){
     
    const matriz = [0.393, 0.769, 0.189,      // R  tonos rojos
               0.349,0.686,0.168,     // G  tonos verdes
                0.272,0.534,0.131];   // B   tonos azul
  

     const imageData = this.ctx.getImageData(0, 0, this.actualWidth, this.actualHeight);
     const data = imageData.data;

     for (let i = 0; i < data.length; i += 4) {

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // aplicar la matriz
        const r_ = matriz[0]*r + matriz[1]*g + matriz[2]*b;
        const g_ = matriz[3]*r + matriz[4]*g + matriz[5]*b;
        const b_ = matriz[6]*r + matriz[7]*g + matriz[8]*b;

        // asignar nuevos valores, con tope en 255
        data[i]     = Math.min(255, r_);
        data[i + 1] = Math.min(255, g_);
        data[i + 2] = Math.min(255, b_);
        // Alpha (data[i + 3]) no se usa en este caso




    } 

    this.ctx.putImageData(imageData, 0, 0);


 }


}



