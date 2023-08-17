import './App.css';
import { Routes, Route} from 'react-router-dom'
import SignInNavigation from "./routes/navbar/signInNav/navigation.component"
import Login from './routes/login/login.component';
import "bootstrap/dist/css/bootstrap.min.css"
import DriveNavigation from './routes/navbar/fileListingNav/driveNav.component';

import Protected from './routes/protected/protected.component';
import FileEditorWrapper from './routes/editor/fileEditorWrapper.component';


const App = () => {
  return (
      <Routes>
        
        <Route path="/" element={<SignInNavigation />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/edit/*" element={<FileEditorWrapper />}/>
        <Route path="/my-drive/*" element={<DriveNavigation />} />
      </Routes>
  );
}



export default App;
