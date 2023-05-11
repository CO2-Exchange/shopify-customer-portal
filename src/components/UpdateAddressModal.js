import { useEffect, useState } from 'react';



// Modal with a form to update a subscription contract address

function UpdateAddressModal({
  subscriptionAddress,
  closeModal,
  updateAddress
}) {
  const [address, setAddress] = useState({});

  useEffect(() => {
    setAddress(subscriptionAddress);
  }, []);

  function onAddressChange(e){
    setAddress((address) => ({
      ...address,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div
      id='addressModal'
      tabindex='-1'
      aria-hidden='true'
      class='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full px-4'
    >
      <div class='relative w-full h-full max-w-2xl md:h-auto  mx-auto'>
        <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div class='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 class='text-xl font-semibold text-gray-900 dark:text-white'>
              Update Address
            </h3>
            <button
              onClick={() => closeModal()}
              type='button'
              class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='addressModal'
            >
              <svg
                aria-hidden='true'
                class='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span class='sr-only'>Close modal</span>
            </button>
          </div>
          <div class='px-4'>
            <label class='block mb-6'>
              <span class='text-gray-700'>First Name</span>
              <input
                key='firstName'
                name='firstName'
                type='text'
                value={address.firstName}
                defaultValue={address.firstName}
                onChange={onAddressChange}
                class='
                        block
                        w-full
                        mt-1
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      '
                placeholder='Joe Bloggs'
              />
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>Last Nmae</span>
              <input
                name='lastName'
                type='text'
                value={address.lastName}
                defaultValue={address.lastName}
                onChange={onAddressChange}
                class='
                        block
                        w-full
                        mt-1
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      '
                placeholder=''
              />
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>Address line 1</span>
              <input
                value={address.address1}
                onChange={onAddressChange}
                name='address1'
                type='text'
                class='
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        '
                placeholder=''
              />
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>Address line 2</span>
              <input
                value={address.address2}
                onChange={onAddressChange}
                name='address2'
                type='text'
                class='
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        '
                placeholder=''
              />
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>City</span>
              <input
                value={address.city}
                onChange={onAddressChange}
                name='city'
                type='text'
                class='
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        '
                placeholder=''
              />
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>State/Province</span>
              <select class='border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name="provinceCode" value={address.provinceCode} onChange={onAddressChange}>
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
              </select>
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>Zip/Postal code</span>
              <input
                value={address.zip}
                onChange={onAddressChange}
                name='zip'
                type='text'
                class='
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        '
                placeholder=''
              />
            </label>
            <label class='block mb-6'>
              <span class='text-gray-700'>Phone</span>
              <input
                value={address.phone}
                onChange={onAddressChange}
                name='phone'
                type='text'
                class='
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        '
                placeholder=''
              />
            </label>
          </div>

          <div class='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              onClick={() => updateAddress(address)}
              data-modal-hide='addressModal'
              type='button'
              class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Update Address
            </button>
            <button
              onClick={() => closeModal()}
              data-modal-hide='addressModal'
              type='button'
              class='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateAddressModal;
