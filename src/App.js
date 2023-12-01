import { useEffect, useState } from 'react';
import './App.css';
import Subscription from './pages/Subscription.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import mockContracts from './mock-json/subscriptions.json';
import fetchWrapper from './utils/fetchWrapper.js';

//process.env.REACT_APP_PRODUCTION_MODE ? window.location.pathname+'/' : ''
const devMode = process.env.NODE_ENV === 'development';

function App() {
  const [contracts, setContracts] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate()
  const pathPrefix = devMode? "/" : "/apps/fillstation/web/";

  // In dev mode, assign local variables to mockjson. 
  // In production, fetch contracts and assignVariables
  useEffect(() => {
    if (devMode)
    assignVariables(mockContracts)
    else
    fetchContracts();
  }, []);
  function assignVariables(respJson){
    var contractsResponse =
      respJson.customer.subscriptionContracts.edges;
    var filteredResponse = [];
    for (const contract of contractsResponse) {
      filteredResponse.push(contract.node);
    }
    setCustomer(respJson.customer);
    setContracts(filteredResponse);
    setLoading(false);

    if(window.location.pathname === pathPrefix || window.location.pathname + "/" === pathPrefix) {
      const firstContract = filteredResponse[0].id.substring(
        filteredResponse[0].id.lastIndexOf('/') + 1)
      navigator(`${pathPrefix}subscription/${firstContract}`)
    }
  }
  async function fetchContracts() {
    var resp = await fetchWrapper("/apps/fillstation/api/v1/customer/subscriptions", {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    var respJson = await resp.json();
    assignVariables(respJson)
  }


  return (
    <>
      <div class="container">
        <Routes>
          <Route
            path={pathPrefix + "subscription/:id"}
            element={
              <Subscription
                key={window.location.pathname}
                contracts={contracts}
                customer={customer}
                fetchContracts={fetchContracts}
              />
            }
          ></Route>
          <Route path={pathPrefix} element={<>{contracts && contracts.length === 0 ? <h1>No contracts found</h1>: <>Loading Contracts</>}</>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
