interface SlowItemProps {
    text: string
}

// const SlowItem: React.FC<SlowItemProps> = ({text}) => {
// const SlowItem = ({text}: {text: string}) => {
const SlowItem = ({ text }: SlowItemProps) => {
    let startTime = performance.now(); // 100 
    while (performance.now() - startTime < 1) { // 101 - 100 < 1
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
    return (
        <li className="item">
            Text: {text}
        </li>
    )
}

export default SlowItem