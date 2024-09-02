import { createContext, useState } from "react";
const UserProgressContext = createContext({
    progress:'',
    showCart:() => {}, 
    showCheckout:() => {},
    hideCheckout:() => {}
});
export function UserProgressContextProvider({children})
{ 
 const [userProgress, setUserProgrerss] = useState();
 function showCart()
 {
    setUserProgrerss('cart');
 }
 function hideCart()
 {
    setUserProgrerss();
 }
 function showCheckout()
 {
    setUserProgrerss('checkout');
 }
 function hideCheckout()
 {
    setUserProgrerss('');
 }
 const userProgressCtx = {
    progress: userProgress, 
    showCart, 
    hideCart, 
    showCheckout, 
    hideCheckout
 }
 return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}
export default UserProgressContext;