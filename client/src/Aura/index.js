import React, {useState} from 'react';
import Orb from './Orb.js'
import Loading from './LoAdInG.js';

const Aura = (props) => {
  const [semaphore, setSemapore] = useState(false)
  const [color, setColor] = useState('Green')
  // color match percentage

  const poke = async (num) => {
    // props.setMood(num)
    setSemapore(true)
  }

  const clicked = async (num) => {
    console.log(num)
    // props.forAffordance(num)
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    // let contract = new ethers.Contract(contractAddress, abi, provider);

    // let tx = await contract.scry(num)
    // console.log(tx)
  }
  return(
    <>
      <Orb semaphore={semaphore}/>

        <p className="spirit">
            <p>
              {
                semaphore ? "You feel connected to the Zaya collective spirit" : "You feel connected to the color"
              }
            </p>
            <p>
              <b>{color}</b>
            </p>
             {
               semaphore ? '' : (<><p>Element : {'Air'}</p>
            <p>Chakra : {'Heart'}</p>
            <p>Incence : {'Rose'}</p>
            <p>Sense : {'Touch'}</p></>)
             }
            
        </p>
        <br/>
      <div className="pallette">
        <div className="affordances">
          <div className='color' onClick={() => clicked(1)} style={{background: '#000', color: 'white'}}>practice</div>
          <div className='color' onClick={() => clicked(2)} style={{background: '#000', color: 'white'}}>wellness</div>
          <div className='color' onClick={() => clicked(3)} style={{background: '#000', color: 'white'}}>karma</div>
        </div>
        <div className="submission-button">
          {
            semaphore ? <Loading/> : <div className='color' onClick={() => poke(props.mood)} style={{background: '#fff'}}>submit ✺ collective aura</div>
          }
        </div>
      </div>
    </>
  )
}


export default Aura;