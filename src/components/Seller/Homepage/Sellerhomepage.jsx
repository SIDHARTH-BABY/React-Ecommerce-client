import React, { useRef } from "react";
import { addProduct } from "../../../services/Seller";

const Sellerhomepage = () => {
  const productNameRef = useRef();
  const productDetailsRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const prodName = productNameRef.current.value;
      const prodDetails = productDetailsRef.current.value;
      const response = await addProduct(prodDetails);
    } catch (error) {
      console.log(error); 
    }
   
  };
  return (
    <div>
      <div>
        <div
          class="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700 ml-10 mt-10"
          //   style=`background-image: url('...');
          //   style={{ backgroundImage: `url(${slides[1].url})` }}
        >
          {/* content image */}

          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 text-white dark:text-neutral-50">
            Product Details
          </h5>
          <form onSubmit={handleSubmit}>
            <label class="mt-4">Product Name</label>
            <input
              type="text"
              ref={productNameRef}
              class="form-input ml-4 px-4 py-3 rounded-lg mt-4"
            />
            <label class="mt-4">Product Name</label>
            <input
              type="text"
              ref={productDetailsRef}
              class="form-input ml-4 px-4 py-3 rounded-lg mt-4"
            />

            <button
              type="submit"
              class="mt-4 ml-28 inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Button
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sellerhomepage;
