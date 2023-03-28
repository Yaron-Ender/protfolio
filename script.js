const html =document.querySelector('html')
const body = document.querySelector("body");
const box3d = document.querySelector(".box-3d")
const svg = document.querySelector('.box-3d svg')
const path = document.querySelector(".box-3d svg path");
const contact = document.querySelector(".contact");
const contactWidth = contact.offsetWidth;
const contactHeight = contact.offHeight;
 const confettiNum = contactWidth / 15;
 console.log(html.clientWidth);
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
// this.element='SPAN'
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
