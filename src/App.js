
import "./App.css";
import Cart from "./components/Buyer/Cart/Cart";
import HomePage from "./pages/Buyer/Homepage/HomePage";
import LandingPage from "./pages/Seller/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import { superTokensConfig } from "./config";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
function App() {
  
SuperTokens.init(superTokensConfig);
  return (
    <div className="App">
       <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
           {/*This renders the login UI on the /a route*/}
           {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyEmailPasswordPreBuiltUI])}
                        {/*Your app routes*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/sell" element={<LandingPage />} />
          <Route path="/cart" element={<Cart />} />
          {/* <SessionAuth> (want to protect, keep here)</SessionAuth> */}
        </Routes>
      </BrowserRouter>
      </SuperTokensWrapper>
    </div>
  );
}

export default App;
