const html =document.querySelector('html')
const body = document.querySelector("body");
const box3d = document.querySelector(".box-3d")
const svg = document.querySelector('.box-3d svg')
const path = document.querySelector(".box-3d svg path");
const contact = document.querySelector(".contact");
const cnvLeft = document.querySelector(".cnv-left");
const cnvRight = document.querySelector(".cnv-right");
const ctx = cnvLeft.getContext("2d");
const ctx2 = cnvRight.getContext("2d");
const parcticleArray=[]
//the counter is used for dermine how many ciceles will be
let counter = 0;
const contactWidth = contact.offsetWidth;
const contactHeight = contact.offHeight;
 const confettiNum = contactWidth / 15;
 console.log(cnvLeft.clientWidth,cnvLeft.offsetWidth,cnvLeft.width);
//Function
const random = (min,max)=>{
return Math.floor(Math.random() * (max - min) + min); 
}
const shapesArr = ['circle','parallelogram','star','rhombus'];
class Shape{
constructor(){
this.height=15;
this.width=15;
this.backgroundColor=`hsl(${Math.floor(Math.random()*360)},80%,70%)`

}
createEl(i){
random(100,300)
const div = document.createElement('DIV')
div.classList.add('confetti')
div.style.width=`${this.width}px`;
div.style.height = `${this.height}px`;
div.style.backgroundColor=`${this.backgroundColor}`;
 div.style.marginLeft=`${(this.width * i)}px`;
div.style.position='absolute'
div.style.clipPath = this.createShape().shape;
div.style.offsetRotate='360 deg'
div.style.top='0%';
 div.style.left='0%'
 div.style.opacity='0';
div.style.offsetPath = `path("M 0 0 Q 81 63 -2 86 Q -54 135 -2 198")`;
if (i > confettiNum/2) 
{
  div.style.offsetPath = `path("M 0 0 Q -97 57 -2 86 Q -54 135 -2 198")`;
}
return div;
}
createShape(){
 const shape = shapesArr[Math.floor(Math.random()*4)]
 switch (shape) {
  case "circle":
    return {shape:'circle(50% at 50% 50%)'};
  case "parallelogram":
    return {shape:"polygon(25% 0%, 59% 1%, 31% 100%, 0% 100%)"};
  case "star":
    return {shape:"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"};
  case 'rhombus':
    return {shape:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"};
 }
return this
}
}//end of class

for (let i = 1; i < confettiNum; i++) {
  let el = new Shape().createEl(i);
contact.appendChild(el)
}
const confettiFrames = [
  { transform: "scale(0)", offsetDistance: "0%", opacity: 0, offset: 0 },
  { offsetDistance: "2%", transform: "scale(1)",opacity:1, offset: 0.15 },
  { offsetDistance: "50%", offset: 0.5 },
  { opacity: 1, offset: 0.7 },
  { offsetDistance: "100%", opacity: 0, offset: 1 },
];
const confettiTiming = (i) => {
  return {
    duration:(10000 + (`${i}` * 106)),
    fill: "forwards",
    iterations: Infinity,
    delay: `${i * 500}`,
  };
};

//SVG ANIMATION
addEventListener('load',()=>{
  if(html.clientWidth>580){
    document.querySelectorAll(".confetti").forEach((div, index) => {
      div.animate(confettiFrames, confettiTiming(index));
    });
  }
})

//canavs animation
 class Particle {
   constructor(color) {
     this.x = cnvLeft.width/2;
     this.y = cnvLeft.height/2;
     this.size = Math.random() * 4 + 1;
     this.speedX = Math.random() * 3 - 1.5;
     this.speedY = Math.random() *3 - 1.5;
     this.colorString = color;
     this.speedX2 = Math.random() * 3 - 1.5;
     this.speedY2 = Math.random() *3 - 1.5;
   }
   update() {
    if(this.size>2){
this.x += this.speedX;
this.y += this.speedY;
    }
   if (this.size > 0.2) this.size -= 0.02;
   return this;
   }
   updateLastParticles() {
this.x += this.speedX*0.3;
this.y += this.speedY*0.3;
   return this;
   }
   draw() {
     ctx.beginPath();
     ctx.fillStyle = `hsl(${this.colorString})`;
     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
     ctx.fill();
     ctx2.beginPath();
     ctx2.fillStyle = `hsl(${this.colorString})`;
     ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
     ctx2.fill();
     return this;
   }
 }
 const removeParticle =(i)=>{
   parcticleArray.splice(i,1)
   if(counter>11){
   clearInterval(particleFormation);
   }
 }
 const handlePracticle = () => {
  parcticleArray.forEach((p, index) => {
    if(counter<11){
    p.size<0.2?removeParticle(index): p.update().draw();
  }
  if(counter===11){
  (p.x>cnvLeft.width||p.y>cnvLeft.height||p.x<1||p.y<1)?removeParticle(index): p.updateLastParticles().draw();
  }
  });
};
 //function that gives random color 
function particleColor() {
  const hslString = `${Math.floor(Math.random() * 360)},100%,50%`;
  return hslString;
}
 const particleFormation = setInterval(() => {
   if(counter<11){
      counter++;
      const color = particleColor();
      for (let i = 0; i < 100; i++) {
        const p = new Particle(color);
        parcticleArray.push(p);
      }
    }
 },2000);
function animate() {
  if(counter<11){
    ctx.clearRect(0, 0, cnvLeft.width, cnvLeft.height);
    ctx2.clearRect(0, 0, cnvLeft.width, cnvLeft.height);
     handlePracticle();
    requestAnimationFrame(animate);
  }
  
  if (counter===11) {
  if (parcticleArray.length>2){
  ctx.fillStyle='rgba(51,51,51,0.05)'
  ctx.fillRect(0, 0, cnvLeft.width, cnvLeft.height);
  ctx2.fillStyle='rgba(51,51,51,0.05)'
  ctx2.fillRect(0, 0, cnvLeft.width, cnvLeft.height);
  // ctx.clearRect(0, 0, cnvLeft.width, cnvLeft.height);
  handlePracticle();
  requestAnimationFrame(animate);
  }
else{
  ctx.clearRect(0, 0, cnvLeft.width, cnvLeft.height);
  ctx2.clearRect(0, 0, cnvLeft.width, cnvLeft.height);
  }
  }
}
const reqAnim = requestAnimationFrame(animate);



