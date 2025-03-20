
//improtacion de 
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
//import UserComponent from './UserComponent';
import ShowProducts from './components/ShowProducts'

function App() {
  return (
    
       
        <BrowserRouter>

<Routes>
<Route path='/' element={< ShowProducts></ShowProducts>}></Route>
</Routes>



        </BrowserRouter>
        





    
  );
}

export default App;
