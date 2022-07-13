import './App.css';
import { Route } from "react-router-dom";
import { NavBar } from './component/NavBar';
import { Home } from './component/Home';
import { Footer } from './component/Footer';
import { Breeds } from './component/Breeds';
import { Detail } from './component/Detail';
import { Tempers } from './component/Tempers';
import { CreateBreed } from './component/CreateBreed';

function App() {
  return (
    <div className="App">
      {/* <Route path={'/'} render={(props) => <NavBar info={props} />}/> */}
      {/* <Route path={'/'} children={(props) => <NavBar info={props} />}/> */}
      {/* <Route path={'/'} component={Footer} /> */}
      <Route path={'/'} component={NavBar} />
      <Route path={'/'} component={Footer} />
      <Route exact path={'/'} render={(props) => <Home info={props}/>} />
      <Route exact path={'/razas'} render={(props) => <Breeds info={props}/>} />
      <Route exact path={'/detalle/:id'} component={Detail} />
      <Route exact path={'/temperamentos'} component={Tempers}/>
      <Route exact path={'/crearRaza'} component={CreateBreed}/>

    </div>
  );
}

export default App;
