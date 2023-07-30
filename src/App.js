import './App.css';
import { Routes, Route} from 'react-router-dom'
import SignInNavigation from "./routes/navbar/signInNav/navigation.component"
import Login from './routes/login/login.component';
import "bootstrap/dist/css/bootstrap.min.css"
import DriveNavigation from './routes/navbar/fileListingNav/driveNav.component';

import Protected from './routes/protected/protected.component';
import DriveListings from './routes/drive-listings/drive-listings.component';


const App = () => {
  return (
      <Routes>
        <Route path="/my-drive/*" element={<DriveNavigation />} />
        <Route path="/" element={<SignInNavigation />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
  );
}



export default App;
