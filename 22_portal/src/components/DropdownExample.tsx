import React from 'react'
import Dropdown from './Dropdown'

const DropdownExample = () => {
    const handleSelect = (option: string) => {
        console.log(`Selected: ${option}`);
      };
    return (
        <div className="p-8">
            <Dropdown>
                {
                    ({ isOpen, toggle, close }) => (
                        <>
                            <div className="relative">
                                <div onClick={toggle}>
                                    <Dropdown.Trigger>
                                        <span>Select Option</span>
                                    </Dropdown.Trigger>
                                </div>

                                {isOpen && (
                                    <div className="relative">
                                        <div
                                            className="fixed inset-0"
                                            onClick={close}
                                        />

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleSelect('Option 1')}>
                                                Option 1
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSelect('Option 2')}>
                                                Option 2
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSelect('Option 3')}>
                                                Option 3
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                }
            </Dropdown>
        </div>
    )
}

export default DropdownExample