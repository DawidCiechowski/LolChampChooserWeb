import { useState } from "react";
import usePersistState from "./usePersistState";


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
        ["Dr.Mundo", "DrMundo"]
    ]);

    return exceptions.get(item) !== undefined ? exceptions.get(item) : item
}

interface LastChampionProps {
    champ: string;
    hidden: boolean;
    index: number;
}

export default function LastChampion({champ, hidden, index}: LastChampionProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHidden, setIsHidden] = usePersistState(hidden, `${champ}${index}`);

    const toggleVisibility = () => {
        if (!hidden) return;
        setIsHidden(!isHidden);
    }

    return (
        <li className="inline-block w-full hover:cursor-pointer">
            <div className={'justify-center items-center flex w-full h-96'} onClick={toggleVisibility}>
                {
                   (!hidden || !isHidden) && <img className="animate-appear object-contain h-96 ease-in" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championSplash(champ)}_1.jpg`} alt="placeholder" onLoad={() =>setIsLoaded(true)} style={isLoaded ? {} : {opacity: '0%'}} />
                }
                {
                    (hidden && isHidden) &&
                    <div className="w-fit h-48 flex items-center justify-center p-12">I'm hidden!<br/>Click me to reveal!</div>
                }
            </div>
        </li>
    )
}