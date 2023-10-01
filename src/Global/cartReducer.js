export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, qty } = state; // Destructure the state once at the beginning
    let updatedShoppingCart; // Declare a new variable for the shopping cart
  
    switch (action.type) {
      case 'ADD_TO_CART':
        const check = shoppingCart.find((cart) => cart.id === action.id);
        if (check) {
          return {
            ...state,
            message: 'This product is already in the cart!',
          };
        } else {
          const product = action.products.find((product) => product.id === action.id);
          product.qty = 1;
          updatedShoppingCart = [product, ...shoppingCart]; // Update the shopping cart
          return {
            ...state,
            shoppingCart: updatedShoppingCart,
            totalPrice: totalPrice + product.price,
            qty: qty + 1,
            message: '',
          };
        }
  
      case 'DELETE_PRODUCT':
        const filtered = shoppingCart.filter((cart) => cart.id !== action.id);
        const deletedProduct = shoppingCart.find((cart) => cart.id === action.id);
        updatedShoppingCart = [...filtered]; // Update the shopping cart
        const updatedTotalPrice = totalPrice - deletedProduct.price * deletedProduct.qty;
        const updatedQty = qty - deletedProduct.qty;
        return {
          ...state,
          shoppingCart: updatedShoppingCart,
          totalPrice: updatedTotalPrice,
          qty: updatedQty,
          message: '',
        };
  
      // Rest of the cases...
  
      default:
        return state;
    }
  };
  