import {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
let counter = 0

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
  }
  useEffect(() => {
    setInterval(() => {
      let ran = Math.floor(Math.random() * 6)
      setNode(ran)
      counter++
      if(counter % 2 == 0){
        clear()

        console.log('timer')

        switch(ran){
          case 0:
            setPlanet(`${direction[2].planet} ↔ ${direction[3].planet}`)
            setDeity(`${direction[2].deity} ↔ ${direction[3].deity}`)
            setActivity(`${direction[2].activity} ↔ ${direction[3].activity}`)

            setEarth('yellow')
            setEarthCircle('white')
            setMars('green')
            setMarsCircle('white')
            setEdge(<rect x="25" y="360" width="290" height="110" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 1:
            setPlanet(`${direction[4].planet} ↔ ${direction[5].planet}`)
            setDeity(`${direction[4].deity} ↔ ${direction[5].deity}`)
            setActivity(`${direction[4].activity} ↔ ${direction[5].activity}`)

            setMaldek('blue')
            setMaldekCircle('white')
            setJupiter('black')
            setJupiterCircle('white')
            setEdge(<rect x="140" y="185" transform="rotate(25 0 0)" rx="50" width="220" height="100" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 2:
            setPlanet(`${direction[0].planet} ↔ ${direction[1].planet}`)
            setDeity(`${direction[0].deity} ↔ ${direction[1].deity}`)
            setActivity(`${direction[0].activity} ↔ ${direction[1].activity}`)

            setMercury('red')
            setMercuryCircle('white')
            setVenus('wheat')
            setVenusCircle('white')
            setEdge(<rect x="115" y="400" width="110" height="180" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 3:
            setPlanet(`${direction[6].planet} ↔ ${direction[7].planet}`)
            setDeity(`${direction[6].deity} ↔ ${direction[7].deity}`)
            setActivity(`${direction[6].activity} ↔ ${direction[7].activity}`)

            setUranus('orange')
            setUranusCircle('white')
            setSaturn('purple')
            setSaturnCircle('white')
            setEdge(<rect x="190" y="100" transform="rotate(25 0 0)" rx="50" width="220" height="100" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 4:
            setPlanet(`${direction[8].planet} ↔ ${direction[9].planet}`)
            setDeity(`${direction[8].deity} ↔ ${direction[9].deity}`)
            setActivity(`${direction[8].activity} ↔ ${direction[9].activity}`)

            setNeptune('lightgrey')
            setNeptuneCircle('white')
            setPluto('darkblue')
            setPlutoCircle('white')
            setEdge(<rect x="25" y="110" width="290" height="110" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 5:
            setPlanet(`${direction[10].planet} ↔ ${direction[11].planet}`)
            setDeity(`${direction[10].deity} ↔ ${direction[11].deity}`)
            setActivity(`${direction[10].activity} ↔ ${direction[11].activity}`)

            setChiron('paleturquoise')
            setChironCircle('white')
            setNibiru('white')
            setNibiruCircle('white')
            setEdge(<rect x="115" y="5" width="110" height="180" rx="50" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
        }
      }
    }, 1000)
  }, [])

  return (
    <div className="App">
      <div style={{marginLeft: "337px"}}>
        <svg x="40" y="0" width="1000" height="600">
                {edge}
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
        </svg> 
      </div>
      {node}
      <br/>
      {planet}
      <br/>
      {deity}
      <br/>
      {activity}
    </div>
  );
}

export default App;
