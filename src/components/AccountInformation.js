import UpdateToast from "./UpdateToast.js";
import { useEffect, useState } from "react";
import UpdateAddressModal from "./UpdateAddressModal.js";


// Component for managing user account informatino
// Updating credit cards/billing address
// Update address

function AccountInformation({ subscriptionAddress, paymentMethod, contractId, fetchSubscription }) {
  const [toastMsg, setToastMsg] = useState("")
  const [toastVisible, setToastVisible] = useState(false)
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  async function updatePaymentMethod() {
    var resp = await fetch(`/apps/fillstation/api/v1/subscription/${contractId}/update-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id })
    });
    activateToast("Sent Update Email!")
  }
  async function updateAddress(address){
    activateToast("Updated Address!")
    setAddressModalOpen(false)
    var resp = await fetch(
      `/apps/fillstation/api/v1/subscription/${contractId}/update-address`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          provinceCode: address.provinceCode,
          countryCode: address.countryCode,
          zip: address.zip,
          firstName: address.firstName,
          lastName: address.lastName,
          company: address.company,
          phone: address.phone,
        }),
      }
    );
    fetchSubscription(contractId)
  } 
  useEffect(() => {
  }, [subscriptionAddress]);
  async function activateToast(message){
    setToastMsg(message)
    setToastVisible(true)
    setTimeout(()=> {
      setToastVisible(false)
      setToastMsg("")
  }, 6000)
  }

  return (
    <div class=' laptop:block laptop:col-span-4'>
      <div class='bg-white laptop:col-span-4 p-4 rounded-lg shadow'>
        <div class='mb-4'>
          <h3 class='text-xl font-bold text-gray-900'>Account Information</h3>
        </div>

        <div class='divide-y'>
          <div class='py-4'>
            <div class='flex justify-between mb-4'>
              <div class='font-light'>Shipping Address</div>
              <button onClick={()=> setAddressModalOpen(true)}class='text-blue-500 underline'>Edit</button>
            </div>
            <div class='font-medium'>
              {subscriptionAddress?.name}
              <br />
              {subscriptionAddress?.address1}
              {subscriptionAddress?.address2}
              <br />
              {subscriptionAddress?.city} {subscriptionAddress?.provinceCode}{' '}
              {subscriptionAddress?.zip}
            </div>
          </div>

          <div class='py-4'>
            <div class='flex justify-between mb-4'>
              <div class='font-light'>Payment Method</div>
              <button onClick={()=> {updatePaymentMethod()}} class='text-blue-500 underline'>Edit</button>
            </div>
            <div class='flex items-center space-x-4'>
              {
                paymentMethod?.instrument?.maskedNumber ? 
                (<div>
                  <div class='font-medium'>
                    {paymentMethod?.instrument?.brand} {paymentMethod?.instrument?.maskedNumber}
                  </div>
                  <div class='font-light'>
                    Expires {paymentMethod?.instrument?.expiryMonth}/{paymentMethod?.instrument?.expiryYear}
                  </div>
                </div>) 
                :
                <>Pay-Pal Billing Agreement</>
              }
            </div>
          </div>

          <div class='py-4'>
            <div class='flex justify-between mb-4'>
              <div class='font-light'>Billing Address</div>
              <button onClick={()=> {updatePaymentMethod()}} class='text-blue-500 underline'>Edit</button>
            </div>
            <div class='font-medium'>
              {
                paymentMethod?.instrument?.billingAddress?.firstName ? 
                (<>
                  {paymentMethod?.instrument?.billingAddress?.firstName}{' '}
                  {paymentMethod?.instrument?.billingAddress?.lastName}
                </>) :
                <>{paymentMethod?.instrument?.billingAddress?.name}</>
              }
              <br />
              {paymentMethod?.instrument?.billingAddress?.address1}
              <br />
              {paymentMethod?.instrument?.billingAddress?.city}{' '}
              {paymentMethod?.instrument?.billingAddress?.provinceCode}{' '}
              {paymentMethod?.instrument?.billingAddress?.zip}
            </div>
          </div>
        </div>
      </div>
      {addressModalOpen?<UpdateAddressModal updateAddress={updateAddress} closeModal={()=> setAddressModalOpen(false)} modalOpen={addressModalOpen} subscriptionAddress={subscriptionAddress}></UpdateAddressModal>: <></>}
      
      <UpdateToast visible={toastVisible} text={toastMsg} close={() => {setToastVisible(false)}}></UpdateToast>
    </div>
  );
}
export default AccountInformation;
