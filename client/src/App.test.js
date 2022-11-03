import { render, screen } from '@testing-library/react';
import App from './App';

import F from './fable_fonts/F.jpeg'
import A from './fable_fonts/A.jpeg'
import B from './fable_fonts/B.jpeg'
import L from './fable_fonts/L.jpeg'
import E from './fable_fonts/E.jpeg'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


  <input onChange={(val) => {
    // setSpell(val)
    // console.log(val)
    val.target.value.split('').map((char) =>{
    spellCast.push(fabled(char))
    setSpellCast([...spellCast])

    })
  }} />
  {spellCast}

  const fabled = (char) => {
  switch(char) {
    case 'f':
    return <img src={F} />
    break;
    case 'a':
    return <img src={A} />
    break;
    case 'b':
    return <img src={B} />
    break;
    case 'l':
    return <img src={L} />
    break;
    case 'e':
    return <img src={E} />
    break;
  }
}