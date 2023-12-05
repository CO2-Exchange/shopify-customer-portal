function SubscriptionSelect ({ selectedContract, contracts, navigateToSubscription, customerTags }) {
    return (
        <nav class="col-span-full flex gap-8" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 tablet-sm:space-x-3">
                <select value={selectedContract} class="border border-gray-300 text-gray-900 text-sm rounded-l-lg rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="provinceCode" onChange={navigateToSubscription}>
                    {contracts.map(contract => {
                        return (
                            <option key={contract.id} value={contract.id.substring(contract.id.lastIndexOf('/') + 1)}>
                                {contract.deliveryMethod?.address?.address1} {contract.lines.edges[0].node.title}
                            </option>
                        );
                    })}
                </select>
            </ol>
            {
                customerTags && customerTags.includes('Active Subscriber') ? <a href="https://sodasense.com/tools/recurring/login" class="btn btn-ghost btn-lg">
                 Switch membership
                </a> : <></>
            }
            
        </nav>
    )


}

export default SubscriptionSelect;