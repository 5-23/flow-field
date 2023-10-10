const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// ctx.fillStyle = "#fff"
// ctx.strokeStyle = "#3366ff10"
// ctx.lineCap = "round"

class Particle {
    /**
     * 
     * @param { Effect } effect 
     */
    constructor(effect) {
        this.effect = effect
        this.color = "#8aadf410"
        this.x = Math.floor(Math.random() * this.effect.w);
        this.y = Math.floor(Math.random() * this.effect.h);
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.history = [{x: this.x, y: this.y}];
        this.len = 50;
        this.angle = 0;
    }
    
    init() {
        // this.color = "#ed879610"
        this.x = Math.floor(Math.random() * this.effect.w);
        this.y = Math.floor(Math.random() * this.effect.h);
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.history = [{x: this.x, y: this.y}];
        this.len = 50;
        this.angle = 0;
        console.log("init")
    }

    
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let history of this.history) {
            ctx.lineTo(history.x, history.y);
        }
        ctx.stroke()
    }
    update() {
        let x = Math.floor(this.x / this.effect.cellSize);
        let y = Math.floor(this.y / this.effect.cellSize);
        let index = y*this.effect.cols + x;
        this.angle = this.effect.flowField[index]
        // this.angle += 0.5
        this.speedX = Math.sin(this.angle);
        this.speedY = Math.cos(this.angle); 
        this.x += this.speedX;
        this.y += this.speedY;
        this.history.push({x: this.x, y: this.y})
        if (this.history.length > this.len){
            this.history.shift()
        }
        if (0 >= index || index >= effect.flowField.length){
            this.init();
        }
    }
}

class Effect {
    /**
     * 
     * @param { Number } w 
     * @param { Number } h 
     */
    constructor(w, h) {
        this.w = w;
        this.h = h;
        /** @type {Array<Particle>} */
        this.particles = [];
        this.particleMax = 10_000;

        this.cellSize = 50;
        this.rows = Math.floor(this.h / this.cellSize);
        this.cols = Math.floor(this.w / this.cellSize);
        this.flowField = [];
    }
    init() {
        for (let i = 0; i <= this.particleMax; i++)
        this.particles.push(new Particle(this))
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let rng1 = Math.random()*3 - 1.5;
                let rng2 = Math.random()*3 - 1.5;
                let angle = Math.sin(x/rng1) + Math.cos(y/rng2)
                this.flowField.push(angle)
            }
        }
        console.log(this.flowField)
    }
    render() {
        this.particles.forEach( particle => {
            particle.draw()
            particle.update()
        })
    }
}

const effect = new Effect(canvas.width, canvas.height);

effect.init();
const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    effect.render()
    requestAnimationFrame(loop)
}
loop()
