import './App.css';
import { champions } from './constants';
import React, { useState } from 'react';
import { Queue } from './queue';
import { Collapsible } from './Collapsible';

const randomChampion = (filtered?: Array<string>): string => {
  if (filtered?.length === 0) {
    return champions[Math.floor(Math.random() * champions.length)];
  }
  const filteredChampArray = champions.filter(champ1 => !filtered?.includes(champ1));

  return filteredChampArray[Math.floor(Math.random() * filteredChampArray.length)];
}

function App() {
  const defaultVal = 'CLICK A BUTTON TO CHOOSE A CHAMPION';
  const [champion, setChampion] = useState(defaultVal);
  const [lastThreeChamps, setLastThreeChamps] = useState<Queue<string>>(new Queue());
  const [filteredChampions, setFilteredChampions] = useState<string[]>([]);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...filteredChampions];

    if (event.target.checked) {
      updatedList = [...filteredChampions, event.target.value];
    } else {
      updatedList = updatedList.filter(item => item !== event.target.value);
    }

    setFilteredChampions(updatedList);
  }
  return (
    <div className='h-fit w-screen bg-black flex text-white flex-col items-center justify-center border-solid border-2'>
      <div className='items-center justify-center text-7xl py-10'>
        <h1 className='font-bold '>{champion}</h1>
      </div>
      <div className='items-center justify-center py-10'>
        <button className="bg-blue-500 w-36 h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" onClick={() => setChampion(() => {
          const newQueue = lastThreeChamps;
          if (champion !== "" && champion !== defaultVal) {
            if (newQueue.length === 3) {
              newQueue.dequeue();
            }
            newQueue.enqueue(champion)
            setLastThreeChamps(newQueue);
          } 

          return filteredChampions.length === 0 ? randomChampion() : randomChampion(filteredChampions)
        })}>CLICK ME!</button>
      </div>

      <div className='border-2 text-pretty text-bold border-rose-500 py-5 text-white rounded-lg text-2xl font-bold font-serif w-64 flex justify-center items-center bg-rose-500'>
        <h2>Last Three Champs</h2>
      </div>
      <div className='border-4 font-bold text-xl py-5 m-5 rounded-md w-36 justify-center items-center flex border-rose-500'>
        <ul>
        {lastThreeChamps.allElements.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      </div>

      <Collapsible>
        <ol>
          {champions.map((champ, index) => (
            <div key={index} className='text-xl'>
              <div className='flex border-4 rounded-md my-2'>
                <div className='px-3'>
                  <input type="checkbox" value={champ} onChange={handleClick} />
                </div>
                <div>
                  <p>{champ}</p>
                </div>
              </div>
            </div>
          ))}
        </ol>
      </Collapsible>
    </div>
  )
}

export default App;
