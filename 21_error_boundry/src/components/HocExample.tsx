import React from 'react'
import Accordion from './Accordion';
import { withLogging } from './withLoggin';

const HocExample = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <div>
            <Accordion>
                <Accordion.Item title="Higher-Order Components (HOCs)">
                    HOCs are functions that take a component and return a new component with additional props or behavior.
                </Accordion.Item>
                <Accordion.Item title="Compound Components">
                    Compound components use React's context API to share state and behavior between related components.
                </Accordion.Item>
                <Accordion.Item title="Portals">
                    Portals allow rendering a component's children into a different part of the DOM tree.
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default withLogging(HocExample)