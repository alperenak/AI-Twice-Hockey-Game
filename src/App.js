import React, { Component } from 'react';
import './App.css';
import { NeuralNetwork } from './nn';
import { runInThisContext } from 'vm';
export default class App extends Component {

constructor(props){
  super(props)
  this.timer=setInterval(this.loop,1000/500)
  this.loop=this.loop.bind(this)
}
componentDidMount(){
  this.score=0
  this.score1=0
this.canvas=document.getElementById("canvas")
this.context=this.canvas.getContext("2d")
this.clientPlayer=[new Client(this.context)]
this.ball=[new Ball(this.context,this.score,this.score1)]
this.intelligenceEnemy=this.generateEnemys()
this.deadEnemys=[]
 
  this.context.fillStyle="black"
  this.context.fillRect(800,0,50,500)
}
generateEnemys=()=>{
  const enemys=[]
for (let i = 0; i< 250;i++) {
  enemys.push(new Enemy(this.context))
  // this.brain=this.deadSnakes.length && this.pickOne().brain;

}
return enemys


}
// pickOne = () => {
//   let index = 0;

//   let r = Math.random();
//   while (r > 0) {

//     r -= this.deadEnemys[index].fitness;
//     index += 1;
  
//   }
//   index -= 1;


//   return this.deadEnemys[index];

// }
update=()=>{
 if(this.intelligenceEnemy.length===0){

  for (let i = 0; i< 250;i++) {
    this.intelligenceEnemy.push(new Enemy(this.context))
    // this.brain=this.deadSnakes.length && this.pickOne().brain;
  
  }
 }
this.deadEnemys.push(...this.intelligenceEnemy.filter(enemy=>enemy.Isdead))

this.intelligenceEnemy=this.intelligenceEnemy.filter(enemy=>!enemy.Isdead)
console.log(this.deadEnemys.length)
  document.addEventListener("keydown",(e)=>{
if(e.keyCode===32){

  this.intelligenceEnemy.forEach((enemy)=>enemy.Isdead=true)

}
  })
 
this.clientPlayer.forEach((client)=>{
  
  document.addEventListener("mousemove",(e)=>{
    
    const rect=this.canvas.getBoundingClientRect();
    
  this.posX=Math.floor((e.clientX-rect.left/(rect.right-rect.left)*this.canvas.width)-client.Bwidth/2)
 
  client.x=this.posX
  if(client.x>800-client.Bwidth){
    this.posX=800-client.Bwidth/2
    client.x=800-client.Bwidth
    
    }
    else if(client.x<=0){
      this.posX=0
      client.x=0
     
    }

  })
  this.ball.forEach((ball)=>{

    if(ball.cX+ball.radius>=798||ball.cX-ball.radius<=2){
  
      ball.ballVelocityX=ball.ballVelocityX*-1
    }

    else if(ball.cY>=500){
      ball.score1+=1
     
      ball.cX=Math.random()*400+200
      ball.cY=Math.random()*50+200
      ball.ballVelocityX=((Math.random()*-1)+(Math.random()*1))*5
      ball.ballVelocityY=4.5
        }
        else if(ball.cY<=0){
          ball.cX=Math.random()*400+200
          ball.cY=Math.random()*50+200
          ball.score+=1
          ball.ballVelocityX=((Math.random()*-1)+(Math.random()*1))*5
          ball.ballVelocityY=4.5
      
        }
        if(ball.score<=20){
          if(ball.cY+ball.radius>498){
            ball.ballVelocityY=ball.ballVelocityY*-1
          }

        }
if(ball.score>=20){

  if(ball.cX+ball.radius>=client.x&&ball.cX+ball.radius<=client.x+120&&ball.cY+ball.radius>=client.y 
    ){
      ball.ballVelocityY=ball.ballVelocityY*-1

    }

}
 
 

if(ball.score>=20){
  this.context.fillStyle="black"
this.context.fillRect(client.x,client.y,client.Bwidth,client.height)
}

    
  this.intelligenceEnemy.forEach((enemy)=>{

    if(enemy.Ix>800-enemy.IBwidth){
   
      enemy.Ix=800-enemy.IBwidth
      enemy.Isdead=true
      
      }
      else if(enemy.Ix<=0){
        enemy.Isdead=true
      
        enemy.Ix=0

      }


    


     
      
      if(ball.cX+ball.radius>=enemy.Ix-3&&ball.cX+ball.radius<=enemy.Ix+15&&ball.cY+ball.radius<=enemy.Iy+45
        ){
      ball.ballVelocityY=ball.ballVelocityY*-1

        }
      
    })             

  })
 
})

}

loop=()=>{
this.clientPlayer.forEach(client=>client.draw())
this.clientPlayer.forEach(client=>client.update())
this.ball.forEach(client=>client.draw())
this.ball.forEach(client=>client.update())
this.intelligenceEnemy.forEach(client=>client.update())
this.intelligenceEnemy.forEach(client=>client.draw())

  this.update()
}

render(){
  return (
    <div className="App">
      <canvas id="canvas" width="850"height="500" style={{backgroundColor:"white",border:"solid 2px",margin:150}} ></canvas>


    </div>
  );
}

}
class Client{

constructor(context){
  this.ball=[new Ball()]

this.context=context
this.height=20
this.Bwidth=120
this.x=400-(this.Bwidth)
this.y=500-(this.height)


}



draw(){
  this.context.fillStyle="pink"
  this.context.fillRect(0,0,850,500)
  // console.log(this.score1)




}
update=()=>{


}

}


class  Ball{
constructor(context,score,score1){
this.score=score
this.score1=score1
this.context=context



this.cX=Math.random()*400+200
this.cY=Math.random()*50+200
this.radius=10

this.ballVelocityX=((Math.random()*-1)+(Math.random()*1))*2+3.5
this.ballVelocityY=1+3.5

}

draw(){


  this.context.fillStyle="red"
  this.context.beginPath();
  this.context.arc(this.cX, this.cY, this.radius, 0, 2 * Math.PI);
  this.context.fill();

  this.context.fillStyle="white"
  this.context.font = "30px Arial";
  this.context.fillText(this.score1, 810, 50);
  this.context.fillText(this.score, 810, 470);
}


update(){

    this.cX+=this.ballVelocityX
    this.cY+=this.ballVelocityY


}
}
class Enemy{
constructor(context){
this.context=context
this.Iheight=20
this.IBwidth=15
this.Ix=400-this.IBwidth
this.Iy=0
this.Isdead=null
this.brain=new NeuralNetwork(4,4,2)
}
think=()=>{
  const ball=new Ball()

  const inputs=[
 (this.Ix-ball.cX)/800,(this.Iy-ball.cY+ball.radius)/500,
 (0-this.Ix)/800,(680-this.Ix)/800

  ];
  //range 0,1
  const output=this.brain.predict(inputs)
 if(output[0]<output[1]){

this.turnLeft()

 }
 else if(output[1]>0.5){
  this.turnRight()


 }

  






}
turnLeft(){


this.Ix-=1







}
turnRight(){

this.Ix+=1





}
draw(){
  this.context.fillStyle="black"
  this.context.fillRect(this.Ix,this.Iy,this.IBwidth,this.Iheight)

}

update(){
if(this.Ix>=800-this.IBwidth){
  this.Ix=800-this.IBwidth
}
else if(this.Ix<=0){
  this.Ix=0
}
this.think()




}



}