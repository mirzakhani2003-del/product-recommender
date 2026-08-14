import { useEffect, useState } from "react";

function useDebouce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearInterval(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebouce;