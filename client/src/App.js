import {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3'
// import Blueberry from './Blueberry/index.js'
import Aura from './Aura/index.js'
import { observer, inject } from "mobx-react";
// const giniSS = require('gini-ss');
let counter = 0

const population = {
  1: 100,
  2: 100,
  3: 100,
  4: 100,
  5: 100,
  6: 100,
  7: 100,
  8: 100,
  9: 100,
  10: 100
}

let gini = 0
let connections = 3
let path=0;

const discounts = {
      0: '🃟_COFFEE_MEAL',
      1: '⚚_TAXIS_MEDECINE_GROCERIES',
      2: '♕_MUSIC_BOOKS_GAMES',
      3: '⚘_FASHION_ELECTRONICS_MOVIES',
      4: '♖_EDUCATION_CARS',
      5: '♔_TRAVEL_HOME',
}

const defaults = {
  numberGeneratorOptions: {
    dataPoints: 100, // Number of data points to generate
    interval: 100, // Number of ms between each data point
    initialValue: 100, // Initial data value
    volatility: .2, // Maximum percent change that can occur
  },
  ticker: {
    enable: true, // Enable or disable ticker
  },
  margins: {
    x: 5,
    y: 10,
  },
  blur: { // SVG blur filter options
    offset: {
      x: 0,
      y: 0,
    },
    amount: 2,
    opacity: 0.05,
    radius: 14,
  },
  transition: { // D3 transition options
    easing: d3.easeLinear, // https://github.com/d3/d3-ease
  },
};

const Kathara = (props) => {
  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    // refreshChart10mm();
    // refreshChart27mm();

    if(!rendered){
    setInterval(() => {

      // window.onload = function() {
      let c = init("kathara").c,
        canvas = init("kathara").canvas,
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight);
      c.fillStyle = "rgba(30,30,30,1)";
      // c.fillRect(0, 0, w, h);
      //initiation

      function calcMass(obj) {
        return 5 * Math.PI * obj.s * obj.s * obj.s / 3;
      }

      class body {
        constructor(x, y, s, v, a) {
          this.a0 = a;
          this.x = x;
          this.y = y;
          this.tail = [{
            x: this.x,
            y: this.y
          }];
          this.s = s;
          this.v0 = v;
          this.v = this.v0;
          this.ang = this.a0;
          this.ax = this.v * Math.cos(this.ang);
          this.ay = this.v * Math.sin(this.ang);
          this.vx = this.ax;
          this.vy = this.ay;
          this.tomove = true;
        }
        reset() {
          // this.x = w/2;
          // this.y = h/2;
          // this.tail = [{
          //   x: this.x,
          //   y: this.y
          // }];
          // this.s = 2;
          // this.v = this.v0;
          // this.ang = this.a0;
          // this.ax = this.v * Math.cos(this.ang);
          // this.ay = this.v * Math.sin(this.ang);
          // this.vx = this.ax;
          // this.vy = this.ay;
          this.tomove = false;
        }
        attract(o) {
          this.dist = Math.sqrt(
            Math.pow(o.x - this.x, 2) + Math.pow(o.y - this.y, 2)
          );
          if (this.dist > this.s + o.s) {
            this.f =
              G *
              calcMass(this) *
              calcMass(o) /
              (Math.pow(o.x - this.x, 2) + Math.pow(o.y - this.y, 2));
            this.ang = Math.atan2(o.y - this.y, o.x - this.x);
          } else {
            this.reset();
          }
          this.addForce(this.f, this.ang);
        }
        move() {
          this.ax *= 0.9991;
          this.ay *= 0.9991;

          this.vx += this.ax * t;
          this.vy += this.ay * t;

          this.vx *= 0.9991;
          this.vy *= 0.9991;

          this.x += this.vx * t;
          this.y += this.vy * t;

          this.tail.push({
            x: this.x,
            y: this.y
          });

          // if (this.tail.length > 400) {
          //   this.tail.splice(0, 1);
          // }

          this.ax = 0;
          this.ay = 0;

          // if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
          //   this.reset();
          // }
        }
        addForce(f, a) {

          this.ax += f * Math.cos(a);
          this.ay += f * Math.sin(a);
        }
        show() {
          if(this.tomove){
            this.move();
            c.beginPath();
            c.arc(this.x, this.y, this.s, 0, 2*Math.PI);
            c.fillStyle = "rgba(255,255,255,0.75)";
            c.fill();
          }
          this.len = this.tail.length;
          c.beginPath();
          for (let k = 0; k < this.len; k++) {
            c.lineTo(this.tail[k].x, this.tail[k].y);
          }
          c.lineWidth = 0.2;
          c.strokeStyle = "rgba(0,0,0,0.75)";
          c.stroke();
        }
      }

      let universe = [],
        i = 0,
        G = 6.7 * Math.pow(10,1),
        t = 0.01,
        atractors = [],
        n = connections,
        num = 20,
        r0 = 100;

      // for (let j = 0; j < 0; j++) {
      //   atractors.push({
      //     x: Math.random() * w,
      //     y: Math.random() * h,
      //     s: Math.random() * 10 + 5
      //   });
      // }
      
      for (let j = 0; j < n; j++) {
        atractors.push({
          x: w/2+r0*Math.cos(j*2*Math.PI/n),
          y: h/2+r0*Math.sin(j*2*Math.PI/n),
          s: 10.2
        });
      }

      // for (i = 0; i < num; i++) {
      //   universe.push(new body(1, i * h / num+h/(2*num), 2, 300, 0));
      // }
      
      for (i = 0; i < num; i++) {
        universe.push(new body(w/2, h/2, 2, 300, i*2*Math.PI/num+Math.PI/num));
      }
      const horo = {
        1: 'yellow',
        6: 'pink',
        11: 'black',
        4: 'red',
        9: 'orange',
        2: 'green',
        7: 'paleblue',
        12: 'red',
        5: 'grey',
        10: 'pink',
        3: 'maroon',
        8: 'darkblue',
      }
      
      function draw() {
        //animation
        
        for(let k = 0; k < 1; k++){
        
        for (let i = 0; i < num; i++) {
          for (let j = 0; j < atractors.length; j++) {
            universe[i].attract(atractors[j]);
          }
        }

        for (let j = 0; j < atractors.length; j++) {
          c.beginPath();
          c.arc(atractors[j].x, atractors[j].y, atractors[j].s, 0, 2 * Math.PI);
          c.fillStyle = Object.values(horo)[j];
          c.fill();
        }

        for (let i = 0; i < num; i++) {
          if (atractors.length == 0) {
            universe[i].move();
          }
          universe[i].show();
        }
          
        }
        
      }

      let mouse = {};
      let last_mouse = {};

      canvas.addEventListener(
        "mousemove",
        function(e) {
          last_mouse.x = mouse.x;
          last_mouse.y = mouse.y;

          mouse.x = e.pageX - this.offsetLeft;
          mouse.y = e.pageY - this.offsetTop;
        },
        false
      );

      canvas.addEventListener(
        "click",
        function(e) {
          atractors.push({ x: mouse.x, y: mouse.y, s: Math.random() * 10 + 5 });
        },
        false
      );

      function init(elemid) {
        let canvas = document.getElementById(elemid),
          c = canvas.getContext("2d");
        return { c: c, canvas: canvas };
      }

      window.requestAnimFrame = function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback);
          }
        );
      };

      function loop() {
        window.requestAnimFrame(loop);
        c.fillStyle = "rgba(255,255,255,1)";
        c.fillRect(0, 0, w, h);
        draw();
      }

      // window.addEventListener("resize", function() {
      //   w = canvas.width 
      //   w = window.innerWidth
      //   h = canvas.height 
      //   h = window.innerHeight;
      //   loop();
      // });

      loop();
      setInterval(loop, 2000 / 60);
    // };

      // setRendered(true)
      if(rendered == false){
        setRendered(true)
      } else{
        setRendered(false)
        document.getElementById('kathara').remove()
      }
    }, 4000)
    }
  }, [rendered])
  return(<canvas id="kathara"></canvas>)
}

function renderPoints(numOfPoints = 16, size = 1000) {
  const polarToCartesian = (r, degrees) => {
    const radians = degrees * Math.PI / 180.0;
    return [r + (r * Math.cos(radians)), r + (r * Math.sin(radians))]
  }

  const random = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);

  const renderLines = (X,Y) => {
    return data.map(entry => {
      const [x,y] = entry;
      const stroke = `hsl(${random(360)}, ${random(100, 50)}%, ${random(90, 30)}%)`;
      const strokeWidth = random(30, 3) / 10;
      if (X !== x && Y !== y) return `<line x1="${X}" y1="${Y}" x2="${x}" y2="${y}" stroke="${stroke}" stroke-width="${strokeWidth}"></line>`
    })
  }

  const radius = size / 2;

  const data = [...new Array(numOfPoints)].map((_a, index) => {
    const angle = 360 / numOfPoints;
    const radian = angle * (index + 1);
    return polarToCartesian(radius, radian)
  })

  // document.getElementById('app').innerHTML = data.map(entry => {
  //   const [x,y] = entry;
  //   return renderLines(x,y).join('');
  // })
}

// @inject( "store" )
// @observer
let ran = 0;
let treeState = 'PRISM'
function App () {

  const [led, setLed] = useState(0)

  // visual
  const [node, setNode] = useState(null)
  const [edge, setEdge] = useState(null)

  // info
  const [planet, setPlanet] = useState(null)
  const [deity, setDeity] = useState('null')
  const [activity, setActivity] = useState([])

  // planets
  const [mercury, setMercury] = useState('white')
  const [venus, setVenus] = useState('white')
  const [earth, setEarth] = useState('white')
  const [mars, setMars] = useState('white')
  const [maldek, setMaldek] = useState('white')
  const [jupiter, setJupiter] = useState('white')
  const [saturn, setSaturn] = useState('white')
  const [uranus, setUranus] = useState('white')
  const [neptune, setNeptune] = useState('white')
  const [pluto, setPluto] = useState('white')
  const [chiron, setChiron] = useState('white')
  const [nibiru, setNibiru] = useState('white')

  // planetCircle
  const [mercuryCircle, setMercuryCircle] = useState('lightgrey')
  const [venusCircle, setVenusCircle] = useState('lightgrey')
  const [earthCircle, setEarthCircle] = useState('lightgrey')
  const [marsCircle, setMarsCircle] = useState('lightgrey')
  const [maldekCircle, setMaldekCircle] = useState('lightgrey')
  const [jupiterCircle, setJupiterCircle] = useState('lightgrey')
  const [saturnCircle, setSaturnCircle] = useState('lightgrey')
  const [uranusCircle, setUranusCircle] = useState('lightgrey')
  const [neptuneCircle, setNeptuneCircle] = useState('lightgrey')
  const [plutoCircle, setPlutoCircle] = useState('lightgrey')
  const [chironCircle, setChironCircle] = useState('lightgrey')
  const [nibiruCircle, setNibiruCircle] = useState('lightgrey')

  // planetUnits
  const [mercuryUnit, setMercuryUnit] = useState(null)
  const [venusUnit, setVenusUnit] = useState(null)
  const [earthUnit, setEarthUnit] = useState(null)
  const [marsUnit, setMarsUnit] = useState(null)
  const [maldekUnit, setMaldekUnit] = useState(null)
  const [jupiterUnit, setJupiterUnit] = useState(null)
  const [saturnUnit, setSaturnUnit] = useState(null)
  const [uranusUnit, setUranusUnit] = useState(null)
  const [neptuneUnit, setNeptuneUnit] = useState(null)
  const [plutoUnit, setPlutoUnit] = useState(null)
  const [chironUnit, setChironUnit] = useState(null)
  const [nibiruUnit, setNibiruUnit] = useState(null)
  let NUM = 16
  let operator = {
    0: (isGrowing) => {
      setEarthUnit(
        <text x="63" y="420" class="small" fill="#000" >
          ☿
        </text>
      )
      setMarsUnit(
        <text x="262" y="420" class="small" fill="#000">
          ♀
        </text>
      )

      setEarth('yellow')
      setEarthCircle('white')
      setMars('green')
      setMarsCircle('white')

      setEdge(
        <rect x="25" y="360" rx="50" width="290" height="110" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}} >
        </rect>
        )
    },
    1: (isGrowing) => {
      setMaldekUnit(
        <text x="163" y="351" class="small" fill="#ffffff">
          ☉
        </text>
      )
      setJupiterUnit(
        <text x="65" y="297" class="small" fill="#ffffff">
          ♂
        </text>
      )

      setMaldek('blue')
      setMaldekCircle('white')
      setJupiter('black')
      setJupiterCircle('white')

      setEdge(
        <rect x="140" y="185" transform="rotate(25 0 0)" rx="50" width="220" height="100" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    2: (isGrowing) => {
      setMercuryUnit(
        <text x="162" y="561" class="small" fill="#000">
          🜃
        </text>
      )
      setVenusUnit(
        <text x="159" y="451" class="small" fill="#000">
          ☽
        </text>
      )

      setMercury('red')
      setMercuryCircle('white')
      setVenus('wheat')
      setVenusCircle('white')

      setEdge(
        <rect x="115" y="400" width="110" height="200" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    3: (isGrowing) => {
      setVenusUnit(
        <text x="159" y="451" class="small" fill="#000">
          ☽
        </text>
      )
      setMarsUnit(
        <text x="264" y="416" class="small" fill="#000">
          ♀
        </text>
      )

      setMars('green')
      setMarsCircle('white')
      setVenus('wheat')
      setVenusCircle('white')

      setEdge(
        <rect x="425" y="-149" width="110" transform="rotate(67 0 0)" height="220" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    4: (isGrowing) => {

      setNeptuneUnit(
        <text x="62" y="180" class="small" fill="#ffffff">
          ♄
        </text>
      )
      setPlutoUnit(
        <text x="263" y="180" class="small" fill="#ffffff">
          ♅
        </text>
      )

      setNeptune('lightgrey')
      setNeptuneCircle('white')
      setPluto('darkblue')
      setPlutoCircle('white')

      setEdge(
        <rect x="25" y="110" width="290" height="110" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    5: (isGrowing) => {
      
      setNibiruUnit(
        <text x="163" y="55" class="small" fill="#00000">
          🜁
        </text>
      )
      setChironUnit(
        <text x="163" y="353" class="small" fill="#fff">
          ☉
        </text>
      )

      setMaldek('blue')
      setMaldekCircle('white')
      setNibiru('white')
      setNibiruCircle('white')

      setEdge(
        <rect x="115" y="5" width="110" height="390" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    6: (isGrowing) => {
      setUranusUnit(
        <text x="65" y="416" class="small" fill="#000">
          ☿
        </text>
      )
      setSaturnUnit(
        <text x="161" y="450" class="small" fill="#000">
          ☽
        </text>
      )

      setVenus('wheat')
      setVenusCircle('white')
      setEarth('yellow')
      setEarthCircle('white')

      setEdge(
        <rect x="180" y="287" transform="rotate(25 0 0)" rx="50" width="220" height="100" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    7: (isGrowing) => {
      setNibiruUnit(
        <text x="163" y="55" class="small" fill="#00000">
          🜁
        </text>
      )
      setPlutoUnit(
        <text x="263" y="180" class="small" fill="#ffffff">
          ♅
        </text>
      )

      setNibiru('white')
      setNibiruCircle('white')
      setPluto('navy')
      setPlutoCircle('white')

      setEdge(
        <rect x="48" y="100" width="110" height="250" rx="50" transform="rotate(-38 0 0)" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    8: (isGrowing) => {
      setSaturnUnit(
        <text x="258" y="297" class="small" fill="#FFFFFF">
          ♃
        </text>
      )
      setPlutoUnit(
        <text x="263" y="180" class="small" fill="#ffffff">
          ♅
        </text>
      )

      setSaturn('purple')
      setSaturnCircle('white')
      setPluto('darkblue')
      setPlutoCircle('white')

      setEdge(
        <rect x="215" y="115" width="110" height="230" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    
    },
    9: (isGrowing) => {
      setSaturnUnit(
        <text x="262" y="297" class="small" fill="#FFFFFF">
          ♃
        </text>
      )
      setMarsUnit(
        <text x="262" y="416" class="small" fill="#FFFFFF">
          ♀
        </text>
      )

      setSaturn('orange')
      setSaturnCircle('white')
      setMars('green')
      setMarsCircle('white')

      setEdge(
        <rect x="215" y="235" width="110" height="230" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    10: (isGrowing) => {
      setMarsUnit(
        <text x="262" y="416" class="small" fill="#FFFFFF">
          ♀
        </text>
      )
      setMercuryUnit(
        <text x="162" y="562" class="small" fill="#ffffff">
          🜃
        </text>
      )

      setMars('green')
      setMarsCircle('white')
      setMercury('red')
      setMercuryCircle('white')

      setEdge(
        <rect x="390" y="150" width="110" transform="rotate(33 0 0)" height="270" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    11: (isGrowing) => {
      setMercuryUnit(
        <text x="162" y="562" class="small" fill="#ffffff">
          🜃
        </text>
      )

      setEarthUnit(
        <text x="65" y="416" class="small" fill="#000">
          ☿
        </text>
      )

      setEarth('yellow')
      setEarthCircle('white')
      setMercury('red')
      setMercuryCircle('white')

      setEdge(
        <rect x="-258" y="320" width="110" height="270" rx="50" transform="rotate(-38 0 0)" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    12: (isGrowing) => {
      setJupiterUnit(
        <text x="65" y="297" class="small" fill="#FFFFFF">
          ♂
        </text>
      )
      setEarthUnit(
        <text x="65" y="416" class="small" fill="#000">
          ☿
        </text>
      )

      setJupiter('black')
      setJupiterCircle('white')
      setEarth('yellow')
      setEarthCircle('white')

      setEdge(
        <rect x="15" y="235" width="110" height="230" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    13: (isGrowing) => {
      setJupiterUnit(
        <text x="65" y="297" class="small" fill="#FFFFFF">
          ♂
        </text>
      )
      setNeptuneUnit(
        <text x="60" y="175" class="small" fill="#000000">
          ♄
        </text>
      )

      setNeptune('lightgrey')
      setNeptuneCircle('white')
      setJupiter('black')
      setJupiterCircle('white')

      setEdge(
        <rect x="15" y="115" width="110" height="230" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    14: (isGrowing) => {
      setNibiruUnit(
        <text x="163" y="55" class="small" fill="#00000">
          🜁
        </text>
      )
      setNeptuneUnit(
        <text x="60" y="175" class="small" fill="#000000">
          ♄
        </text>
      )

      setNeptune('lightgrey')
      setNeptuneCircle('white')
      setNibiru('white')
      setNibiruCircle('white')

      setEdge(
        <rect x="110" y="-110" width="110" transform="rotate(38 0 0)" height="250" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    15: (isGrowing) => {
      setChironUnit(
        <text x="163" y="353" class="small" fill="#fff">
          ☉
        </text>
      )
      setVenusUnit(
        <text x="159" y="451" class="small" fill="#000">
          ☽
        </text>
      )

      setVenus('wheat')
      setVenusCircle('white')
      setMaldek('blue')
      setMaldekCircle('white')

      setEdge(
        <rect x="115" y="290" width="110" height="210" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    17: (isGrowing) => {
      setChironUnit(
        <text x="163" y="353" class="small" fill="#fff">
          ☉
        </text>
      )
      setMarsUnit(
        <text x="262" y="420" class="small" fill="#ffffff">
          ♀
        </text>
      )

      setMars('green')
      setMarsCircle('white')
      setMaldek('blue')
      setMaldekCircle('white')

      setEdge(
        <rect x="270" y="163" transform="rotate(31 0 0)" rx="50" width="220" height="100" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    18: (isGrowing) => {
      setJupiterUnit(
        <text x="65" y="297" class="small" fill="#FFFFFF">
          ♂
        </text>
      )
      setSaturnUnit(
        <text x="262" y="295" class="small" fill="#ffffff">
          ♃
        </text>
      )

      setJupiter('black')
      setJupiterCircle('white')
      setSaturn('purple')
      setSaturnCircle('white')

      setEdge(
        <rect x="25" y="235" width="290" height="110" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    19: (isGrowing) => {
      setSaturnUnit(
        <text x="262" y="298" class="small" fill="#000">
          ♃
        </text>
      )
      setChironUnit(
        <text x="163" y="353" class="small" fill="#000">
          ☉
        </text>
      )

      setSaturn('purple')
      setSaturnCircle('white')
      setMaldek('blue')
      setMaldekCircle('white')

      setEdge(
        <rect x="335" y="-79" width="110" transform="rotate(51 0 0)" height="220" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    20: (isGrowing) => {
      setEarthUnit(
        <text x="65" y="416" class="small" fill="#000">
          ☿
        </text>
      )
      setChironUnit(
        <text x="163" y="353" class="small" fill="#fff">
          ☉
        </text>
      )

      setEarth('yellow')
      setEarthCircle('white')
      setMaldek('blue')
      setMaldekCircle('white')

      setEdge(
        <rect x="315" y="34" width="110" transform="rotate(51 0 0)" height="220" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
    21: (isGrowing) => {
      setNeptuneUnit(
        <text x="63" y="180" class="small" fill="#000">
          ♄
        </text>
      )
      setChironUnit(
        <text x="163" y="353" class="small" fill="#fff">
          ☉
        </text>
      )

      setNeptune('lightgrey')
      setNeptuneCircle('white')
      setMaldek('blue')
      setMaldekCircle('white')
      setEdge(
        <rect x="134" y="-19" transform="rotate(59 0 0)" rx="50" width="310" height="100" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
      )
    },
    16: (isGrowing) => {
      setPlutoUnit(
        <text x="263" y="180" class="small" fill="#ffffff">
          ♅
        </text>
      )
      setChironUnit(
        <text x="163" y="353" class="small" fill="#fff">
          ☉
        </text>
      )

      setMaldek('blue')
      setMaldekCircle('white')
      setPluto('navy')
      setPlutoCircle('white')

      setEdge(
        <rect x="270" y="-55" width="110" transform="rotate(33 0 0)" height="300" rx="50" style={{fill: isGrowing ? "rgb(0,0,0)" : 'red', strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
        </rect>
        )
    },
  }

  function clear() {
    setMercury('white')
    setVenus('white')
    setEarth('white')
    setMars('white')
    setMaldek('white')
    setJupiter('white')
    setSaturn('white')
    setUranus('white')
    setNeptune('white')
    setPluto('white')
    setChiron('white')
    setNibiru('white')

    setMercuryCircle('lightgrey')
    setVenusCircle('lightgrey')
    setEarthCircle('lightgrey')
    setMarsCircle('lightgrey')
    setMaldekCircle('lightgrey')
    setJupiterCircle('lightgrey')
    setSaturnCircle('lightgrey')
    setUranusCircle('lightgrey')
    setNeptuneCircle('lightgrey')
    setPlutoCircle('lightgrey')
    setChironCircle('lightgrey')
    setNibiruCircle('lightgrey')

    setMercuryUnit(null)
    setVenusUnit(null)
    setEarthUnit(null)
    setMarsUnit(null)
    setMaldekUnit(null)
    setJupiterUnit(null)
    setSaturnUnit(null)
    setUranusUnit(null)
    setNeptuneUnit(null)
    setPlutoUnit(null)
    setChironUnit(null)
    setNibiruUnit(null)
    setEdge(null)
  }
  const [sections, setSections] = useState([])
  const [init, setInit] = useState(false)

  const COUNTER = 1000
  const interval = async () => {
    console.log(treeState)
    counter++
    // ran = 5
      clear()
      console.log('timer', counter)
      // const res = await fetch(`${'http://0.0.0.0:4000'}/live`)
      const res = await fetch(`${'http://216.128.185.237:4000'}/live`)
      const json = await res.json()
      // const tvls = Object.values(json.tvl).sort().filter((el) => el > 0)
      // Sort the object by values
      // json.tvl.str = -0.05
      const sortedObject = Object.fromEntries(
        Object.entries(json.tvl)
          .filter(([key, value]) => value !== 0) // Remove elements with a value of 0
          .filter(([key, value]) => value > 0)
          .sort((a, b) => b[1] - a[1]) // Sort in descending order of values
      );

      console.log(sortedObject);
      const topKey = Object.keys(sortedObject)[0]

      // for testing
      // operator[(NUM).toString()]()
      
      
      if(treeState == 'PRISM'){
        if(topKey){
          switch(topKey){
            case 'str':
              operator[(18).toString()](true)
              break;
            case 'agi':
              operator[(9).toString()](true)
              break;
            case 'wis':
              operator[(12).toString()](true)
              break;
            case 'hrt':
              operator[(21).toString()](true)
              break;
            case 'int':
              operator[(5).toString()](true)
              break;
          }
        }else {
          const sortedObject = Object.fromEntries(
            Object.entries(json.tvl)
              .filter(([key, value]) => value !== 0) // Remove elements with a value of 0
              .sort((a, b) => a[1] - b[1]) // Sort in descending order of values
          );
          const topKey = Object.keys(sortedObject)[0]
          console.log(topKey)
          switch(topKey){
            case 'str':
              operator[(18).toString()](false)
              break;
            case 'agi':
              operator[(9).toString()](false)
              break;
            case 'wis':
              operator[(12).toString()](false)
              break;
            case 'hrt':
              operator[(21).toString()](false)
              break;
            case 'int':
              operator[(5).toString()](false)
              break;
          }
        }
      } else if(treeState == 'DUAL') {
        const maxCombination = findMaxTVLCombination(sortedObject);
        if(maxCombination){
          switch(maxCombination){
            case 'agi_str':
              operator[(13).toString()](true)
              break;
            case 'str_wis':
              operator[(19).toString()](true)
              break;
            case 'hrt_str':
              operator[(7).toString()](true)
              break;
            case 'int_str':
              operator[(14).toString()](true)
              break;
            case 'agi_wis':
              operator[(20).toString()](true)
              break;
            case 'agi_hrt':
              operator[(17).toString()](true)
              break;
            case 'agi_int':
              operator[(11).toString()](true)
              break;
            case 'hrt_wis':
              operator[(6).toString()](true)
              break;
            case 'int_wis':
              operator[(10).toString()](true)
              break;
            case 'hrt_int':
              operator[(15).toString()](true)
              break;
          }
        }else {
          const sortedObject = Object.fromEntries(
            Object.entries(json.tvl)
              .filter(([key, value]) => value !== 0) // Remove elements with a value of 0
              .sort((a, b) => a[1] - b[1]) // Sort in descending order of values
          );
          const topKey = Object.keys(sortedObject)[0]
          const minCombination = findMaxTVLCombination(sortedObject);
          switch(minCombination){
            case 'agi_str':
              operator[(13).toString()](false)
              break;
            case 'wis_str':
              operator[(19).toString()](false)
              break;
            case 'hrt_str':
              operator[(7).toString()](false)
              break;
            case 'int_str':
              operator[(14).toString()](false)
              break;
            case 'agi_wis':
              operator[(20).toString()](false)
              break;
            case 'agi_hrt':
              operator[(17).toString()](false)
              break;
            case 'agi_int':
              operator[(11).toString()](false)
              break;
            case 'hrt_wis':
              operator[(6).toString()](false)
              break;
            case 'int_wis':
              operator[(10).toString()](false)
              break;
            case 'hrt_int':
              operator[(15).toString()](false)
              break;
          }
        }
      } else {
        const sortedObject = Object.fromEntries(
          Object.entries(json.tvl_elements)
            .filter(([key, value]) => value !== 0) // Remove elements with a value of 0
            .filter(([key, value]) => value > 0)
            .sort((a, b) => b[1] - a[1]) // Sort in descending order of values
        );

        const topKey = Object.keys(sortedObject)[0]
        console.log(topKey)
        console.log(json.tvl_elements)
        if(topKey){
          switch(topKey){
            case 'air':
              operator[(1).toString()](true)
              break;
            case 'dark':
              operator[(16).toString()](true)
              break;
            case 'earth':
              operator[(2).toString()](true)
              break;
            case 'fire':
              operator[(1).toString()](true)
              break;
            case 'light':
              operator[(4).toString()](true)
              break;
            case 'metal':
              operator[(3).toString()](true)
              break;
            case 'mind':
              operator[(8).toString()](true)
              break;
            case 'water':
              operator[(0).toString()](true)
              break;
          }
        } else {
          const sortedObject = Object.fromEntries(
            Object.entries(json.tvl_elements)
              .filter(([key, value]) => value !== 0) // Remove elements with a value of 0
              .sort((a, b) => a[1] - b[1]) // Sort in descending order of values
          );

          const topKey = Object.keys(sortedObject)[0]
          switch(topKey){
            case 'air':
              operator[(1).toString()](false)
              break;
            case 'dark':
              operator[(16).toString()](false)
              break;
            case 'earth':
              operator[(2).toString()](false)
              break;
            case 'fire':
              operator[(1).toString()](false)
              break;
            case 'light':
              operator[(4).toString()](false)
              break;
            case 'metal':
              operator[(3).toString()](false)
              break;
            case 'mind':
              operator[(8).toString()](false)
              break;
            case 'water':
              operator[(0).toString()](false)
              break;
          }
        }


      }

      function findMaxTVLCombination(tvlObject) {
        let maxCombination = "";
        let maxValue = -Infinity;
      
        const keys = Object.keys(tvlObject);
      
        for (let i = 0; i < keys.length; i++) {
          for (let j = i + 1; j < keys.length; j++) {
            const key1 = keys[i];
            const key2 = keys[j];
            const combinationKeys = [key1, key2].sort(); // Sort keys alphabetically
            const combinationValue = tvlObject[combinationKeys[0]] + tvlObject[combinationKeys[1]];
      
            if (combinationValue > maxValue) {
              maxValue = combinationValue;
              maxCombination = combinationKeys.join("_");
            }
          }
        }
      
        return maxCombination;
      } 
  }
  useEffect(() => {
      interval()
    // return () => {interval()}
  }, [init, treeState, led])

  return (
    <div>
            <br/>
      <div style={{marginLeft: '-8.4vw',width: '10vw', position: 'absolute'}}>
        <svg x="40" y="0" width="400" height="650">
          {/**/}
          {edge}

          {/**/}
          <circle cx="170" cy="50" r="40" stroke={nibiruCircle} strokeWidth="4" fill={nibiru} />
          
          {/* <circle cx="170" cy="140" r="40" stroke={chironC  ircle} strokeWidth="4" fill={chiron} /> */}
          
           <circle cx="70" cy="170" r="40" stroke={neptuneCircle} strokeWidth="4" fill={neptune} />
           <circle cx="270" cy="170" r="40" stroke={plutoCircle} strokeWidth="4" fill={pluto} />
           
           {/* <circle cx="170" cy="240" r="40" stroke={uranusCircle} strokeWidth="4" fill={uranus} /> */}
           <circle cx="270" cy="290" r="40" stroke={saturnCircle} strokeWidth="4" fill={saturn} />
           
           <circle cx="70" cy="290" r="40" stroke={jupiterCircle} strokeWidth="4" fill={jupiter} />
           <circle cx="170" cy="345" r="40" stroke={maldekCircle} strokeWidth="4" fill={maldek} />
           
           <circle cx="70" cy="410" r="40" stroke={earthCircle} strokeWidth="4" fill={earth} />
           <circle cx="270" cy="410" r="40" stroke={marsCircle} strokeWidth="4" fill={mars} />
           
           
           <circle cx="170" cy="445" r="40" stroke={venusCircle} strokeWidth="4" fill={venus} />
          <circle cx="170" cy="555" r="40" stroke={mercuryCircle} strokeWidth="4" fill={mercury} />

          {/**/}
          {mercuryUnit}
          {venusUnit}
          {earthUnit}
          {marsUnit}
          {maldekUnit}
          {jupiterUnit}
          {saturnUnit}
          {uranusUnit}
          {neptuneUnit}
          {plutoUnit}
          {chironUnit}
          {nibiruUnit}
        </svg> 
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <button className='redButton' onClick={() => {
        treeState = treeState == 'PRISM' ? 'DUAL' : treeState == 'ELEMENTS' ? 'PRISM' : 'ELEMENTS' 
        setLed(led+1)
        console.log(treeState)
      }}>{treeState.toString()}</button>
      <br/>
      <br/>
</div>
  );
}

export default App;