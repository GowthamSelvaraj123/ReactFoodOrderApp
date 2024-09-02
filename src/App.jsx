import Header from "./components/Header";
import Meals from "./components/Meals";
import {CartContextProvider} from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserContent";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
function App() {
  return (
    <>
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header></Header>
      <Meals></Meals>
      <Cart></Cart>
      <Checkout></Checkout>
    </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
