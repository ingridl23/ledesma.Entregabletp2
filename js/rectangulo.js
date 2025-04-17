class Rectangulo extends Paint {
    constructor(posX, posY, fill, context) {
        super(posX, posY, fill, context); // Llamada al constructor de la clase base
        this.width = 0;  // Ancho inicial del rectángulo
        this.height = 0; // Alto inicial del rectángulo
    }

    // Método para definir el ancho y alto del rectángulo
    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }

    // Método para dibujar el rectángulo en el canvas
    draw() {
        this.ctx.fillStyle = this.getFill();
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    // Actualizar el tamaño final del rectángulo durante el movimiento del mouse
    setFinal(x, y) {
        this.width = x - this.posX;
        this.height = y - this.posY;
    }
}
