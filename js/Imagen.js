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

      this.image.src = URL.createObjectURL(file); // crear url temporal para evitar error

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


          this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
          this.imageData = this.ctx.getImageData(0, 0, imgWidth, imgHeight);
      };

      this.image.onerror = () => {
          console.error("Error al cargar la imagen: " + file.name);
      };
  }




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
}
