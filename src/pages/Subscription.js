import { useEffect, useState } from 'react';
import AccountInformation from '../components/AccountInformation.js';
import ExchangeHistory from '../components/ExchangeHistory.js';
import MembershipOverview from '../components/MembershipOverview.js';
import Toast from '../components/Toast.js';
import { useNavigate } from 'react-router-dom';
import contractsDetailsMockJson from '../mock-json/subscription-details.json';
import SubscriptionSelect from '../components/SubscriptionSelect.js';

// Component housing the subscriptions view
// Responsible for fetching contract details
// Navigation between contracts
const devMode = process.env.NODE_ENV === 'development';

function Subscription(props) {
  const [orders, setOrders] = useState(null);
  const [subscriptionAddress, setSubscriptionAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscriptionProduct, setSubscriptionProduct] = useState('');
  const [variantImage, setVariantImage] = useState('');
  const [subscriptionProductAmount, setProductAmount] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('ACTIVE');
  const [contractId, setContractId] = useState(0);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });


  const navigator = useNavigate();
  const pathPrefix = devMode ? '/subscription/' : '/apps/fillstation/web/subscription/';

  // In dev mode, assign local variables to mockjson.
  // In production, fetch contracts and assignVariables
  useEffect(() => {
    const subId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    setContractId(subId)
    if (devMode) assignVariables(contractsDetailsMockJson);
    else {
      fetchSubscription(subId);
    }
  }, []);

  function navigateToSubscription(e) {
    navigator(pathPrefix + e.target.value);
    fetchSubscription(e.target.value);
  }
  function assignVariables(respJson) {
    var cleanedResponse = respJson.subscription.subscriptionContract?.orders?.edges;
    var filteredOrders = [];
    //map graphql response to cleaner array structure
    for (const order of cleanedResponse) {
      filteredOrders.push(order.node);
    }
    setOrders(filteredOrders);
    //Set subscription product amount to the most recent orders price
    setProductAmount(respJson.subscription.subscriptionContract.lines.edges[0].node.currentPrice.amount);
    //Set subscription product amount to the most recent orders first product
    setSubscriptionProduct(respJson.subscription.subscriptionContract.lines.edges[0].node.title);

    if (respJson.subscription.subscriptionContract.lines.edges[0].node?.variantImage?.url) setVariantImage(respJson.subscription.subscriptionContract.lines.edges[0].node.variantImage.url);

    if (respJson.subscription.subscriptionContract.deliveryMethod) {
      setSubscriptionAddress(respJson.subscription.subscriptionContract.deliveryMethod.address);
    }
    else {
      setSubscriptionAddress(null);
    }
    setPaymentMethod(respJson.subscription.subscriptionContract.customerPaymentMethod);
    setLoading(false);
  }
  function showToast(message, type) {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prevToast => ({ ...prevToast, visible: false }));
    }, 3000);
  }
  async function updateSubscriptionStatus() {
    let newStatus = subscriptionStatus;
    if (subscriptionStatus === 'ACTIVE') {
      newStatus = 'CANCELLED';
      setSubscriptionStatus('CANCELLED')
    }
    else {
      newStatus = 'ACTIVE';
      setSubscriptionStatus('ACTIVE')
    }
    var resp = await fetch(`/apps/fillstation/api/v1/subscription/update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subscriptionContractId: contractId, status: newStatus })
    });
    var respJson = await resp.json();
    assignVariables(respJson);
    fetchSubscription(contractId);
  }
  async function fetchSubscription(id) {
    setLoading(true);
    var resp = await fetch(`/apps/fillstation/api/v1/customer/subscription/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    var respJson = await resp.json();
    assignVariables(respJson);
    props.fetchContracts();
  }
  async function sendAction(actionCode) {
    try {
      const resp = await fetch(`/apps/fillstation/api/v1/subscription/${contractId}/action/${actionCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionContractId: contractId, code: actionCode })
      });

      if (!resp.ok) {
        throw new Error(`Failed to send action ${actionCode} with status ${resp.status}`);
      }

      return resp.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function applyDiscountCode(discountCode) {
    try {
      const response = await fetch(`/apps/fillstation/api/v1/subscription/${contractId}/apply-discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionContractId: contractId, discountCode: discountCode })
      });

      if (!response.ok) {
        throw new Error(`Failed to apply discount code. Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error applying discount code:", error);
        return { success: false, error: error.message };
    }
  }

  function SubscriptionPage() {
    if (loading) return <h1>loading</h1>;
    return (
      <main class="gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-12 p-4 lg:p-8">
        <SubscriptionSelect contracts={props.contracts} navigateToSubscription={navigateToSubscription}></SubscriptionSelect>

        <div class="grid grid-cols-12 items-start lg:block lg:col-span-8 lg:space-y-8 space-y-4">
          <MembershipOverview address={subscriptionAddress} product={subscriptionProduct} price={subscriptionProductAmount} image={variantImage} sendAction={sendAction} showToast={showToast} applyDiscountCode={applyDiscountCode} ></MembershipOverview>
          {toast.visible && <Toast message={toast.message} type={toast.type} />}
          <ExchangeHistory orders={orders}></ExchangeHistory>
        </div>
        <AccountInformation fetchSubscription={fetchSubscription} subscriptionAddress={subscriptionAddress} paymentMethod={paymentMethod} contractId={contractId}></AccountInformation>
        {/*<button onClick={()=> updateSubscriptionStatus() }>{subscriptionStatus === 'ACTIVE' ? <>Cancel Subscription</> : <>Re-Activate Subscription</>}</button>*/}
      </main>
    );
  }

  return <SubscriptionPage></SubscriptionPage>;
}

export default Subscription;