import {  useState } from "react";
import { useQueue } from "@uidotdev/usehooks";
import { champions } from "./constants";
import { Collapsible } from "./Collapsible";
import usePersistState from "./usePersistState";
import LastChampion from "./LastChampion";

const randomChampion = (filtered?: Array<string>): string => {
  if (filtered?.length === 0) {
    return champions[Math.floor(Math.random() * champions.length)];
  }
  const filteredChampArray = champions.filter(champ1 => !filtered?.includes(champ1));

  return filteredChampArray[Math.floor(Math.random() * filteredChampArray.length)];
}


export const Chooser = () => {
    const defaultVal = 'Your Champion!';
    const [champion, setChampion] = useState(defaultVal);
    const [filteredChampions, setFilteredChampions] = usePersistState<string[]>([], 'fileteredChampions');
    const [noOfChamps, setNoOfChamps] = usePersistState<number>(3, 'noOfChamps');
    const [search, setSearch] = useState('');
    const {add, remove, size, queue} = useQueue<string>([]);
    const [hideChamps, setHideChamps] = usePersistState<boolean>(false, 'hideChamps');

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...filteredChampions];

        if (event.target.checked) {
        updatedList = [...filteredChampions, event.target.value];
        } else {
        updatedList = updatedList.filter(item => item !== event.target.value);
        }

        setFilteredChampions(updatedList);
    }

    const sliderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sliderValue = event.target.valueAsNumber;
        let mSize = size;
        setNoOfChamps(sliderValue);

        if (sliderValue < size) {
            while (mSize > sliderValue) {
                remove();
                mSize--;
            }
        }

    }


    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const checkboxHandler = () => {
        setHideChamps(!hideChamps);
    }

    const rollChampionHandler = () => {
        setChampion(() => {
            const champ = filteredChampions.length === 0 ? randomChampion() : randomChampion(filteredChampions);
            if (size >= noOfChamps) {
                let mSize = size;
                while (mSize >=  noOfChamps) {
                    remove();
                    mSize--;
                }
            }
            add(champ);

            return champ
        })
    }

    return (
      <div className="min-h-screen w-screen bg-gradient-to-b from-black to-slate-950 flex text-white flex-col items-center justify-between border-double border-8">
        <div className="flex flex-col items-center justify-center pb-10 md:pt-36 w-fit">
          <div className="font-bold flex justify-center items-center text-2xl md:text-5xl pb-16 font-Kanit">
            <h1 className="  ">LoL Random</h1>
            <h1 className="text-pink-500 md:pl-5">Champion Picker</h1>
          </div>
          <h3 className="text-4xl md:text-6xl font-extrabold font-Kanit">
            {hideChamps ? "Hidden!" : champion}
          </h3>
        </div>
        <div className="items-center justify-center py-8">
          <div className="md:inline-block px-2 py-2 md:align-top ">
            <button
              className="font-Kanit hover:shadow-xl hover:shadow-pink-700/50 drop-shadow-2xl bg-pink-500 py-4 w-48 h-16 hover:bg-pink-700 text-white font-bold px-4 rounded-xl flex justify-center items-center shadow-xl shadow-pink-500/50 "
              onClick={rollChampionHandler}
            >
              Roll a Champion!
            </button>
          </div>

          <div className="pt-4 text-white font-semibold text-2xl font-Kanit">
            <div>
              <label
                htmlFor="lastChampsSlider"
                className="block mb-2 text-md font-medium text-white"
              >
                Number of Champs
              </label>
              <input
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-pink-500"
                id="lastChampsSlider"
                type="range"
                min={1}
                max={10}
                onChange={sliderHandler}
                step={1}
                defaultValue={noOfChamps}
              />
            </div>
            <br />
            <div>
              <label htmlFor="hideChamps" className="pr-4">
                Hide Champions?
              </label>
              <input
                type="checkbox"
                id="hideChamps"
                className="accent-pink-300 rounded-md hover:accent-pink-500 focus:accent-pink-700 hover:cursor-pointer"
                onChange={checkboxHandler}
                checked={hideChamps}
              />
            </div>
          </div>
        </div>

        <div className="shadow-lg shadow-rose-500/80 border-2 text-pretty text-bold border-rose-500 py-4 my-5 text-white rounded-lg text-2xl font-bold font-Kanit w-64 flex justify-center items-center">
          <h2>{`Last ${noOfChamps > 1 ? noOfChamps : ""} Champ${
            noOfChamps > 1 ? "s" : ""
          }`}</h2>
        </div>
        <div
          className={
            "font-bold text-xl py-5 m-5 rounded-md justify-center flex items-center h-1/6 w-fit"
          }
        >
          <ul className="md:flex items-center justify-center">
            {queue
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <LastChampion
                    key={item + index}
                    index={index}
                    champ={item}
                    hidden={hideChamps}
                  />
                );
              })}
          </ul>
        </div>

        <Collapsible>
          <div className="w-fit mx-2 my-2">
            <input
              type="text"
              placeholder="Search Champion..."
              className="text-black w-full border-4 rounded-md h-10"
              value={search}
              onChange={searchHandler}
            />
          </div>
          <ol>
            {champions
              .filter((champ) => {
                if (search === "") {
                  return champ;
                }

                if (champ.toLowerCase().includes(search.toLowerCase())) {
                  return champ;
                }

                return null;
              })
              .map((champ, index) => (
                <div key={index} className="text-xl">
                  <div className="flex border-4 rounded-md my-2 px-2 mx-2">
                    <div className="px-3">
                      {filteredChampions.includes(champ) ? (
                        <input
                          type="checkbox"
                          value={champ}
                          onChange={handleClick}
                          checked={true}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          value={champ}
                          onChange={handleClick}
                        />
                      )}
                    </div>
                    <div>
                      <p>{champ}</p>
                    </div>
                  </div>
                </div>
              ))}
          </ol>
        </Collapsible>

        <footer className="font-bold flex h-16 w-full items-center justify-center border-double border-white border-y-2 font-Kanit">
          <p className="text-pink-500 font-bold italic pr-1 font-Kanit">
            Created by
          </p>
          Dawid Ciechowski 2024
        </footer>
      </div>
    );
}