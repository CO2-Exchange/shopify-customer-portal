import { useEffect, useState } from 'react';
import AccountInformation from './AccountInformation.js';
import ExchangeHistory from './ExchangeHistory.js';
import MembershipOverview from './MembershipOverview.js';
import { Link, useNavigate } from 'react-router-dom';
import contractsDetailsMockJson from '../mock-json/subscription-details.json';


// Component housing the subscriptions view
// Responsible for fetching contract details
// Navigation between contracts
const devMode = true;

function Subscription(props) {
  const [orders, setOrders] = useState(null);
  const [subscriptionAddress, setSubscriptionAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscriptionProduct, setSubscriptionProduct] = useState("")
  const [subscriptionProductAmount, setProductAmount] = useState(null);
  const navigator = useNavigate()
  const pathPrefix = devMode? "/subscription/" : "/apps/fillstation/web/subscription/";

  useEffect(() => {
    if(devMode)
    assignVariables(contractsDetailsMockJson)
    else
    fetchOrders(window.location.pathname.substring(
      window.location.pathname.lastIndexOf('/') + 1
    ));
  }, []);
  function switchContractContext(e){
    navigator(pathPrefix+e.target.value)
    fetchOrders(e.target.value)
  }
  function assignVariables(respJson){
    var cleanedResponse =
      respJson.body.data.subscriptionContract.orders.edges;
    var filteredOrders = [];
    //map graphql response to cleaner array structure
    for (const order of cleanedResponse) {
      filteredOrders.push(order.node);
    }
    setOrders(filteredOrders);
    //Set subscription product amount to the most recent orders price
    setProductAmount(respJson.body.data.subscriptionContract.orders.edges[0].node.originalTotalPriceSet.shopMoney.amount);
    //Set subscription product amount to the most recent orders first product
    setSubscriptionProduct(respJson.body.data.subscriptionContract.orders.edges[0].node.lineItems.edges[0].node.name);
    
    setSubscriptionAddress(
      respJson.body.data.subscriptionContract.deliveryMethod.address
    );
    setPaymentMethod(
      respJson.body.data.subscriptionContract.customerPaymentMethod
    );
    setLoading(false);
  }
  async function fetchOrders(id) {
    setLoading(true)
    var resp = await fetch(
      `/apps/fillstation/api/v1/subscription/orders?subscriptionContractId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    var respJson = await resp.json();
    assignVariables(respJson)
  }

  function RenderView() {
    if (loading) return <h1>loading</h1>;
    return (
      <main class='gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-12 p-4 lg:p-8'>
        <nav class='col-span-full flex justify-between' aria-label='Breadcrumb'>
          <ol class='inline-flex items-center space-x-1 md:space-x-3'>
            <li class='inline-flex items-center w-24'>
              <Link
                to={props.pathPrefix}
                class='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'
              >
                Refill Club Membership
              </Link>
            </li>
            <svg
              aria-hidden='true'
              class='w-6 h-6 text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
            <select
              class='border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              name='provinceCode'
              onChange={switchContractContext}
            >
              {props.contracts.map((contract) => {
                return (
                  <option key={contract.id} value={contract.id.substring(
                    contract.id.lastIndexOf('/') + 1)}>
                    {contract.deliveryMethod.address.address1}{' '}{contract.lines.edges[0].node.title} 
                  </option>
                );
              })}
            </select>
          </ol>
        </nav>

        <div class='grid grid-cols-12 items-start lg:block lg:col-span-8 lg:space-y-8 space-y-4'>
          <MembershipOverview
            address={subscriptionAddress}
            product={subscriptionProduct}
            price={subscriptionProductAmount}
          ></MembershipOverview>
          <ExchangeHistory orders={orders}></ExchangeHistory>
        </div>
        <AccountInformation
          subscriptionAddress={subscriptionAddress}
          paymentMethod={paymentMethod}
          contractId={window.location.pathname.substring(
            window.location.pathname.lastIndexOf('/') + 1
          )}
        ></AccountInformation>
      </main>
    );
  }

  return <>{RenderView()}</>;
}

export default Subscription;
