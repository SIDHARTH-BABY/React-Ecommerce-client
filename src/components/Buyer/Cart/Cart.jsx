import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import {
  changeQuantityCart,
  fetchCartItems,
  removeCartItems,
} from "../../../services/Cart";
import { DataContext } from "../../../App";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { createOrderRazorpay } from "../../../services/razorpayOrder";

const _DEV_ = document.domain === "localhost";

export const fetchCart = async (userId, setCartItems, setCheckoutPrice) => {
  const response = await fetchCartItems(userId);
  if (response.data.success) {
    setCartItems(response.data.productData);
    setCheckoutPrice(response.data.checkoutPrice);
    console.log(response);
  }
};

const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
 
  });
};

const Cart = () => {
  const [cartItems, setCartItems] = useState();
  const [cartUpdate, setCartUpdate] = useState();
  const [checkoutPrice, setCheckoutPrice] = useState();

  const userIdd = useContext(DataContext);

  // useEffect(() => {
  //   const userId = "1234";
  //   const fetchCart = async () => {
  //     const response = await fetchCartItems(userId);
  //     if (response.data.success) {
  //       setCartItems(response.data.productData);
  //       console.log(response);
  //     }
  //   };
  //   fetchCart();
  // }, [cartUpdate]);

  const displayRazorpay = async (checkoutPrice) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load, Are you online");
      return;
    }
    const amount = checkoutPrice.checkoutPrice;
    const response = await createOrderRazorpay(amount);
    if(response.data.success){
      console.log(response,'razor respnse');
      console.log( response.data.orderCreated.amount,'razor payment amoutn');
    
    var options = {
      key: _DEV_ ? "rzp_test_HVPlTnDZYqCBkb" : "PRODUCTION_KEY", // Enter the Key ID generated from the Dashboard
      amount: response.data.orderCreated.amount,
      currency: response.data.orderCreated.currency, //100p = 1rupee
      order_id: response.data.orderCreated._id,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",

      // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/", 
      
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    var paymentObject = new window.Razorpay(options);

    paymentObject.open();
  }
  };

  let UserId = useSessionContext().userId;
  useEffect(() => {
    fetchCart(UserId, setCartItems, setCheckoutPrice);
  }, [cartUpdate]);

  const removeCartItem = async (prodId) => {
    try {
      const response = await removeCartItems(prodId, UserId);
      if (response.data.success) {
        console.log(response.data.itemDeleted);
        setCartUpdate(response.data.itemDeleted);
      }
    } catch (error) {}
  };

  const itemQuantityChange = async (prodId, val, currQuantity, itemPrice) => {
    try {
      const newQuantity = currQuantity + val;

      const response = await changeQuantityCart(
        UserId,
        prodId,
        newQuantity,
        itemPrice
      );
      if (response.data.success) {
        setCartUpdate(response.data.updatedCart);
      }
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div class="container mx-auto mt-10">
        <div class="flex shadow-md my-10">
          <div class="w-3/4 bg-white px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">3 Items</h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cartItems?.map((item, index) => (
              <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20">
                    <img class="h-24" src={item.itemImage} alt="" />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm" key={index}>
                      {item.itemName}
                    </span>
                    <span class="text-red-500 text-xs">Apple</span>
                    <a
                      href="#"
                      class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      onClick={() => {
                        removeCartItem(item._id);
                      }}
                    >
                      Remove
                    </a>
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  {item.quantity != 1 ? (
                    <svg
                      class="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        itemQuantityChange(
                          item._id,
                          -1,
                          item.quantity,
                          item.itemPrice
                        );
                      }}
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  ) : (
                    ""
                  )}

                  <input
                    class="mx-2 border text-center w-10"
                    type="text"
                    value={`${item.quantity}`}
                  />
                  <svg
                    class="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      itemQuantityChange(
                        item._id,
                        1,
                        item.quantity,
                        item.itemPrice
                      );
                    }}
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">
                  {item.itemPrice}
                </span>
                <span class="text-center w-1/5 font-semibold text-sm">
                  {item.totalQuantityPrice}
                </span>
              </div>
            ))}
            <a
              href="#"
              class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                class="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div>

          <div id="summary" class="w-1/4 px-8 py-10">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase">Items 3</span>
              <span class="font-semibold text-sm">
                {checkoutPrice ? checkoutPrice : 0}
              </span>
            </div>

            <div class="py-10">
              <label
                for="promo"
                class="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your Address"
                class="p-2 text-sm w-full"
              />
            </div>
            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{checkoutPrice ? checkoutPrice : 0}</span>
              </div>
              <button
                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={() => {
                  displayRazorpay({ checkoutPrice });
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
