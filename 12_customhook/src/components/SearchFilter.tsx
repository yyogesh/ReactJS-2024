import { useState, useTransition } from "react";

const items: string[] = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`);

const SearchFilter = () => {
    const [query, setQuery] = useState<string>('');
    const [filterdItems, setFilterdItems] = useState<string[]>(items);
    const [isPending, startTransition] = useTransition();

    console.log('isPending', isPending)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        startTransition(() => {
            const filterd = items.filter(item => item.toLowerCase().includes(value.toLowerCase()));
            setFilterdItems(filterd);
        })
    }

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search items..."
            />
            {isPending && <p>Filtering...</p>}
            <ul>
                {
                    filterdItems.map(item => <li key={item}>{item}</li>)
                }
            </ul>
        </div>
    )
}

export default SearchFilter