import { selfId } from './game';
import { PlayerClient } from './Entities/PlayerClient';
import { Point } from "../../server/js/GeometryAndPhysics";

declare var mouseX: any;
declare var mouseY: any;
declare const CAMERA_BOX_ADJUSTMENT: any;

export class Camera {

    position: Point = new Point(0,0);
    ctx;

    constructor(private canvas, private width, private height, private worldWidth = 1024, private worldHeight = 1024) {
        this.ctx = canvas.getContext("2d");
    }

    resize = (width, height) => {
        this.width = width;
        this.height = height;   
        this.canvas.width = width;
        this.canvas.height = height; 
    }

    updateWorldSize = (width, height) => {
        this.worldHeight = height;
        this.worldWidth = width;
    }

    isPositionNearEdge = (position: Point) => {
        if(!(this.position.x+(mouseX-this.width/2)/CAMERA_BOX_ADJUSTMENT > 0 && this.position.x+(mouseX-this.width/2)/CAMERA_BOX_ADJUSTMENT < this.worldWidth-this.width )){
            return true;
        }

        if(!(this.position.y+(mouseY-this.height/2)/CAMERA_BOX_ADJUSTMENT > 0 && this.position.y+(mouseY-this.height/2)/CAMERA_BOX_ADJUSTMENT < this.worldHeight-this.height )){
            return true;
        }

        return false;
    }
    

    getScreenPosition = (position: Point) => {

        let mouseXCorrection = (mouseX-this.width/2)/CAMERA_BOX_ADJUSTMENT;
        let mouseYCorrection = (mouseY-this.height/2)/CAMERA_BOX_ADJUSTMENT;

        let x: number = position.x - this.position.x;
        if(this.position.x+mouseXCorrection > 0 && this.position.x+mouseXCorrection < this.worldWidth-this.width )
            x = x - mouseXCorrection;
        else{
           if(this.position.x+mouseXCorrection <= 0) x = position.x;
           if(this.position.x+mouseXCorrection >= this.worldWidth-this.width) x = position.x-(this.worldWidth-this.width);
        }
        let y: number = position.y - this.position.y;
        if(this.position.y+mouseYCorrection > 0 && this.position.y+mouseYCorrection < this.worldHeight-this.height ) 
            y = y - mouseYCorrection; 
        else{
            if(this.position.y+mouseYCorrection <= 0) y = position.y;
            if(this.position.y+mouseYCorrection >= this.worldHeight-this.height) y = position.y-(this.worldHeight-this.height); 
        }

        return new Point(x,y);
    }

    updatePosition = (position: Point) => {
        
        this.position.x = position.x - this.width/2;
        this.position.y = position.y - this.height/2;

        if(this.position.x < 0 )
            this.position.x = 0;
        if(this.position.y < 0 )
            this.position.y = 0;         
            
        if(this.position.x > this.worldWidth-this.width )
            this.position.x = this.worldWidth-this.width;
        if(this.position.y > this.worldHeight-this.height )
            this.position.y = this.worldHeight-this.height;             
            

    } 

    drawBar = (px,py, width, height, style) =>{

        let position = this.getScreenPosition(new Point(px,py));

        if((position.x <= this.width || position.x+width >= 0) && (position.y+height >= 0 && position.y <= this.height) ){
            this.ctx.fillStyle = style;
            this.ctx.fillRect(position.x, position.y, width, height);
        }
    }

    drawImage = (img, frameWidth, frameHeight, aimAngle, directionMod, walkingMod, px, py, width, height, startx = 0, starty = 0) => {

        let position = this.getScreenPosition(new Point(px,py));

        if((position.x <= this.width || position.x+width >= 0) && (position.y+height >= 0 && position.y <= this.height) ){
            if(aimAngle !== 0){
                this.ctx.save();
                this.ctx.translate(position.x - width/2,position.y - height/2);
                this.ctx.translate(width/2, height/2); 
                this.ctx.rotate(aimAngle*Math.PI/180);
                this.ctx.drawImage(img, startx+walkingMod*frameWidth, starty+directionMod*frameHeight, frameWidth, frameHeight, -width/2,-height/2, width, height);            
            } else {
                this.ctx.drawImage(img, startx+walkingMod*frameWidth, starty+directionMod*frameHeight, frameWidth, frameHeight, position.x, position.y, width, height);            
            }
    
    
            if(aimAngle !== 0){
                this.ctx.restore();
            }
        }
    }

    drawImageFromTP = (img, startx, starty, imgWidth, imgHeight, frameWidth, frameHeight, aimAngle, directionMod, walkingMod, px, py, width, height) => {
        
                let position = this.getScreenPosition(new Point(px,py));
        
                if((position.x <= this.width || position.x+width >= 0) && (position.y+height >= 0 && position.y <= this.height) ){
                    if(aimAngle !== 0){
                        this.ctx.save();
                        this.ctx.translate(position.x - width/2,position.y - height/2);
                        this.ctx.translate(width/2, height/2); 
                        this.ctx.rotate(aimAngle*Math.PI/180);
                        this.ctx.drawImage(img,startx+walkingMod*frameWidth, starty+directionMod*frameHeight, frameWidth, frameHeight, -width/2,-height/2, width, height);            
                    } else {
                        this.ctx.drawImage(img, startx+walkingMod*frameWidth, starty+directionMod*frameHeight, frameWidth, frameHeight, position.x, position.y, width, height);            
                    }
            
            
                    if(aimAngle !== 0){
                        this.ctx.restore();
                    }
                }
            }

}