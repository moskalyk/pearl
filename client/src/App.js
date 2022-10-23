import {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
let counter = 0


function App() {
  const [node, setNode] = useState(null)
  const [edge, setEdge] = useState(null)

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

  // planets
  const [mercuryEdge, setMercuryEdge] = useState('lightgrey')
  const [venusEdge, setVenusEdge] = useState('lightgrey')
  const [earthEdge, setEarthEdge] = useState('lightgrey')
  const [marsEdge, setMarsEdge] = useState('lightgrey')
  const [maldekEdge, setMaldekEdge] = useState('lightgrey')
  const [jupiterEdge, setJupiterEdge] = useState('lightgrey')
  const [saturnEdge, setSaturnEdge] = useState('lightgrey')
  const [uranusEdge, setUranusEdge] = useState('lightgrey')
  const [neptuneEdge, setNeptuneEdge] = useState('lightgrey')
  const [plutoEdge, setPlutoEdge] = useState('lightgrey')
  const [chironEdge, setChironEdge] = useState('lightgrey')
  const [nibiruEdge, setNibiruEdge] = useState('lightgrey')

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

    setMercury('lightgrey')
    setVenus('lightgrey')
    setEarth('lightgrey')
    setMars('lightgrey')
    setMaldek('lightgrey')
    setJupiter('lightgrey')
    setSaturn('lightgrey')
    setUranus('lightgrey')
    setNeptune('lightgrey')
    setPluto('lightgrey')
    setChiron('lightgrey')
    setNibiru('lightgrey')
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
            setEarth('yellow')
            setEarthEdge('white')
            setMars('green')
            setMarsEdge('white')
            setEdge(<rect x="25" y="360" width="290" height="110" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 1:
            setMaldek('blue')
            setMaldekEdge('white')
            setJupiter('black')
            setJupiterEdge('white')
            setEdge(<rect x="140" y="185" transform="rotate(25 0 0)" width="220" height="100" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 2:
            setMercury('red')
            setMercuryEdge('white')
            setVenus('wheat')
            setVenusEdge('white')
            setEdge(<rect x="115" y="400" width="110" height="180" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 3:
            setUranus('orange')
            setUranusEdge('white')
            setSaturn('purple')
            setSaturnEdge('white')
            setEdge(<rect x="200" y="100" transform="rotate(25 0 0)" width="220" height="100" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 4:
            setNeptune('lightgrey')
            setNeptuneEdge('white')
            setPluto('darkblue')
            setPlutoEdge('white')
            setEdge(<rect x="25" y="110" width="290" height="110" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
          break;
          case 5:
            setChiron('paleturquoise')
            setChironEdge('white')
            setNibiru('white')
            setNibiruEdge('white')
            setEdge(<rect x="115" y="5" width="110" height="180" style={{fill: "rgb(0,0,0)", strokeWidth:"3", stroke: "rgb(0,0,0)"}} />)
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
          <circle cx="170" cy="50" r="40" stroke={nibiruEdge} strokeWidth="4" fill={nibiru} />
          <circle cx="170" cy="140" r="40" stroke={chironEdge} strokeWidth="4" fill={chiron} />
          
           <circle cx="70" cy="170" r="40" stroke={neptuneEdge} strokeWidth="4" fill={neptune} />
           <circle cx="270" cy="170" r="40" stroke={plutoEdge} strokeWidth="4" fill={pluto} />
           
           <circle cx="170" cy="240" r="40" stroke={uranusEdge} strokeWidth="4" fill={uranus} />
           <circle cx="265" cy="290" r="40" stroke={saturnEdge} strokeWidth="4" fill={saturn} />
           
           <circle cx="70" cy="290" r="40" stroke={jupiterEdge} strokeWidth="4" fill={jupiter} />
           <circle cx="170" cy="340" r="40" stroke={maldekEdge} strokeWidth="4" fill={maldek} />
           
           <circle cx="70" cy="410" r="40" stroke={earthEdge} strokeWidth="4" fill={earth} />
           <circle cx="270" cy="410" r="40" stroke={marsEdge} strokeWidth="4" fill={mars} />
           
           
           <circle cx="170" cy="445" r="40" stroke={venusEdge} strokeWidth="4" fill={venus} />
          <circle cx="170" cy="535" r="40" stroke={mercuryEdge} strokeWidth="4" fill={mercury} />
        </svg> 
      </div>
      {node}
    </div>
  );
}

export default App;
