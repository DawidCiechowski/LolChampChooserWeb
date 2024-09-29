import { useState } from "react";


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

    return (
        <li className={`inline-block w-full hover:cursor-pointer mx-2`}>
            <div className={`justify-center items-center flex w-full h-auto border-4 border-rose-500 rounded-md`}>
                {
                    <img className={`object-contain h-96 ease-in animate-appear ${hidden ? 'transition brightness-0 hover:brightness-100' : ''}`} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championSplash(champ)}_1.jpg`} alt="placeholder" onLoad={() => {setIsLoaded(true)}} style={isLoaded ? {} : {opacity: '0%'}} />
                }
            </div>
        </li>
    )
}