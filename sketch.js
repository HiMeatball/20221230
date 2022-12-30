var song
var songIsplay=false
var amp
var vol=0
var m_x,m_y
var music_btn,mouse_btn,Speech_btn
var mosueIsplay=true
var myRec = new p5.SpeechRec();
var result

function setup() {
  createCanvas(windowWidth, windowHeight);

  music_btn = createButton("暫停音樂")
  music_btn.position(10,10)
  music_btn.size(250, 100);
  music_btn.style('background-color', 'black');
  music_btn.style('font-size', '44px');
  music_btn.style('color', 'white');
  music_btn.mousePressed(music_btn_pressed)

  mouse_btn = createButton("播放音樂")
  mouse_btn.position(10,140)
  mouse_btn.size(250, 100);
  mouse_btn.style('background-color', 'black');
  mouse_btn.style('font-size', '44px');
  mouse_btn.style('color', 'white');
  mouse_btn.mousePressed(mouse_btn_pressed)
  
  Speech_btn = createButton("語音辨識(播放/暫停)")
  Speech_btn.position(10,260)
  Speech_btn.size(250, 100);
  Speech_btn.style('background-color', 'black');
  Speech_btn.style('font-size', '32px');
  Speech_btn.style('color', 'white');
  Speech_btn.mousePressed(Speech_btn_pressed)

}

function draw() {
  background('#f2e8cf');

  // fill('black')
	// textSize(50)
	// text( int(mouseX)+" , "+int(mouseY),50,50 )
  
  push()
  translate(width/2,height/3)

  fill(0)
  ellipse(-170,-100,120) //左包包頭
  fill(0) 
  ellipse(170,-100,120) //左包包頭

  fill('#d62828')
  stroke(0)
  strokeWeight(5)
  ellipse(-110,-65,85) //左髮帶
  fill('#d62828')
  stroke(0)
  strokeWeight(5)
  ellipse(110,-65,85) //右髮帶
  
  fill(0)
  ellipse(40,250,60,200) //右腳
  fill(0)
  ellipse(-40,250,60,200) //左腳

  fill('#ffe8d6')
  ellipse(148,217,45) //右手
  fill('#ffe8d6')
  ellipse(-148,217,45) //左手

  fill('#d62828')
  beginShape() //右手袖子
  curveVertex(80,80)
  curveVertex(162,190)
  curveVertex(120,225)
  curveVertex(75,100)
  endShape(CLOSE)
  fill('#d62828')
  beginShape() //左手袖子
  curveVertex(-80,80)
  curveVertex(-162,190)
  curveVertex(-120,225)
  curveVertex(-75,100)
  endShape(CLOSE)

  // fill('#d62828')
  // noStroke()
  // arc(0,245,245,100,100,250,OPEN)

  fill('#d62828')
  stroke(0)
  beginShape() //身體
  vertex(75,80)
  vertex(125,245)
  vertex(-125,245)
  vertex(-75,80)
  endShape(CLOSE)

  fill(0)
  ellipse(0,-20,300,250) //頭髮

  fill('#ffe8d6')
  ellipse(0,0,250,200) //臉

  fill('#fec5bb')
  noStroke()
  ellipse(77,40,40) //右腮紅
  fill('#fec5bb')
  noStroke()
  ellipse(-77,40,40) //左腮紅
  
  // fill('#ffe8d6')
  // stroke(0)
  // arc(0,40,40,30,0,-330,OPEN) //嘴巴
  
  stroke(0)
  line(105,-10,45,10) //右眼
  stroke(0)
  line(-105,-10,-45,10) //左眼

  fill('#ffe8d6')
  arc(75,-60,80,20,10,-120,OPEN) //左眉
  fill('#ffe8d6')
  arc(-75,-60,80,20,10,-120,OPEN) //右眉

  if(mouseIsPressed) //嘴巴
  {
    fill('while')
    arc(0,40,120,60,0,PI+TWO_PI,CHORD)
    stroke(0)
    line(0,40,0,68)
    line(-30,40,-30,63)
    line(30,40,30,63)
  }
  else
  {
    fill('#ffe8d6')
    arc(0,40,40,30,0,PI+TWO_PI,OPEN)
  }
  
  pop()

  push()
    textSize(50)
    fill(255,0,0)  
    text(result,1100,100);   
  pop()
  
}

function preload()
  {
  song = loadSound("pucca.mp3");
}

function mousePressed()
  {
   if(!songIsplay){
     song.play()
     songIsplay = true
     amp=new p5.Amplitude()
   }
   else{
     song.pause()
     songIsplay = false
   }
}

function music_btn_pressed(){
  song.stop()
  song.play()
  songIsplay = true
  mosueIsplay = false
  amp=new p5.Amplitude()

  if(songIsplay){
    vol = amp.getLevel()
    m_x =map(vol,0,1,0,width) 
    m_y= map(vol,0,1,0,height)
  }
  else
  if(mosueIsplay)
  {
    m_x = mouseX
    m_y= mouseY

  }
}

function mouse_btn_pressed(){
  song.pause()
  mosueIsplay = true
  songIsplay = false
}

function Speech_btn_pressed(){
  myRec.onResult = showResult;
  myRec.start();  
}

function showResult()
	{
		if(myRec.resultValue==true) {
            //顯示辨識文字
          push()
            translate(0,0)
            background(192, 255, 192);
            fill(255,0,0)
            textStyle("italic")
            text(myRec.resultString,1200,10);
            text(myRec.resultString,0, height/2);
          pop()
        //=======================
          result = myRec.resultString
          if(myRec.resultString==="播放")
          {
            music_btn_pressed()
          }
          if(myRec.resultString==="暫停")
          {
            song.pause()
            mosueIsplay = true
            songIsplay = false
            }
		}
	}