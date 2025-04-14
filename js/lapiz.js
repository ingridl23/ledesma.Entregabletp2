class Lapiz{
                     //fill
    constructor(x, y, color, context, style ){
        this.antx = x;
        this.anty = y;
       
        this.x = x;
        this.y = y;
        this.color = color;
        this.ctx = context;
        this.style =style ;

    }

   draw(){
       this.ctx.beginPath();
       this.ctx.strokeStyle = this.color;
       this.ctx.fillStyle = this.color;
       this.ctx.fillRect(this.x, this.y, 2, 2);
       this.ctx.stroke();
       this.ctx.closePath();
   }

// mover el mouse y las coordenadas
    moveTo(x,y){
        this.antx = this.x;
        this.anty = this.y;
        this.x = x;
        this.y = y;
    }



    getColor(){
        return this.color;
    }

    setColor(color){
        this.color = color;
    }

    getStyle(){
        return this.style;
    }
    setStyle(style){
        this.style = style;
    }
    getContext(){
        return this.ctx;
    }


    get PosX(){
        return this.x;
    }
    get PosY(){
        return this.y;
    }

    getAntX(){
        return this.antx;
    }
    getAntY(){
        return this.anty;
    }


    getPosition (){
        return {
           x: this.getPosX(),
           y: this.getPosY()
        };
   
   
     }
   
    setPosition (x,y){
       this.posX=x;
       this.posY =y;
     
    }

   
    
    isPointInside(x,y){
           
       
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);


      }


      
}