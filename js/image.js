class Image {
     constructor (width,height,context){
        this.width = width;
        this.height = height;
        this.ctx = context;
        this.cargada= false;
        this.imageData = null;
     }


     loadImage (filename){
        this.actualWidth = this.width;
        this.actualHeight = this.height;
        this.image = new Image();

        this.image.src = filename;

        // cuando se cargue la imagen lo dibujamos en el canvas 
        this.image.onload = () => {
            this.cargada = true;
            this.ctx.drawImage(this.image,0,0,this.width,this.height);
            this.imageData = this.ctx.getImageData(0,0,this.width,this.height);
        };
        this.image.onerror = () => {
            console.error("Error loading image: " + filename);
        };

     }

   
}