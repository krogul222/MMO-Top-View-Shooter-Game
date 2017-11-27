declare const WIDTH;
declare const HEIGHT;

export class Filters {

    imageData;
    data;
    bAdjustment: number = -50;
    constructor(private ctx) {
    }

    getImageFromCanvas = () =>{
        this.imageData = this.ctx.getImageData(0, 0, WIDTH, HEIGHT);
        this.data = this.imageData.data;
    }

    invert = () => {
        for (var i = 0; i < this.data.length; i += 4) {
            this.data[i]     = 255 - this.data[i];     // red
            this.data[i + 1] = 255 - this.data[i + 1]; // green
            this.data[i + 2] = 255 - this.data[i + 2]; // blue
        }

        this.ctx.putImageData(this.imageData, 0, 0);
    }

    bright = () => {
        for (var i = 0; i < this.data.length; i += 4) {
            this.data[i]     += this.bAdjustment;     // red
            this.data[i + 1] += this.bAdjustment; // green
            this.data[i + 2] += this.bAdjustment; // blue
        }

        this.ctx.putImageData(this.imageData, 0, 0);
    }

    blur = () => {
        let r, g, b, a;
        for (var i = 0; i < this.data.length; i += 4) {
            r = 0;
            g = 0;
            b = 0;
            for(var j = -1; j < 2; j++){
                for(var k = -1; k < 2; k++){
                    if((i+j+k*WIDTH*4) > 0 && (i+j+k*WIDTH*4) < this.data.length){
                        r += this.data[i+j+k*WIDTH*4]/9;     // red
                        g += this.data[i+j+k*WIDTH*4]/9; // green
                        b += this.data[i+j+k*WIDTH*4]/9; // blue
                    } 
                }
            }

            this.data[i]     = r;     // red
            this.data[i + 1] = g; // green
            this.data[i + 2] = b; // blue
        }

        this.ctx.putImageData(this.imageData, 0, 0);
    }


}