import React, { memo } from 'react'
import SlowItem from './SlowItem';

const SlowList = memo(({text}: {text: string}) => {
    console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');
    let items = [];
    for (let i = 0; i < 250; i++) {
        items.push(<SlowItem key={i} text={text} />);
    }
    return (
        <ul className="items">
            {items}
        </ul>
    )
})

export default SlowList


