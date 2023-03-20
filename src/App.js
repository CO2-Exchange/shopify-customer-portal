import { useEffect, useState } from "react";
import "./App.css";
import Subscription from "./components/Subscription.js";
import { Routes, Route, useNavigate } from "react-router-dom";

//process.env.REACT_APP_PRODUCTION_MODE ? window.location.pathname+'/' : ''

function App() {
  const [contracts, setContracts] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate()
  const pathPrefix = "/apps/fillstation/web/";
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchContracts();
  }, []);
  async function fetchContracts() {
    var resp = await fetch("/apps/fillstation/api/v1/customer/subscriptions", {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    var respJson = await resp.json();
    var contractsResponse =
      respJson.body.data.customer.subscriptionContracts.edges;
    var filteredResponse = [];
    for (const contract of contractsResponse) {
      filteredResponse.push(contract.node);
    }
    setCustomer(respJson.body.data.customer);
    setContracts(filteredResponse);
    setLoading(false);

    if(window.location.pathname === '/apps/fillstation/web/'){
      const firstContract = filteredResponse[0].id.substring(
        filteredResponse[0].id.lastIndexOf('/') + 1)
      navigator(`${pathPrefix}subscription/${firstContract}`)
    }
  }

  
  return (
    <>
      <div class="sm:container mx-auto">
        <Routes>
          <Route
            path={pathPrefix + "subscription/:id"}
            element={
              <Subscription
                contracts={contracts}
                customer={customer}
                fetchContracts={fetchContracts}
                pathPrefix={pathPrefix}
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
