import './App.css';
import { Routes, Route} from 'react-router-dom'
import SignInNavigation from "./routes/navbar/signInNav/navigation.component"
import Login from './routes/login/login.component';
import "bootstrap/dist/css/bootstrap.min.css"
import DriveNavigation from './routes/navbar/fileListingNav/driveNav.component';
import { Provider } from 'react-redux';
import Protected from './routes/protected/protected.component';
import store from './store/reducers';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Protected/>}>
          <Route path="/my-drive" element={
            <DriveNavigation/>
          }/>
        </Route>
        <Route path="/" element={<SignInNavigation />}>
          <Route index element={<Login />}/>
        </Route>
      </Routes>
    </Provider> 
  );
}



export default App;
