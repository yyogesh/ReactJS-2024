import React from 'react'

type AccordionContextType = {
    activeIndex: number | null;
    setActiveIndex: (index: number | null) => void;
};

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

const Accordion = ({ children }: { children: React.ReactNode }) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    return (
        <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
            <div className="border rounded-lg overflow-hidden">{children}</div>
        </AccordionContext.Provider>
    )
}

const AccordionItem = ({title, children}: {title: string, children: React.ReactNode}) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error('AccordionItem must be used within an Accordion');

    const { activeIndex, setActiveIndex } = context;
    const index = React.useRef(Math.random());
    const isActive = activeIndex === index.current;
    const handleClick = () => {
        setActiveIndex(isActive ? null : index.current);
    };

    return (
        <div className="border-b last:border-b-0">
            <button
                className="w-full p-4 text-left font-semibold bg-gray-100 hover:bg-gray-200"
                onClick={handleClick}
            >
                {title}
            </button>
            {isActive && <div className="p-4">{children}</div>}
        </div>
    )
}


Accordion.Item = AccordionItem

export default Accordion

{/* <Icon.Home></Icon.Home>
<Icon.Setting></Icon.Home> */}