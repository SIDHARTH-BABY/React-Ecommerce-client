import React from "react";

const Cards = () => {
  const slides = [
    {
      url: "Images/six.jpg",
    },
    {
      url: "Images/seven.jpg",
    },
    {
      url: "Images/six.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];
  return (
    <div>
      <div class="flex flex-wrap bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-16 sm:py-24 lg:py-16 px-20">
        <div
          class="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700 ml-10 mt-10"
          //   style=`background-image: url('...');
          //   style={{ backgroundImage: `url(${slides[1].url})` }}
        >
          {/* content image */}
          <div class="box-content h-32 w-40 border-4 ml-20">
            <img src={`${slides[2].url}`} class="h-32 w-40" />
          </div>
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 text-white dark:text-neutral-50">
            Card title
          </h5>
          <p class="mb-4 text-base text-neutral-600 text-white  dark:text-neutral-200">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            type="button"
            class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
