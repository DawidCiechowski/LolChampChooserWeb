import { useState } from "react";
import { champions } from "./constants";

export const [filteredChampions, setFilteredChampions] = useState<string[]>([]);