import { useEffect, useMemo, useState } from "react";

export default function usePersistState<T>(initialValue: T,id: string): [T, (newState: T) => void] {
    const _initialValue = useMemo(() => {
        const localStorageValueStr = localStorage.getItem('state:' + id);
        if(localStorageValueStr) {
            return JSON.parse(localStorageValueStr);
        }

        return initialValue
    }, []);

    const [state, setState] = useState(_initialValue);

    useEffect(() => {
        const stateStr = JSON.stringify(state);
        localStorage.setItem('state:' + id, stateStr);
    }, [state]);

    return [state, setState];
}