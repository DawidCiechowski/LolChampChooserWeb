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



export default function LastChampion(props: {champ: string}) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <li className="inline-block">
            <div className="">
                {
                    <img className="animate-appear" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championSplash(props.champ)}_1.jpg`} alt="placeholder" onLoad={() =>setIsLoaded(true)} style={isLoaded ? {} : {display: 'none'}} />
                }
            </div>
        </li>
    )
}