import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import './App.css';

function App() {
  const [checkednum, buttonValue] = useState<number | null>(null);
  const randomarray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => .5 - Math.random());

  return (
    <div className="App">
      <input type="text" placeholder='Enter Name' /><br /><br />
      <InputNumber min={1} max={9} onChange={(newNumber: number) => buttonValue(newNumber)} />

      {checkednum ?
        <Matrix randomarray={randomarray} checkednum={checkednum} buttonValue={buttonValue} />
        :
        <div>Select a number</div>
      }
    </div>
  );
}

interface MatrixProps {
  randomarray: number[];
  checkednum: number | null;
  buttonValue: (newcheckednum: number | null) => void;
}

const Matrix = ({ randomarray, checkednum, buttonValue }: MatrixProps) => {
  const [buttonclicked, setclickedbutton] = useState<number[] | []>([]);
  const onChangework = (val: number) => {
    setclickedbutton([...buttonclicked, val]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (buttonclicked.includes(checkednum as never)) {
        alert('Congrajulations You won!');
        buttonValue(null);
        setclickedbutton([]);
      }

      if (buttonclicked.length === 3 && !buttonclicked.includes(checkednum as never)) {
        alert('You lose! Click Okay to Retry');
        buttonValue(null);
        setclickedbutton([]);
      }
    }, 100)
  }, [buttonclicked]);

  return (
    <div className="buttonContainer">
      {randomarray.map((val: number, index: number) => {
        if (buttonclicked.includes(val as never)) {
          return <div className={val === checkednum ? 'button button-right' : 'button button-wrong'} key={index}>{val}</div>
        } else {
          return <div className="button" key={index} onClick={() => onChangework(val)}></div>
        }
      })}
    </div>
  );
}


export default App;
