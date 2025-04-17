class Borrador extends Paint {
    constructor(posX, posY, fill, context, size) {
        super(posX, posY, fill, context);  // Llamada al constructor de la clase base
        this.size = size || 10;  // Tamaño del borrador (puedes pasar el tamaño al crear el borrador)
        
        this.antx = posX;
        this.anty = posY;
 
   
   
   
    }

    // Método para cambiar el tamaño del borrador
    setSize(size) {
        this.size = size;
    }

    // Método para dibujar el borrador (en realidad borra una parte del canvas)
    draw() {

            this.ctx.fillStyle = 'pink';  // o colorPicker.value si querés elegir color
            this.ctx.fillRect(
                this.x - this.size / 2,
                this.y - this.size / 2,
                this.size,
                this.size);
        
       
    }

    // Actualizar la posición final del borrador durante el movimiento del mouse
    setFinal(x, y) {
        this.posX = x;
        this.posY = y;
    }


    // mover el mouse y las coordenadas
    moveTo(x,y){
        this.antx = this.x;
        this.anty = this.y;
        this.x = x;
        this.y = y;
    }

    getAntX(){
        return this.antx;
    }
    getAntY(){
        return this.anty;
    }


    get PosX(){
        return this.x;
    }
    get PosY(){
        return this.y;
    }

    
    getPosition (){
        return {
           x: this.getPosX(),
           y: this.getPosY()
        };
   
   
     }
   
     setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    

}
