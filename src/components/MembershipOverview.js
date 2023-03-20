// Component for monitoring subscription product, price, and image
// Also houses actions for requesting replacement label and replacement box
// Will be used to supply discounts (if/when supported)

function MembershipOverview({ address, product, price }) {
  return (
    <div class='bg-white col-span-full lg:col-span-8 order-1 p-4 rounded-lg shadow'>
      <div class='mb-4'>
        <h3 class='text-xl font-bold text-gray-900'>Membership Overview</h3>
      </div>
      <div class='mb-4'>
        {address.address1} {address.address2}, {address.city}{' '}
        {address.provinceCode}, {address.zip}
      </div>
      <div class='gap-8 grid grid-cols-12 md:grid-cols-5 md:grid-flow-col md:grid-rows-2'>
        <img
          alt='THE 60L CO2 CANISTER'
          src='https://cdn.shopify.com/s/files/1/0262/9258/4497/products/Box_20and_202_20Canisters_91d61f48-b45a-4790-aa3a-4187e207a813_1024x1024.png?v=1669846782'
          class='col-span-4 md:col-span-1 md:row-span-2'
        />
        <div class='col-span-8 flex flex-wrap justify-between lg:col-span-2 md:col-span-2'>
          <div class=''>
            <div class='text-gray-500'>Product</div>
            <div class='font-bold text-blue-500'>{product}</div>
          </div>
          <div class=''>
            <div class='text-gray-500'>Total</div>
            <div>{price}</div>
          </div>
        </div>
        <button class='border-2 border-blue-500 col-span-full md:col-span-2 p-2 rounded-md text-blue-500 place-self-center w-full'>
          Email Me a Mailing Label
        </button>
        <form class='col-span-full md:col-span-2'>
          <label for='discount-code' class='text-gray-500 text-sm'>
            Apply Discount Code To Your Next Refill
          </label>
          <input
            id='discount-code'
            type='text'
            class='bg-gray-50 rounded-md shadow-inner w-full'
          />
        </form>
        <button class='border-2 border-blue-500 col-span-full md:col-span-2 p-2 rounded-md text-blue-500 place-self-center w-full'>
          Send Me a Refill Box
        </button>
      </div>
    </div>
  );
}
export default MembershipOverview;
