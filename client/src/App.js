import logo from './logo.svg';
import './App.css';
import Form from './components/Form/form';
import { Route, Routes } from "react-router-dom"
import Users from './Pages/Users';
import Thankyou from '../src/Pages/Thankyou'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/users' element={<Users />} />
        <Route path='/thankyou' element={<Thankyou />} />
      </Routes>
    </div>
  );
}

export default App;
