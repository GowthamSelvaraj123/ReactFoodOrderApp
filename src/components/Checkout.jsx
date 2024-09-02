import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserContent";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error"; // Assuming you have an Error component

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { data, error, sendRequest } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
        // Reset the order submitted state when closing the modal
        setIsOrderSubmitted(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        setIsSending(true);
        sendRequest({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }).then(() => {
            setIsSending(false);
            setIsOrderSubmitted(true);
        }).catch(() => {
            setIsSending(false);
        });
    }

    // Show success message
    if (isOrderSubmitted) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
                <h2>Success</h2>
                <p>Your Order was submitted successfully!</p>
                <p className="modal-actions"><Button onClick={handleClose}>Okay</Button></p>
            </Modal>
        );
    }

    // Show loading state or form
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">
                    {isSending ? <span>Sending Order data...</span> : (
                        <>
                            <Button type="button" textOnly onClick={handleClose}>Close</Button>
                            <Button>Submit Order</Button>
                        </>
                    )}
                </p>
            </form>
        </Modal>
    );
}
