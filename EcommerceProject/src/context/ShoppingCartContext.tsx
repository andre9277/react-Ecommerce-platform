import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  fetchItems: () => void;
  items: StoreItemProps[];
};

type CartItem = {
  id: number;
  quantity: number;
};

//Items
type StoreItemProps = {
  _id: string;
  title: string;
  price: number;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

//custom hook
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartitems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const [items, setItems] = useState<StoreItemProps[]>([]);

  //Reads all the quantity values from the cart
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  //opens the cart menu
  const openCart = () => setIsOpen(true);
  //closes the cart menu
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    /* if we have the value i want to return this getItemQuantity, otherwise return 0 */
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartitems((currItems) => {
      /* if there is a match for the current item id, add 1 */
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          /*  otherwise keep the item quantity and add 1 */
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartitems((currItems) => {
      /* check the quantity is equal to 1, if its 1 get rid of it*/
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          /*  otherwise keep the item quantity and decrease 1 */
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartitems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  //Fetch data from database
  const fetchItems = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/items/`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("An error occurred while fetching items:", error);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        fetchItems,
        items,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
