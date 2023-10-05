// Component for monitoring subscription product, price, and image
// Also houses actions for requesting replacement label and replacement box
// Will be used to supply discounts (if/when supported)

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function Toast({ message, type }) {
  const toastStyles = {
    success: 'bg-[#DEFAE8]',
    error: 'bg-[#FCE8F3]',
    info: 'bg-[#FDF6B2]'
  };

  return (
    <div id="alert-1" className={`${toastStyles[type]} flex items-center mb-4 px-2.5 py-2 rounded-lg text-blue-800`} role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div class="ml-3 text-sm font-medium">
        {message}
      </div>
    </div>
  );
}

function MembershipOverview({ address, product, price, image, sendReplacementBox, applyDiscountCode }) {
  const [discountCode, setDiscountCode] = useState('');

  function handleInputChange(event) {
    setDiscountCode(event.target.value);
  }

  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const RESPONSE_MESSAGES = {
    CURRENTLY_INACTIVE: 'Discount is inactive.',
    CUSTOMER_NOT_ELIGIBLE: 'Given customer does not qualify for the discount.',
    CUSTOMER_USAGE_LIMIT_REACHED: 'Customer usage limit has been reached.',
    INCOMPATIBLE_PURCHASE_TYPE: 'Purchase type does not qualify for the discount.',
    INTERNAL_ERROR: 'Internal error during discount code validation.',
    NOT_FOUND: 'Discount code is not found.',
    NO_ENTITLED_LINE_ITEMS: 'Discount does not apply to any of the given line items.',
    NO_ENTITLED_SHIPPING_LINES: 'No applicable shipping lines.',
    PURCHASE_NOT_IN_RANGE: 'Purchase amount of items does not qualify for the discount.',
    QUANTITY_NOT_IN_RANGE: 'Quantity of items does not qualify for the discount.',
    USAGE_LIMIT_REACHED: 'Discount usage limit has been reached.'
  };

  async function handleDiscountApply() {
    const appliedDiscount = await applyDiscountCode(discountCode);
    console.log(appliedDiscount);

    if (appliedDiscount?.subscriptionDraftDiscountCodeApply?.appliedDiscount?.rejectionReason) {
      const rejectionReason = appliedDiscount.subscriptionDraftDiscountCodeApply.appliedDiscount.rejectionReason;

      if (rejectionReason) {
        setToast({
          message: RESPONSE_MESSAGES[rejectionReason] || 'Unknown error',
          type: 'error',
          visible: true
        });
      } else {
        setToast({
          message: 'Discount applied successfully!',
          type: 'success',
          visible: true
        });
      }
    } else if (appliedDiscount.body.data.subscriptionDraftCommit) {
      setToast({
        message: 'Discount applied successfully!',
        type: 'success',
        visible: true
      });
    } else {
      setToast({
        message: 'Failed to apply discount. Please try again.',
        type: 'error',
        visible: true
      });
    }

    setTimeout(() => {
      setToast(prevToast => ({ ...prevToast, visible: false }));
    }, 3000);
  }

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
      <div class="gap-8 grid md:grid-cols-5 md:grid-flow-col">
        {image ? <img src={image} class="md:col-span-1 md:row-span-2" /> : <></>}

        <div class="flex flex-wrap justify-between lg:col-span-2 md:col-span-2">
          <div class="">
            <div class="text-gray-500">Product</div>
            <div class="font-bold text-blue-500">{product}</div>
          </div>
          <div class="">
            <div class="text-gray-500">Total</div>
            <div>{formatter.format(price)}</div>
          </div>
        </div>

        <div class="hidden md:!block md:col-span-2"><div></div></div>

        <form class="md:col-span-2">
          <label for="discount-code" class="text-gray-500 text-sm">
            Apply Discount Code To Your Next Refill
          </label>
          <div class="relative">
            <input value={discountCode} onChange={handleInputChange} type="text" id="discount-code" class="block h-14 w-full px-2.5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Discount Code" required />
            <button onClick={() => handleDiscountApply()} type="button" class="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-base px-6 py-2">Apply</button>
          </div>
        </form>

        <button onClick={() => sendReplacementBox('box_action')} class="border-2 border-blue-500 md:col-span-2 p-2 rounded-md text-blue-500 place-self-center w-full">Send Me a Refill Box</button>
      </div>

      {toast.visible && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
export default MembershipOverview;
