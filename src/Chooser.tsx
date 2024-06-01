import { useState } from "react";
import { Queue } from "./queue";
import { champions } from "./constants";
import { Collapsible } from "./Collapsible";
import usePersistState from "./usePersistState";

const randomChampion = (filtered?: Array<string>): string => {
  if (filtered?.length === 0) {
    return champions[Math.floor(Math.random() * champions.length)];
  }
  const filteredChampArray = champions.filter(champ1 => !filtered?.includes(champ1));

  return filteredChampArray[Math.floor(Math.random() * filteredChampArray.length)];
}


export const Chooser = () => {
    const defaultVal = 'CLICK A BUTTON TO CHOOSE A CHAMPION';
    const [champion, setChampion] = useState(defaultVal);
    const [lastThreeChamps, setLastThreeChamps] = useState<Queue<string>>(new Queue());
    const [filteredChampions, setFilteredChampions] = usePersistState<string[]>([], 'fileteredChampions');

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...filteredChampions];

        if (event.target.checked) {
        updatedList = [...filteredChampions, event.target.value];
        } else {
        updatedList = updatedList.filter(item => item !== event.target.value);
        }

        setFilteredChampions(updatedList);
    }

    const championSplash = (item: string) => {
        item = item.replace(/\s/g, "").replace("'","");
        const exceptions = new Map<string, string>([
            ["Wukong", "MonkeyKing"],
            ["KaiSa", "Kaisa"],
            ["KhaZix", "Khazix"],
            ["BelVeth", "Belveth"],
            ["VelKoz", "Velkoz"]
        ]);

        return exceptions.get(item) !== undefined ? exceptions.get(item) : item
    }
    return (
        <div className='h-fit w-screen bg-black flex text-white flex-col items-center justify-center border-solid border-2'>
        <div className='items-center justify-center text-7xl py-10'>
            <h1 className='font-bold '>{champion}</h1>
        </div>
        <div className='items-center justify-center py-10'>
            <button className="bg-blue-500 w-36 h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" onClick={() => setChampion(() => {
            const champ = filteredChampions.length === 0 ? randomChampion() : randomChampion(filteredChampions)
            const newQueue = lastThreeChamps;
            if (newQueue.length === 3) {
                newQueue.dequeue();
            }
            newQueue.enqueue(champ)
            setLastThreeChamps(newQueue);

            return champ
            })}>CLICK ME!</button>
        </div>

        <div className='border-2 text-pretty text-bold border-rose-500 py-5 text-white rounded-lg text-2xl font-bold font-serif w-64 flex justify-center items-center bg-rose-500'>
            <h2>Last Three Champs</h2>
        </div>
        <div className='border-4 font-bold text-xl py-5 m-5 rounded-md justify-center items-center flex w-1/2 border-rose-500'>
            <ul className="ml-auto flex items-center justify-center w-screen">
            {lastThreeChamps.allElements.map(item => (
            <li className="inline-block">
                <div>
                    {
                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championSplash(item)}_1.jpg`} alt="placeholder" />
                    }
                </div>
            </li>
            ))}
        </ul>
        </div>

        <Collapsible>
            <ol>
            {champions.map((champ, index) => (
                <div key={index} className='text-xl'>
                <div className='flex border-4 rounded-md my-2'>
                    <div className='px-3'>
                        {filteredChampions.includes(champ) ? <input type="checkbox" value={champ} onChange={handleClick} checked={true}/> : <input type="checkbox" value={champ} onChange={handleClick} />}
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