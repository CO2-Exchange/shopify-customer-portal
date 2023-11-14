// Component for monitoring subscription product, price, and image
// Also houses actions for requesting replacement label and replacement box
// Will be used to supply discounts (if/when supported)

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function MembershipOverview({ address, product, price, image, sendAction, showToast, applyDiscountCode }) {
  const [discountCode, setDiscountCode] = useState('');

  function handleInputChange(event) {
    setDiscountCode(event.target.value);
  }

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

    if (appliedDiscount?.subscriptionDraftDiscountCodeApply?.appliedDiscount?.rejectionReason) {
      const rejectionReason = appliedDiscount.subscriptionDraftDiscountCodeApply.appliedDiscount.rejectionReason;

      if (rejectionReason) {
        showToast(RESPONSE_MESSAGES[rejectionReason] || 'Unknown error', 'error');
      } else {
        showToast('Discount applied successfully!', 'success');
      }
    } else if (appliedDiscount.subscriptionDraftCommit) {
      showToast('Discount applied successfully!', 'success');
    } else {
      showToast('Failed to apply discount. Please try again.', 'error');
    }
  }

  async function handleAction(actionCode) {
    const actionNames = {
      'send_replacement_label': 'replacement label',
      'box_action': 'refill box'
    };

    const action = actionNames[actionCode] || 'Unknown action';

    try {
      const response = await sendAction(actionCode);

      if (response.accepted) {
        showToast(`Your ${action} is on its way!`, 'success');
      } else {
        showToast(`${response.message}`, 'error');
      }
    } catch (error) {
      showToast(`An error occurred while processing your request. Please try again later.`, 'error');
    }
  }

  useEffect(() => {

  }, [address]);
  return (
    <div class="bg-white col-span-full lg:col-span-8 order-1 p-4 rounded-lg shadow">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-900">Membership Overview</h3>
      </div>
      <div class="mb-4">
        {address?.address1}{address?.address2 ? ` ${address?.address2}`: ""}, {address?.city} {address?.provinceCode}, {address?.zip}
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

        <div class="md:col-span-2">
        <button onClick={() => handleAction('send_replacement_label')} class="border-2 border-blue-500 md:col-span-2 p-2 rounded-md text-blue-500 place-self-center w-full">Send Me a Replacement Label</button>
        </div>

        <form class="md:col-span-2">
          <label for="discount-code" class="text-gray-500 text-sm">
            Apply Discount Code To Your Next Refill
          </label>
          <div class="relative">
            <input value={discountCode} onChange={handleInputChange} type="text" id="discount-code" class="block h-14 w-full px-2.5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Discount Code" required />
            <button onClick={() => handleDiscountApply()} type="button" class="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-base px-6 py-2">Apply</button>
          </div>
        </form>
        
        <button onClick={() => handleAction('box_action')} class="border-2 border-blue-500 md:col-span-2 p-2 rounded-md text-blue-500 place-self-center w-full">Send Me a Refill Box</button>
      </div>
    </div>
  );
}
export default MembershipOverview;
