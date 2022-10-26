import {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3'
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
let connections = 0
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
    interval: 500, // Number of ms between each data point
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
    }, 1000);
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
    connections = Math.floor(Math.random() * 16);
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

function App() {

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
  const COUNTER = 2000
  useEffect(() => {
    const exchangeChart = new ExchangeChart('#chart', ExchangeChart.generateSampleData(defaults.numberGeneratorOptions));

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
            <br/>
      <br/>
      {planet}
      <br/>
      {deity}
      <br/>
      {activity}
      <div style={{marginLeft: "337px", width: '70vw', position: 'absolute'}}>
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
    </div>
  );
}

export default App;
