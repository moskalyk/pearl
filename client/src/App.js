import {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3'
import Blueberry from './Blueberry/index.js'
import Aura from './Aura/index.js'
import { observer, inject } from "mobx-react";
const giniSS = require('gini-ss');
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
// Exchange Rate Line Chart class
// @param {string} [el] ID selector for chart
// @param {arr} [data] Sample data
class ExchangeChart {
  constructor(
    selector = '',
    data = [100,1000,100]
  ) {
    Object.assign(this, defaults);

    this.selector = selector;
    this.el = document.getElementById(this.selector.replace('#', ''));
    this.data = data;
    this.resizeTimer = null

    if (
      !this.selector.length ||
      !this.data.length ||
      !this.el
    ) {
      if (!this.selector.length) {
        console.log('Error: No target element specified');
      }

      if (!this.el) {
        console.log('Error: Target element not found');
      }

      if (!this.data.length) {
        console.log('Error: No data provided');
      }

      return;
    }

    this.ranges = {};

    this.buildChart();
  }

  buildChart() {
    this.setEvents();
    this.setChartDimensions();
    this.setRanges();
    this.defineLine();
    this.initialiseChart();
    this.renderData(this.data);

    if (this.ticker.enable) {
      this.startTicker();
    }
  }

  setEvents() {
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      
      clearTimeout(this.resizeTimer);

      this.resizeTimer = setTimeout(() => {
        clearInterval(this.tickerInterval);
        clearTimeout(this.tickerTimeout);

        this.setChartDimensions();

        if (this.ticker.enable) {
          this.startTicker();
        }
      }, 200);
    });
    
    this.button = document.getElementById('generate');

    this.button.addEventListener('click', (e) => {
      e.preventDefault();

      clearInterval(this.tickerInterval);
      clearTimeout(this.tickerTimeout);

      this.renderData(ExchangeChart.generateSampleData(defaults.numberGeneratorOptions));

      if (this.ticker.enable) {
        this.startTicker();
      }

      return false;
    });
  }
  
  setChartDimensions() {
    this.dimensions = {
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    };
    
    if (this.svg) {
      this.svg
        .attr('width', this.dimensions.width)
        .attr('height', this.dimensions.height);
      
      this.wrapper
        .attr('width', this.dimensions.width)
        .attr('height', this.dimensions.height);
    }
  }

  // Set ranges based on SVG canvas dimensions
  setRanges() {
    this.ranges.x = d3.scaleTime()
      .range([0, this.dimensions.width - this.margins.x]);

    this.ranges.y = d3.scaleLinear()
      .range([this.dimensions.height - (2 * this.margins.y), 0]);
  }

  // Define line function
  defineLine() {
    this.line = d3.line()
      .curve(d3.curveBasis)
      .x((data) => {
        return this.ranges.x(data.date);
      })
      .y((data) => {
        return this.ranges.y(data.value);
      });
  }

  // Set up SVG canvas
  initialiseChart() {
    this.svg = d3.select(this.selector)
      .append('svg')
        .attr('width', this.dimensions.width)
        .attr('height', this.dimensions.height);

    this.wrapper = this.svg
      .append('g')
        .attr('width', this.dimensions.width - this.margins.x)
        .attr('height', this.dimensions.height - (2 * this.margins.y))
        .attr('class', 'wrapper')
        .attr('transform', `translate(0, ${this.margins.y})`);

    // this.buildFilter();
    this.buildGuide();
    this.buildLine();
    this.buildEndCircle();
  }

  buildGuide() {
    // Create inspector guide
    this.wrapper
      .append('line')
        .attr('class', 'guide');
  }

  buildLine() {
    // Create chart line group
    this.wrapper
      .append('g')
        .attr('class', 'data');

    // Create chart line
    this.svg.select('.data')
      .append('path')
        .attr('class', 'line');
  }

  buildEndCircle() {
    // Create circle group
    this.wrapper
      .append('g')
        .attr('class', 'circle');

    // Create inspector circle shadow
    this.svg.select('.circle')
      .append('circle')
        .attr('class', 'circle-shadow')
        .attr('r', `${this.blur.radius}px`);

    // Create inspector circle
    this.svg.select('.circle')
      .append('circle')
        .attr('class', 'circle');
  }

  // Build SVG filters
  buildFilter() {
    this.svg
      .append('defs')
      .append('filter')
        .attr('id', 'shadow')
        .attr('x', '-100%')
        .attr('y', '-100%')
        .attr('width', '300%')
        .attr('height', '300%');

    this.svg.select('#shadow')
      .append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', this.blur.amount);

    this.svg.select('#shadow')
      .append('feOffset')
        .attr('dx', this.blur.offset.x)
        .attr('dy', this.blur.offset.y)
        .attr('result', 'offsetblur');

    this.svg.select('#shadow')
      .append('feComponentTransfer')
      .append('feFuncA')
        .attr('type', 'linear')
        .attr('slope', this.blur.opacity);

    this.svg.select('#shadow')
      .append('feMerge')
      .attr('class', 'merge')
      .append('feMergeNode');

    this.svg.select('.merge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');
  }

  // Renders all chart components and populates stats
  // @param {arr} [data] Sample data
  renderData(data) {
    this.data = data;

    // Set domains based on sample data
    this.ranges.x.domain(d3.extent(data, (data) => {
        return data.date;
      })
    );

    this.ranges.y.domain(d3.extent(data, (data) => {
        return data.value;
      })
    );

    this.renderGuide(data);
    this.renderLine(data);
    this.renderCircle(data);
    this.populateStats(data);
  }

  // Renders chart line
  renderLine() {
    this.svg.select('.line')
      .data([this.data])
      .interrupt()
      .transition()
        .duration(this.numberGeneratorOptions.interval * 2.5)
        .attr('d', this.line);
  }

  // Renders circle on latest value
  renderCircle() {
    const x = this.ranges.x(this.data[this.data.length - 1].date);
    const y = this.ranges.y(this.data[this.data.length - 1].value);

    this.point = this.svg.select('.circle')
      .interrupt()
      .transition()
        .duration(this.numberGeneratorOptions.interval * 2.5)
        .attr('transform', `translate(${x}, ${y})`);
  }

  // Renders horizontal guide for latest value
  renderGuide() {
    const y = this.ranges.y(this.data[this.data.length - 1].value);

    this.svg.select('.guide')
      .interrupt()
      .transition()
        .duration(this.numberGeneratorOptions.interval * 2.5)
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', this.dimensions.width * 2)
        .attr('y2', y);
  }

  renderInspector() {
    // const posX = d3.mouse()[];
  }

  // Populates stats based on chart data
  populateStats() {
    const rate = document.getElementsByClassName('rate');
    const value = this.data[this.data.length - 1].value;

    rate[0].innerHTML = value + ` - ${gini.toFixed(3)}`
  }

  startTicker() {
    this.tickerTimeout = setTimeout(() => {
      this.tickerInterval = setInterval(() => {
        this.tickData(this.data);
      }, this.numberGeneratorOptions.interval);
    }, 6000);
  }

  // Progresses data and updates chart
  tickData() {
    this.data.shift();
    this.data.push({
      date: ExchangeChart.progressDate(this.data, this.numberGeneratorOptions),
      value: ExchangeChart.progressValue(this.data, this.numberGeneratorOptions),
    });

    this.renderData(this.data);
  }

  // Generate a random data set, accounts for volatility which allows for some nice trend simulation
  // @param {obj} [options] Generator options (see defaults)
  // @returns {arr} [data] Sample data
  //
  // data = [
  //   {
  //     date: {dateObject},
  //     value: {float}
  //   },
  //   ...
  // ]
  static generateSampleData(options) {
    const data = [];
    let n = options.dataPoints;

    // Set first data point
    data.push({
      date: new Date(Date.now()),
      value: options.initialValue,
    });

    n--;

    // Loop and create remaining data points
    while (n > 0) {
      data.push({
        date: ExchangeChart.progressDate(data, options),
        value: ExchangeChart.progressValue(data, options),
      });

      n--;
    }

    return data;
  }

  // Calculates next date in data set
  // @param {arr} [data] Sample data
  // @param {obj} [options] Generator options
  // @returns {obj} Next date
  static progressDate(data, options) {
    return new Date(new Date(data[data.length - 1].date.getTime() + options.interval));
  }

  static arrayAverage(arr){
    //Find the sum
    arr = Object.values(arr)
      var sum = 0;
      for(var i in arr) {
          sum += arr[i];
      }
      //Get the length of the array
      var numbersCnt = arr.length;
      //Return the average / mean.
      return (sum / numbersCnt);
  }
  // Calculates next value in data set
  // @param {arr} [data] Sample data
  // @param {obj} [options] Generator options
  // @returns {float} Next value
  static progressValue(data, options) {
    console.log(`connections: ${connections}`)
    const max = 2**12
    const total = options.dataPoints;
    const volatility = options.volatility / 100;
    const average = this.arrayAverage(population)
    // console.log(average)
    let totalVals = Object.values(population).map((value, i) => {

    let random = 0;
    if(Math.random() > 0.5) {
        random = 17.034
    } else {
        random = 2.964
    }
    // const random = ExchangeChart.getRandomNumber(0, 10, 3);
    // console.log(random)
    // console.log(volatility)
    // console.log(population[i] <= average)
    // console.log((1 - path / 325))
    // if(population[i] <= ((1 - path / 314) * average)){
    if(population[i] <= average){
      // console.log('HERE')
      const multiplier = .7 * connections / max
      // console.log(multiplier)
      // console.log(connections)
      let percentChange = 2 * volatility * random * multiplier


      // if (percentChange > volatility * 2) {
      //   percentChange = -2 * volatility;
      // }


        population[i] = value * (1+percentChange)
        // console.log(percentChange)
      }else {
        console.log('SKIP')

        population[i] = value
      }
      return population[i]
    }).reduce((total, value) => {
      return total + value
    })

    data[data.length - 1] = {value: totalVals, date: Date.now()}

    let calc = Object.values(population).map((val) => val)

    // console.log(calc)
    gini = giniSS(calc)
    const tresh = .002

    if(gini > 0.001 && gini < tresh){
      // path = 0
      console.log(discounts[0])
    }else if(gini > tresh && gini < tresh*2){
      // path = 1
      console.log(discounts[1])
    }else if(gini > tresh*2 && gini < tresh*3){
      // path = 2
      console.log(discounts[2])
    }else if(gini > tresh*3&& gini < tresh*4){
      // path = 3
      console.log(discounts[3])
    }else if(gini > tresh*4 && gini < tresh*5){
      // path = 4
      console.log(discounts[4])
    }else if(gini > tresh*5){
      // path = 5
      console.log(discounts[5])
    }

    // console.log(gini)
    // console.log(population)

    // const changeValue = data[data.length - 1].value * percentChange;
    return data[data.length - 1].value.toFixed(3)
  }

  // Generates a random number
  // @param {int} [min] Minimum number
  // @param {int} [max] Maximum number
  // @param {int} [decimalPlaces] Number of decimal places
  // @returns {float} Random float
  static getRandomNumber(min, max, decimalPlaces) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
  }

  // Rounds a number to specified decimal places
  // @param {float} [n] Number to be rounded
  // @param {int} [decimalPlaces] Number of decimal places
  // @param {bool} [pad] Pad output string with trailing zeroes if required
  // @returns {string} Rounded number string
  static roundNumber(n, decimalPlaces, pad) {
    let rounded = n.toFixed(3).toString()
    // let rounded = (Math.round(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)).toString();

    // if (pad) {
      let integerLength = rounded.indexOf('.') > -1 ? rounded.indexOf('.') : rounded.length;

      if (rounded.indexOf('-') > -1) {
        integerLength--;
      }

      // if (rounded.indexOf('.') === -1) {
      //   rounded = `${rounded}.`;
      // }

      const targetLength = decimalPlaces + integerLength + 1;

    //   if (rounded.length < targetLength) {
    //     for (let i = rounded.length; i < targetLength; i++) {
    //       rounded = `${rounded}0`;
    //     }
    //   }
    // }

    // return `${gini}`;
    console.log(rounded)
    return rounded + `${gini}`;
  }

  static loadJSON(url, success, error) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success) {
            success(JSON.parse(xhr.responseText));
          } else {
            if (error) {
              error(xhr);
            }
          }
        } else {
          error(xhr.status);
        }
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
  }
}

const direction = [
// 2
{
  planet: 'Mercury',
  deity: 'Thoth',
  activity: ['Library', 'Dance']
},{
  planet: 'Venus',
  deity: 'Isis',
  activity: ['Park','Music']
},
// 0
{
  planet: 'Earth',
  deity: 'Nephthys',
  activity: ['Coffee']
},
{
  planet: 'Mars',
  deity: 'Horus',
  activity: ['Meal']
},
// 1
{
  planet: 'Maldek',
  deity: 'Hapi',
  activity: ['Swimming']
},{
  planet: 'Jupiter',
  deity: 'Osirus',
  activity: ['Wellness', 'Sports']
},
// 3
{
  planet: 'Saturn',
  deity: 'Ra',
  activity: ['Local Market', 'Fashion']
},{
  planet: 'Uranus',
  deity: 'Shu',
  activity: ['Art Gallery']
},
// 4
{
  planet: 'Neptune',
  deity: 'Tutu',
  activity: ['Education']
},{
  planet: 'Pluto',
  deity: 'Anubis',
  activity: ['Drive']
},
// 5
{
  planet: 'Chiron',
  deity: 'Seshat',
  activity: ['Travel']
},{
  planet: 'Nibiru',
  deity: 'Seth',
  activity: ['Home Improvement']
},
]


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

  document.getElementById('app').innerHTML = data.map(entry => {
    const [x,y] = entry;
    return renderLines(x,y).join('');
  })
}

// @inject( "store" )
// @observer
function App () {

  const [led, setLed] = useState(null)
  // visual
  const [node, setNode] = useState(null)
  const [edge, setEdge] = useState(null)

  // info
  const [planet, setPlanet] = useState(null)
  const [deity, setDeity] = useState(null)
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
  }
  const [sections, setSections] = useState([])

  const COUNTER = 2000
  useEffect(() => {
    const exchangeChart = new ExchangeChart('#chart', ExchangeChart.generateSampleData(defaults.numberGeneratorOptions));

    setInterval(() => {
      // const e_x = Math.random()
      

      connections = Math.floor(Math.random() * 16);

      // document.getElementById('path').append(<span class="section"></span>)
      sections.push(<span class="section"></span>)
      if(counter % 2 == 0){
        console.log('HELLO?')
        
      sections.push(<span class="section forked">
    <span class="lane"></span>
    <span class="lane"></span>
  </span>)
      }
      setSections([...sections])
    }, 2000)

    setInterval(() => {
      let ran = Math.floor(Math.random() * 6)
      // ran = path
      setNode(ran)
      renderPoints(connections);

      counter++
      // ran = 5
      if(counter % 2 == 0){
        clear()

        console.log('timer')

        switch(ran){
          case 0:
            setPlanet(`${direction[2].planet} ↔ ${direction[3].planet}`)
            setDeity(`${direction[2].deity} ↔ ${direction[3].deity}`)
            setActivity(`${direction[2].activity} ↔ ${direction[3].activity}`)
            setLed(0.25)
            setEarthUnit(
              <text x="50" y="420" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓉢 ♁
              </text>
            )
            setMarsUnit(
              <text x="255" y="420" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓆣 ♂
              </text>
            )

            setEarth('yellow')
            setEarthCircle('white')
            setMars('green')
            setMarsCircle('white')

            setEdge(
              <rect x="25" y="360" width="290" height="110" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} >
                <animate
                attributeName="rx"
                values="0;50;0"
                dur="10s"
                repeatCount="indefinite" />
              </rect>
              )
          break;
          case 1:
            setPlanet(`${direction[4].planet} ↔ ${direction[5].planet}`)
            setDeity(`${direction[4].deity} ↔ ${direction[5].deity}`)
            setActivity(`${direction[4].activity} ↔ ${direction[5].activity}`)
            setLed(0.8)
            setMaldekUnit(
              <text x="155" y="345" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#ffffffff;#ffffffff;#ffffffff;#ffffffff;#ffffffff;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓊝 ◌
              </text>
            )
            setJupiterUnit(
              <text x="55" y="300" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#ffffffff;#ffffffff;#ffffffff;#ffffffff;#ffffffff;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓋘 ♃
              </text>
            )

            setMaldek('blue')
            setMaldekCircle('white')
            setJupiter('black')
            setJupiterCircle('white')

            setEdge(
              <rect x="140" y="185" transform="rotate(25 0 0)" rx="50" width="220" height="100" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
              <animate
                attributeName="rx"
                values="0;50;0"
                dur="10s"
                repeatCount="indefinite" />
              </rect>
            )
          break;
          case 2:
            setPlanet(`${direction[0].planet} ↔ ${direction[1].planet}`)
            setDeity(`${direction[0].deity} ↔ ${direction[1].deity}`)
            setActivity(`${direction[0].activity} ↔ ${direction[1].activity}`)
            setLed(0.1)

            setMercuryUnit(
              <text x="155" y="535" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓅠 ☿
              </text>
            )
            setVenusUnit(
              <text x="155" y="445" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓋟 ♀
              </text>
            )

            setMercury('red')
            setMercuryCircle('white')
            setVenus('wheat')
            setVenusCircle('white')

            setEdge(
              <rect x="115" y="400" width="110" height="180" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
              <animate
                attributeName="rx"
                values="0;50;0"
                dur="10s"
                repeatCount="indefinite" />
              </rect>
            )
          break;
          case 3:
            setPlanet(`${direction[6].planet} ↔ ${direction[7].planet}`)
            setDeity(`${direction[6].deity} ↔ ${direction[7].deity}`)
            setActivity(`${direction[6].activity} ↔ ${direction[7].activity}`)
            setLed(1)

            setUranusUnit(
              <text x="155" y="240" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓆃 ♅
              </text>
            )
            setSaturnUnit(
              <text x="255" y="295" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#ffffff;#ffffff;#ffffff;#ffffff;#ffffff;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓇵 ♄
              </text>
            )

            setUranus('orange')
            setUranusCircle('white')
            setSaturn('purple')
            setSaturnCircle('white')

            setEdge(
              <rect x="190" y="100" transform="rotate(25 0 0)" rx="50" width="220" height="100" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
              <animate
                attributeName="rx"
                values="0;50;0"
                dur="10s"
                repeatCount="indefinite" />
              </rect>
            )
          break;
          case 4:
            setPlanet(`${direction[8].planet} ↔ ${direction[9].planet}`)
            setDeity(`${direction[8].deity} ↔ ${direction[9].deity}`)
            setActivity(`${direction[8].activity} ↔ ${direction[9].activity}`)
            setLed(1)

            setNeptuneUnit(
              <text x="55" y="180" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓏁 ♆
              </text>
            )
            setPlutoUnit(
              <text x="255" y="180" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#ffffff;#ffffff;#ffffff;#ffffff;#ffffff;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓉧 ♇
              </text>
            )

            setNeptune('lightgrey')
            setNeptuneCircle('white')
            setPluto('darkblue')
            setPlutoCircle('white')

            setEdge(
              <rect x="25" y="110" width="290" height="110" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
              <animate
                attributeName="rx"
                values="0;50;0"
                dur="10s"
                repeatCount="indefinite" />
              </rect>
            )
          break;
          case 5:
            setPlanet(`${direction[10].planet} ↔ ${direction[11].planet}`)
            setDeity(`${direction[10].deity} ↔ ${direction[11].deity}`)
            setActivity(`${direction[10].activity} ↔ ${direction[11].activity}`)
            setLed(1)
            
            setNibiruUnit(
              <text x="155" y="55" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓇽 ☄
              </text>
            )
            setChironUnit(
              <text x="155" y="145" class="small" fill="#ffffff">
                <animate attributeType="XML" attributeName="fill" values="#ffffff00;#ffffff00;#ffffff00;#000000;#000000;#000000;#000000;#000000;#ffffff00;#ffffff00;" dur="10s" repeatCount="indefinite"/>
                𓋇 🗝
              </text>
            )

            setChiron('paleturquoise')
            setChironCircle('white')
            setNibiru('white')
            setNibiruCircle('white')

            setEdge(
              <rect x="115" y="5" width="110" height="180" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}}>
              <animate
                attributeName="rx"
                values="0;50;0"
                dur="10s"
                repeatCount="indefinite" />
              </rect>
              )
          break;
        }
      }
    }, COUNTER)
  }, [])

  return (
    <div className="App">
      <Kathara connections={connections}/>
            <br/>
      <br/>
      {planet}
      <br/>
      {deity}
      <br/>
      {activity}
      <div style={{marginLeft: "437px", width: '70vw', position: 'absolute'}}>
        <svg x="40" y="0" width="1200" height="600">
          {/**/}
          {edge}

          {/**/}
          <circle cx="170" cy="50" r="40" stroke={nibiruCircle} strokeWidth="4" fill={nibiru} />
          
          <circle cx="170" cy="140" r="40" stroke={chironCircle} strokeWidth="4" fill={chiron} />
          
           <circle cx="70" cy="170" r="40" stroke={neptuneCircle} strokeWidth="4" fill={neptune} />
           <circle cx="270" cy="170" r="40" stroke={plutoCircle} strokeWidth="4" fill={pluto} />
           
           <circle cx="170" cy="240" r="40" stroke={uranusCircle} strokeWidth="4" fill={uranus} />
           <circle cx="265" cy="290" r="40" stroke={saturnCircle} strokeWidth="4" fill={saturn} />
           
           <circle cx="70" cy="290" r="40" stroke={jupiterCircle} strokeWidth="4" fill={jupiter} />
           <circle cx="170" cy="340" r="40" stroke={maldekCircle} strokeWidth="4" fill={maldek} />
           
           <circle cx="70" cy="410" r="40" stroke={earthCircle} strokeWidth="4" fill={earth} />
           <circle cx="270" cy="410" r="40" stroke={marsCircle} strokeWidth="4" fill={mars} />
           
           
           <circle cx="170" cy="445" r="40" stroke={venusCircle} strokeWidth="4" fill={venus} />
          <circle cx="170" cy="535" r="40" stroke={mercuryCircle} strokeWidth="4" fill={mercury} />

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
      <div style={{marginLeft: "637px", width: '70vw', position: 'absolute'}}>
        <svg x="40" y="0" width="1200" height="600">
          {/**/}
          {edge}

          {/**/}
          <circle cx="170" cy="50" r="40" stroke={nibiruCircle} strokeWidth="4" fill={nibiru} />
          
          <circle cx="170" cy="140" r="40" stroke={chironCircle} strokeWidth="4" fill={chiron} />
          
           <circle cx="70" cy="170" r="40" stroke={neptuneCircle} strokeWidth="4" fill={neptune} />
           <circle cx="270" cy="170" r="40" stroke={plutoCircle} strokeWidth="4" fill={pluto} />
           
           <circle cx="170" cy="240" r="40" stroke={uranusCircle} strokeWidth="4" fill={uranus} />
           <circle cx="265" cy="290" r="40" stroke={saturnCircle} strokeWidth="4" fill={saturn} />
           
           <circle cx="70" cy="290" r="40" stroke={jupiterCircle} strokeWidth="4" fill={jupiter} />
           <circle cx="170" cy="340" r="40" stroke={maldekCircle} strokeWidth="4" fill={maldek} />
           
           <circle cx="70" cy="410" r="40" stroke={earthCircle} strokeWidth="4" fill={earth} />
           <circle cx="270" cy="410" r="40" stroke={marsCircle} strokeWidth="4" fill={mars} />
           
           
           <circle cx="170" cy="445" r="40" stroke={venusCircle} strokeWidth="4" fill={venus} />
          <circle cx="170" cy="535" r="40" stroke={mercuryCircle} strokeWidth="4" fill={mercury} />

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
      {/*<RD3Component data={node} />*/}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="container">
      <div class="panel">
        <div class="exchange-rate">
          <div class="label">Exchange</div>
          <div class="conversion-selector">USD - AUD</div>
          <span class="rate" style={{fontFamily: 'Gothic'}}data-currency="$"></span>
        </div>
        <div id="chart">
        </div>
      </div>
      <button id="generate">Generate New Data</button>
    </div>
    <svg id="app" viewBox="0 0 1000 1000"></svg>
    <div class="path" id="path">
    {sections}
  <span class="section"></span>
  <span class="section"></span>
  <span class="section forked">
    <span class="lane"></span>
    <span class="lane"></span>
  </span>
  <span class="section"></span>
</div>
  <Blueberry led={led} setLed={setLed}/>
  {/*<Aura/>*/}
  <article class="luminous animated" role="img" aria-label="Cartoon of lighted candle" style={{marginLeft: '60px'}}></article>
  <article class="luminous animated-2" role="img" aria-label="Cartoon of lighted candle" style={{marginLeft: '200px'}}></article>
    </div>
  );
}

export default App;