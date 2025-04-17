class Elipse extends Paint {
    constructor(posX, posY, fill, context) {
        super(posX, posY, fill, context); // Llamada al constructor de la clase base
        this.radiusX = 0; // Radio horizontal de la elipse
        this.radiusY = 0; // Radio vertical de la elipse
    }

    // Método para definir los radios de la elipse
    setRadius(radiusX, radiusY) {
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }

    // Método para dibujar la elipse en el canvas
    draw() {
        this.ctx.fillStyle = this.getFill();
        this.ctx.beginPath();
        this.ctx.ellipse(this.posX, this.posY, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    // Actualizar el tamaño final de la elipse durante el movimiento del mouse
    setFinal(x, y) {
        this.radiusX = Math.abs(x - this.posX);
        this.radiusY = Math.abs(y - this.posY);
    }
}
