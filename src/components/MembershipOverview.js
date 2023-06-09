// Component for monitoring subscription product, price, and image
// Also houses actions for requesting replacement label and replacement box
// Will be used to supply discounts (if/when supported)

import { useEffect } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});


function MembershipOverview({ address, product, price, image, sendReplacementBox }) {

  useEffect(() => {

  }, [address]);
  return (
    <div class="bg-white col-span-full lg:col-span-8 order-1 p-4 rounded-lg shadow">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-900">Membership Overview</h3>
      </div>
      <div class="mb-4">
        {address?.address1} {address?.address2}, {address?.city} {address?.provinceCode}, {address?.zip}
      </div>
      <div class="gap-8 grid grid-cols-12 md:grid-cols-5 md:grid-flow-col md:grid-rows-2">
        {image ? <img src={image} class="col-span-4 md:col-span-1 md:row-span-2" /> : <></>}
        <div class="col-span-8 flex flex-wrap justify-between lg:col-span-2 md:col-span-2">
          <div class="">
            <div class="text-gray-500">Product</div>
            <div class="font-bold text-blue-500">{product}</div>
          </div>
          <div class="">
            <div class="text-gray-500">Total</div>
            <div>{formatter.format(price)}</div>
          </div>
        </div>
       

        <form class="col-span-full md:col-span-2 hidden">
          <label for="discount-code" class="text-gray-500 text-sm">
            Apply Discount Code To Your Next Refill
          </label>
          <input id="discount-code" type="text" class="bg-gray-50 rounded-md shadow-inner w-full" />
        </form>
        <button onClick={() => sendReplacementBox('box_action')} class="border-2 border-blue-500 col-span-full md:col-span-2 p-2 rounded-md text-blue-500 place-self-center w-full">Send Me a Refill Box</button>
      </div>
    </div>
  );
}
export default MembershipOverview;
