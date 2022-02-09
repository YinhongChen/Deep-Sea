function play() {
    var audio = new Audio('audio/bensound-slowmotion.mp3');
    audio.play();
}
function myFunction() {
    var x = document.getElementById("myAudio").autoplay;
    document.getElementById("demo").innerHTML = x;
  }
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1255;
canvas.height = 615;
let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';
let gameOver = false;
var myMusic;
var randomN;
//bgm

// Mouse interactivity

let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousemove', function(e){
    mouse.click = true;
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
window.addEventListener('mouseup', function(e){
    mouse.click = false;
});

const bubblePop1 = document. createElement('audio');
bubblePop1.src = 'audio/sound1.wav';
const bubblePop2 = document. createElement('audio');
bubblePop2.src = 'audio/sound2.wav';
const gameover1 = document. createElement('audio');
gameover1.src = 'audio/sound3.mp3';
const backgroundMusic = document. createElement('audio');
backgroundMusic.src = 'audio/sound/bensound-slowmotion.mp3';

// Player
const playerLeft = new Image();
playerLeft.src = 'images/green-sea-turtle-Left.png';
const playerRight = new Image();
playerRight.src = 'images/green-sea-turtle-Right.png';
class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 40;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 160;
        this.spriteHeight = 105;
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= dx/20;
            this.moving = true;
        }
        if (mouse.y != this.y){
            this.y -= dy/20;
            this.moving = true;
        }
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y < 50) this.y = 50;
        if (this.y > canvas.height) this.y = canvas.height;
        let theta = Math.atan2(dy,dx);
        this.angle = theta;
        
    }
    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.01;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
      
        ctx.fillStyle = 'black';
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc(0, -20, this.radius, 0, Math.PI * 360);
        //ctx.fill();
        if (this.x >= mouse.x){
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth * 0.8, this.spriteHeight * 0.8);
        } else {
            ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth * 0.8, this.spriteHeight * 0.8);
        }
        ctx.restore();
        

    }
}
const player = new Player();


// Fish1
const fishArray1 = [];
const fish1 = new Image();
fish1.src = 'images/clown-fish.png';
const fishArray2 = [];
const fish2 = new Image();
fish2.src = 'images/blue-tang.png';
class Fish1 {
    constructor(){
        this.x = 0 - 50 - Math.random() * canvas.width/2;
        this.y = Math.random() * canvas.height;
        
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.counted = false;
        this.frameX = 0;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.pop = false;
        this.counted = false;
    }
    update(){
        this.x += this.speed
        const dy = this.y - player.y;
        const dx = this.x - player.x;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
            ctx.drawImage(fish1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth*1.5, this.spriteHeight*1.5);
          
    }
}

function handleFish1(){
    for (let i = 0; i < fishArray1.length; i++){
        if (fishArray1[i].y > canvas.height * 2){
            fishArray1.splice(i, 1);
        }
    }
    for (let i = 0; i < fishArray1.length; i++){
        if (fishArray1[i].distance < fishArray1[i].radius + player.radius){
            popAndRemove1(i);
        }
    }
    for (let i = 0; i < fishArray1.length; i++){
        fishArray1[i].update();
        fishArray1[i].draw();
    }
    if (gameFrame % 100 == 0) {
        fishArray1.push(new Fish1());

    }
}
function popAndRemove1(i){
    if (fishArray1[i]) {
        if (!fishArray1[i].counted) score++;
        if (fishArray1[i].sound == 'sound1'){
            bubblePop1.play();
        } else {
            bubblePop2.play();
        }
        fishArray1[i].counted = true;
        fishArray1[i].frameX++;
        if (fishArray1[i].frameX > 7) fishArray1[i].pop = true;
        if (fishArray1[i].pop) fishArray1.splice(i, 1);
        requestAnimationFrame(popAndRemove1);
    }

}


// Fish 2
class Fish2 {
    constructor(){
        this.x = 0 - 50 - Math.random() * canvas.width/2;
        this.y = Math.random() * canvas.height;
        
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.counted = false;
        this.frameX = 0;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.pop = false;
        this.counted = false;
    }
    update(){
        this.x += this.speed
        const dy = this.y - player.y;
        const dx = this.x - player.x;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
        ctx.drawImage(fish2, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth*1.5, this.spriteHeight*1.5);
    }
}

function handleFish2(){
    for (let i = 0; i < fishArray2.length; i++){
        if (fishArray2[i].y > canvas.height * 2){
            fishArray2.splice(i, 1);
        }
    }
    for (let i = 0; i < fishArray2.length; i++){
        if (fishArray2[i].distance < fishArray2[i].radius + player.radius){
            popAndRemove2(i);
        }
    }
    for (let i = 0; i < fishArray2.length; i++){
        fishArray2[i].update();
        fishArray2[i].draw();
    }
    if (gameFrame % 100 == 0) {
        fishArray2.push(new Fish2());

    }
}
function popAndRemove2(i){
    if (fishArray2[i]) {
        if (!fishArray2[i].counted) score++;
        if (fishArray2[i].sound == 'sound1'){
            bubblePop1.play();
        } else {
            bubblePop2.play();
        }
        fishArray2[i].counted = true;
        fishArray2[i].frameX++;
        if (fishArray2[i].frameX > 7) fishArray2[i].pop = true;
        if (fishArray2[i].pop) fishArray2.splice(i, 1);
        requestAnimationFrame(popAndRemove2);
    }
}

const fishArray3 = [];
const fish3 = new Image();
fish3.src = 'images/striped-bass.png';
class Fish3 {
    constructor(){
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.counted = false;
        this.frameX = 0;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.pop = false;
        this.counted = false;
    }
    update(){
        this.x -= this.speed
        const dy = this.y - player.y;
        const dx = this.x - player.x;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
            ctx.drawImage(fish3, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth*1.5, this.spriteHeight*1.5);
          
    }
}

function handleFish3(){
    for (let i = 0; i < fishArray3.length; i++){
        if (fishArray3[i].y > canvas.height * 2){
            fishArray3.splice(i, 1);
        }
    }
    for (let i = 0; i < fishArray3.length; i++){
        if (fishArray3[i].distance < fishArray3[i].radius + player.radius){
            popAndRemove3(i);
        }
    }
    for (let i = 0; i < fishArray3.length; i++){
        fishArray3[i].update();
        fishArray3[i].draw();
    }
    if (gameFrame % 100 == 0) {
        fishArray3.push(new Fish3());

    }
}
function popAndRemove3(i){
    if (fishArray3[i]) {
        if (!fishArray3[i].counted) score++;
        if (fishArray3[i].sound == 'sound1'){
            bubblePop1.play();
        } else {
            bubblePop2.play();
        }
        fishArray3[i].counted = true;
        fishArray3[i].frameX++;
        if (fishArray3[i].frameX > 7) fishArray3[i].pop = true;
        if (fishArray3[i].pop) fishArray3.splice(i, 1);
        requestAnimationFrame(popAndRemove3);
    }

}
// Enemies
const enemyArray = [];
const enemyImage = new Image();
enemyImage.src = 'images/bag.png';

class Enemy{
    constructor(){
        this.x = 0 - 50 - Math.random() * canvas.width/2;
        this.y = Math.random() * canvas.height;
        
        this.radius = 35;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.counted = false;
        this.frameX = 0;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.pop = false;
        this.counted = false;
    }
    draw(){
        ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth*1.5, this.spriteHeight*1.5);
    }
    update(){
        this.x -= this.speed;
        if(this.x < 0 - this.radius * 2){
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height -150) + 90;
            this.speed = Math.random() * 2 +2;
        }
        if (gameFrame % 5 == 0){
            this.frame++;
            if(this.frame >= 12) this.frame = 0;
            if(this.frame == 3 || this.frame == 7 || this.frame || 11){
                this.frameX = 0;
            } else{
                this.frameX++;
            }
            if(this.frame<3) this.frameY = 0;
            else if (this.frame < 7) this.frameY = 1;
            else if (this.frame < 11) this.frameY = 2;
            else this.frameY = 0;
        }
        // collision with player
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < this.radius + player.radius) {
            handleGameOver();
        }
    }
}

function handleEnemies(){
    for (let i = 0; i < enemyArray.length; i++){
        if (enemyArray[i].y > canvas.height * 2){
            enemyArray.splice(i, 1);
        }
    }
    for (let i = 0; i < enemyArray.length; i++){
        enemyArray[i].update();
        enemyArray[i].draw();
    }
    if (gameFrame % 400 == 0) {
        enemyArray.push(new Enemy());

    }
    
}


function handleGameOver(){
    gameover1.play();
    ctx.fillStyle = 'white';
    ctx.font = '44px Verdana';
    ctx.fillText('Game Over, you reached score ' + score, 300, 150);
    gameOver = ture;
}

/**** bubble TEXT ***/ 
let bubbleTextArray = [];
let adjustX = -3;
let adjustY = -3;
ctx.fillStyle = 'white';
ctx.font = '17px Verdana';
ctx.fillText('Deep Sea', 45, 40);
ctx.font = '11px Verdana';
ctx.fillText('Click for Sound', 45, 60);
//ctx.font = '19px Verdana';
//ctx.fillText('TEXT', 36, 49);
const textCoordinates = ctx.getImageData(0, 0, 140, 100);

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 7;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 15) + 1;
        this.distance;
    }
    draw() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(34,147,214,1)';
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.beginPath();
        if (this.distance < 50){
            this.size = 14;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x + 4, this.y -4, this.size/3, 0, Math.PI * 2);
            ctx.arc(this.x -6, this.y -6, this.size/5, 0, Math.PI * 2);
        } else if (this.distance <= 80){
            this.size = 8;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x + 3, this.y -3, this.size/2.5, 0, Math.PI * 2);
            ctx.arc(this.x -4, this.y -4, this.size/4.5, 0, Math.PI * 2);
        }
        else {
            this.size = 5;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x + 1, this.y -1, this.size/3, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fill()
    }
    update(){
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 100;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < 100){
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/20;
            }
            if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/20;
            }
        }
    }
}

function init() {
    backgroundMusic.play();
    bubbleTextArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                bubbleTextArray.push(new Particle(positionX * 8, positionY * 8));
            }
        }
    }
}
init();


console.log(bubbleTextArray);
/** bubble text end **/


// animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbleTextArray.length; i++){
        bubbleTextArray[i].draw();
        bubbleTextArray[i].update();
    }
    handleFish1();
    handleFish2();
    handleFish3();
    handleEnemies();
    player.update();
    player.draw();
    ctx.fillStyle = 'rgba(34,147,214,1)';
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('score: ' + score, 2, 22);
    ctx.fillStyle = 'rgba(34,147,214,1)';
    ctx.fillText('score: ' + score, 0, 20);
    gameFrame += 1;
    if (!gameOver)requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
  canvasPosition = canvas.getBoundingClientRect();
  mouse.x = canvas.width/2;
  mouse.y = canvas.height/2;
});
