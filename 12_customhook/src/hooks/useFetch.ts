import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url); // promise // response
        const result = await response.json(); // promise // json
        setData(result);
        setIsLoading(false);
      }
      
      fetchData();
    }, [url])

    return { data, isLoading }
}

export default useFetch