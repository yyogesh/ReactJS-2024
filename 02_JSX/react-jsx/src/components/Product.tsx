import Dearptment from "./Dearptment";

const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
]; // 0, 1, 2, 3

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const square = (x: number) => {
    return x * x;
}

const square1 = (x: number) => x * x;

const getEmployeeInfo = () => {
    return {
        name: 'John Doe',
        age: 30,
        address: '123 Main St',
    }
}

const getEmployeeInfo1 = () => ({
    name: 'John Doe',
    age: 30,
    address: '123 Main St',
})

const formattedArr = arr.map(item => {
    return <button key={item}>{'Button ' + item}</button>
})

const Product = () => {
    return (
        <>
            <div>{arr.join(', ')}</div>
            {formattedArr}
            <ul>
                {
                    products.map((product, index) => (
                        <li key={product.id}>S.No {index}- ID -{product.id} {product.title}</li>
                    ))
                }
            </ul>

            <ul>
                {
                    products.map((product, index) => {
                        return (
                            <li 
                            style={{color: product.title === 'Apple' ? 'magenta': 'green'}}
                            key={product.id}>S.No {index + 1}- ID -{product.id} {product.title}</li>
                        )
                    })
                }
            </ul>
            <hr/>
            <Dearptment/>
        </>
    )
}

export default Product