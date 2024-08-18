import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

interface IFormData {
    username: string;
    email: string;
    age: number;
}

const initialState: IFormData = {
    username: 'Test',
    email: '',
    age: 0,
}

getAge()
function getAge() {}

const UserForm = () => {
    const [formData, setFormData] = useState<IFormData>(initialState);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        // setFormData(initialState);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        const { name, value } = event.target;
        console.log(name, value);
        // setFormData({ ...formData, [name]: value });
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: name === 'age' ? parseInt(value, 10) || 0 : value,
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                aria-label="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username" />

            <input
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={formData.email}
                onChange={handleChange}
                name="email" />

            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UserForm