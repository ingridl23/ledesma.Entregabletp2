class Lapiz extends Paint{
                     //color
    constructor(x, y, fill, context, style ){
        
        super(x, y, fill, context);
        
        
        this.antx = x;
        this.anty = y;
 
         this.style = style;
    }

   draw(){
    super.draw();
       this.ctx.beginPath();
       this.ctx.strokeStyle = this.fill;
       this.ctx.fillStyle = this.fill;
    
       this.ctx.moveTo(this.antx, this.anty);
       this.ctx.lineTo(this.x, this.y);
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



    getFill(){
        return this.fill;
    }

    setColor(fill){
        this.fill = fill;
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
   
     setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    

  
  


      
}