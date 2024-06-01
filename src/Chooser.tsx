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
    const [lastChamps, setlastChamps] = useState<Queue<string>>(new Queue());
    const [filteredChampions, setFilteredChampions] = usePersistState<string[]>([], 'fileteredChampions');
    const [noOfChamps, setNoOfChamps] = usePersistState<number>(3, 'noOfChamps');
    const [search, setSearch] = useState('');

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
            ["VelKoz", "Velkoz"],
            ["RenataGlasc", "Renata"],
            ["LeBlanc", "Leblanc"],
            ["ChoGath", "Chogath"],
        ]);

        return exceptions.get(item) !== undefined ? exceptions.get(item) : item
    }

    const handle = () => {
        if (noOfChamps >= 10) {
            setNoOfChamps(10);
            return;
        }
        setNoOfChamps(noOfChamps + 1);
    }

    const handle2 = () => {
        if (noOfChamps === 1) return;
        const newQueue = lastChamps;
        setNoOfChamps(noOfChamps - 1);
        if (newQueue.length >= noOfChamps - 1 ) {
            newQueue.dequeue();
        }
    }


    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }
    return (
        <div className='min-h-screen w-screen bg-black flex text-white flex-col items-center justify-center border-solid border-2'>
            <div className='items-center justify-center text-7xl py-10'>
                <h1 className='font-bold '>{champion}</h1>
            </div>
            <div className='items-center justify-center py-8'>
                <div className="md:inline-block px-2 py-2 md:align-top">
                    <button className="bg-blue-500 py-4 w-48 h-16 hover:bg-blue-700 text-white font-bold px-4 rounded-xl flex justify-center items-center" onClick={() => setChampion(() => {
                        const champ = filteredChampions.length === 0 ? randomChampion() : randomChampion(filteredChampions)
                        const newQueue = lastChamps;
                        if (newQueue.length === noOfChamps) {
                            newQueue.dequeue();
                        }
                        newQueue.enqueue(champ)
                        setlastChamps(newQueue);

                        return champ
                    })}>Roll a Champion!</button>
                </div>
                <div className="md:inline-block px-2 py-2 md:align-top">
                    <button className="bg-green-500 w-48 h-16 hover:bg-green-700 text-white font-bold px-4 rounded-xl flex justify-center items-center" onClick={handle}>Increase Number of Champs</button>
                </div>
                <div className="md:inline-block px-2 py-2 md:align-top">
                    <button className="bg-red-500 w-48 h-16 hover:bg-red-700 text-white font-bold px-4 rounded-xl flex justify-center items-center" onClick={handle2}>Decrease Number of Champs</button>
                </div>
            </div>

            <div className='border-2 text-pretty text-bold border-rose-500 py-5 text-white rounded-lg text-2xl font-bold font-serif w-64 flex justify-center items-center bg-rose-500'>
                <h2>{`Last ${noOfChamps} Champs`}</h2>
            </div>
            <div className='border-4 font-bold text-xl py-5 m-5 rounded-md justify-center items-center flex w-1/2 border-rose-500'>
                <ul className="ml-auto md:flex items-center justify-center md:w-screen">
                {lastChamps.allElements.map(item => (
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
                <div className="w-fit">
                    <input type="text" placeholder="Search Champion..." className="text-black w-full border-4 rounded-md" value={search} onChange={searchHandler}/>
                </div>
                <ol>
                {champions.filter((champ) => {
                    if (search === "") {
                        return champ;
                    } 
                    
                    if (champ.toLowerCase().includes(search.toLowerCase())) {
                        return champ;
                    }

                    return null;
                }).map((champ, index) => (
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