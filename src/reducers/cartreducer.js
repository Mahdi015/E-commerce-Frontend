let init = []

// Load data
if(typeof window !== 'undefined'){
if (localStorage.getItem("cart")){
    init = JSON.parse(localStorage.getItem("cart"))
  } else {
     init = []
  }
}

export const cartReducer = (state = init,action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload;
        default:
            return state;

    }
}