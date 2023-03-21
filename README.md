### Sodasense shopify customer portal

### Documentation:

[Notion Docs](https://www.notion.so/sodasense/Shopify-Fill-Station-App-3e3ab6fc53de4e8995c135d211d3000a)


To run dev:

Switch mode to dev ( This will utilize mockjson payloads, and modify the app path prefix )  
You wont have to do anything to run in dev mode initially  
There are 2 boolean variables, one in each file, Subscription.js and App.js.  

Each have devMode = true

This will tell the app to use mockjson files, instead of API requests.   
Dev mode will also swap the pathPrefix to use root paths instead of the required app_proxy prefix paths.   






yarn 

yarn start





To build for production:

yarn build

yarn package


Once built and packages, upload your zip file on the settings page of the admin portal

