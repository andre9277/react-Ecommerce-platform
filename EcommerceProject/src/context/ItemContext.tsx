import React, { createContext, ReactNode, useReducer } from "react";

// Define the type for your context value
type ItemContextType = {
  items: string[]; // Replace 'string[]' with the actual type of your items
  dispatch: React.Dispatch<ItemAction>;
};

//Items
/* type StoreItemProps = {
    _id: string;
    title: string;
    price: number;
    imgURL: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }; */

type ItemAction =
  | { type: "SET_ITEMS"; payload: string[] }
  | { type: "CREATE_ITEM"; payload: string };

export const ItemsContext = createContext({} as ItemContextType);

export const itemsReducer = (
  state: ItemContextType,
  action: ItemAction
): ItemContextType => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "CREATE_ITEM":
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    default:
      return state;
  }
};

export const ItemsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(itemsReducer, {
    items: [], // Initialize items as an empty array
    dispatch: () => {}, // Initialize dispatch with an empty function
  });

  return (
    <ItemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
