Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("../../server/js/GeometryAndPhysics");
class Camera {
    constructor(canvas, width, height, worldWidth = 1024, worldHeight = 1024) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.resize = (width, height) => {
            this.width = width;
            this.height = height;
            this.canvas.width = width;
            this.canvas.height = height;
        };
        this.updateWorldSize = (width, height) => {
            this.worldHeight = height;
            this.worldWidth = width;
        };
        this.isPositionNearEdge = (position) => {
            if (!(this.position.x + (mouseX - this.width / 2) / CAMERA_BOX_ADJUSTMENT > 0 && this.position.x + (mouseX - this.width / 2) / CAMERA_BOX_ADJUSTMENT < this.worldWidth - this.width)) {
                return true;
            }
            if (!(this.position.y + (mouseY - this.height / 2) / CAMERA_BOX_ADJUSTMENT > 0 && this.position.y + (mouseY - this.height / 2) / CAMERA_BOX_ADJUSTMENT < this.worldHeight - this.height)) {
                return true;
            }
            return false;
        };
        this.getScreenPosition = (position) => {
            let mouseXCorrection = (mouseX - this.width / 2) / CAMERA_BOX_ADJUSTMENT;
            let mouseYCorrection = (mouseY - this.height / 2) / CAMERA_BOX_ADJUSTMENT;
            let x = position.x - this.position.x;
            if (this.position.x + mouseXCorrection > 0 && this.position.x + mouseXCorrection < this.worldWidth - this.width)
                x = x - mouseXCorrection;
            else {
                if (this.position.x + mouseXCorrection <= 0)
                    x = position.x;
                if (this.position.x + mouseXCorrection >= this.worldWidth - this.width)
                    x = position.x - (this.worldWidth - this.width);
            }
            let y = position.y - this.position.y;
            if (this.position.y + mouseYCorrection > 0 && this.position.y + mouseYCorrection < this.worldHeight - this.height)
                y = y - mouseYCorrection;
            else {
                if (this.position.y + mouseYCorrection <= 0)
                    y = position.y;
                if (this.position.y + mouseYCorrection >= this.worldHeight - this.height)
                    y = position.y - (this.worldHeight - this.height);
            }
            return new GeometryAndPhysics_1.Point(x, y);
        };
        this.updatePosition = (position) => {
            this.position.x = position.x - this.width / 2;
            this.position.y = position.y - this.height / 2;
            if (this.position.x < 0)
                this.position.x = 0;
            if (this.position.y < 0)
                this.position.y = 0;
            if (this.position.x > this.worldWidth - this.width)
                this.position.x = this.worldWidth - this.width;
            if (this.position.y > this.worldHeight - this.height)
                this.position.y = this.worldHeight - this.height;
        };
        this.drawBar = (px, py, width, height, style) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + width >= 0) && (position.y + height >= 0 && position.y <= this.height)) {
                this.ctx.fillStyle = style;
                this.ctx.fillRect(position.x, position.y, width, height);
            }
        };
        this.drawImage = (img, frameWidth, frameHeight, aimAngle, directionMod, walkingMod, px, py, width, height, startx = 0, starty = 0) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + width >= 0) && (position.y + height >= 0 && position.y <= this.height)) {
                if (aimAngle !== 0) {
                    this.ctx.save();
                    this.ctx.translate(position.x - width / 2, position.y - height / 2);
                    this.ctx.translate(width / 2, height / 2);
                    this.ctx.rotate(aimAngle * Math.PI / 180);
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, -width / 2, -height / 2, width, height);
                }
                else {
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, position.x, position.y, width, height);
                }
                if (aimAngle !== 0) {
                    this.ctx.restore();
                }
            }
        };
        this.drawImageFromTP = (img, startx, starty, imgWidth, imgHeight, frameWidth, frameHeight, aimAngle, directionMod, walkingMod, px, py, width, height) => {
            let position = this.getScreenPosition(new GeometryAndPhysics_1.Point(px, py));
            if ((position.x <= this.width || position.x + width >= 0) && (position.y + height >= 0 && position.y <= this.height)) {
                if (aimAngle !== 0) {
                    this.ctx.save();
                    this.ctx.translate(position.x - width / 2, position.y - height / 2);
                    this.ctx.translate(width / 2, height / 2);
                    this.ctx.rotate(aimAngle * Math.PI / 180);
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, -width / 2, -height / 2, width, height);
                }
                else {
                    this.ctx.drawImage(img, startx + walkingMod * frameWidth, starty + directionMod * frameHeight, frameWidth, frameHeight, position.x, position.y, width, height);
                }
                if (aimAngle !== 0) {
                    this.ctx.restore();
                }
            }
        };
        this.ctx = canvas.getContext("2d");
    }
}
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map