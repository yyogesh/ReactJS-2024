import { useAppSelector } from "../hooks/redux-hooks"

const Cart = () => {
    const { items, total } = useAppSelector(state => state.cart)
    const user = useAppSelector(state => state.user.currentUser)
    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {user && <p className="text-sm text-gray-600 mb-4">Welcome, {user.name}!</p>}
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (<>
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>

                            <p className="text-sm text-gray-600">
                                ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </>)
            }
        </div>
    )
}

export default Cart