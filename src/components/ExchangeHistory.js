import { formatShopifyId } from "../utils/formatters.js";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

// Component for viewing most recent subscription orders
function ExchangeHistory({ orders }) {
  function RenderOrders() {
    if (orders == null) {
      return <></>;
    }
    return (
      <>
        {orders.map((order) => (
          <tr class='bg-gray-50'>
            <td class='p-4 text-sm font-normal text-gray-900 whitespace-nowrap rounded-l-lg'>
              {order.lineItems.edges[0].node.name}
            </td>
            <td class='p-4 text-sm font-normal text-gray-500 whitespace-nowrap'>
              {order.name}
            </td>
            <td class='p-4 text-sm font-semibold text-gray-900 whitespace-nowrap'>
              {formatter.format(order.originalTotalPriceSet.shopMoney.amount)}
            </td>
            <td class='p-4 whitespace-nowrap'>
              <span class='text-xs font-medium mr-2 px-2.5 py-0.5 text-blue-500 underline' >
                <a href={`https://api.sodasense.com/orders/label/tracking/marketplace/${formatShopifyId(order.id)}/${formatShopifyId(order.lineItems.edges[0].node.id)}/pdf`}>Download</a>
              </span>
            </td>
            <td class='p-4 whitespace-nowrap rounded-r-lg'>
              <span class='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md'>
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </td>
          </tr>
        ))}
      </>
    );
  }

  function OrdersTable() {
    return (
      <table class='min-w-full divide-y divide-gray-200'>
        <thead class='bg-gray-50'>
          <tr>
            <th
              scope='col'
              class='p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Product
            </th>
            <th
              scope='col'
              class='p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Order Number
            </th>
            <th
              scope='col'
              class='p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Price
            </th>
            <th
              scope='col'
              class='p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Download Return Label
            </th>
            <th
              scope='col'
              class='p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Created Date
            </th>
          </tr>
        </thead>
        <tbody class='bg-white'>{RenderOrders()}</tbody>
      </table>
    );
  }

  return (
    <div class='bg-white col-span-full lg:col-span-8 order-2 p-4 rounded-lg shadow'>
      <div class='mb-4'>
        <h3 class='text-xl font-bold text-gray-900'>Exchange History</h3>
      </div>

      <div class='flex flex-col'>
        <div class='overflow-x-auto rounded-lg'>
          <div class='inline-block min-w-full align-middle'>
            <div class='overflow-hidden shadow sm:rounded-lg'>
              {OrdersTable()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExchangeHistory;