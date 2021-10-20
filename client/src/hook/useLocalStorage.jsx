import { useEffect, useState } from 'react'
const PREFIX = "whatsapp-clone-"
const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        console.log("this is use state is parsed");
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null){

            const parseValue= JSON.parse(jsonValue);
            console.log(parseValue);
            return parseValue;
        }
        if (typeof initialValue === 'function') {
            console.log("this function is called");
            return initialValue();
        } else {
            console.log("this value is called");
            return initialValue;
        }
    });
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
        console.log("use Effect is called!");
    }, [prefixedKey, value]);
    return [value, setValue];
}

export default useLocalStorage;
