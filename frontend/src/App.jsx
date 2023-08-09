import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/hompage';
import BrandHomePage from './pages/brands/homepage';
import CreatorHomePage from './pages/creators/homepage';
import PricingPage from './pages/brands/pricing';
import CampaignManagerPage from './pages/brands/campaignManager';
import CreateCampaignPage from './pages/brands/createCampaign';
import SignUpPage from './pages/brands/signUp';
import SignUpPage2 from './pages/creators/signUp';
import LogInPage from './pages/brands/logIn';
import LogInPage2 from './pages/creators/logIn';
import ResetPasswordPage from './pages/brands/resetPassword';
import AuthWrapper from './AuthWrapper';
import ResetPasswordPage2 from './pages/creators/resetPassword';
import ParticipatePage from './pages/creators/participate';
import RedeemPage from './pages/creators/redeem';
import UpdatePasswordBrand from './pages/brands/updatePasswordBrand';
import UpdatePasswordCreator from './pages/creators/updatePasswordCreator';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/brand/login' element={<LogInPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/brand" element={<BrandHomePage />} />
          <Route path="/creator" element={<CreatorHomePage />} />
          <Route path='/brand/pricing' element={<PricingPage />} />
          <Route path='/brand/campaign-manager' element={<CampaignManagerPage /> } />
          <Route path='/brand/create-campaign' element={<CreateCampaignPage />} />
          <Route path='/brand/signup' element={<SignUpPage />} />
          <Route path='/brand/reset-password' element={<ResetPasswordPage />} />
          <Route path='/creator/login' element={<LogInPage2 />} />
          <Route path='/creator/reset-password' element={<ResetPasswordPage2 />} />
          <Route path='/creator/signup' element={<SignUpPage2 />} />
          <Route path='/creator/participate' element ={<ParticipatePage />} />
          <Route path='/creator/redeem' element ={<RedeemPage />} />
          <Route path='/brand/update-password/' element ={<UpdatePasswordBrand />} />
          <Route path='/creator/update-password/' element ={<UpdatePasswordCreator />} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
