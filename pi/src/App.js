import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/Home/Home';
import Peliculas from './screens/Peliculas/Peliculas';
import Detalle from './screens/Detalle/Detalle';
import Series from './screens/Series/Series';
import Favoritas from './screens/Favoritas/Favoritas';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import Resultados from './screens/Resultados/Resultados';
import NotFound from './screens/NotFound/NotFound';

function App() {
  return (
   <div className="container app-shell">
     <Header />
     <main className="app-main">
       <Switch>
         <Route path="/" exact={true} component={Home} />
         <Route path="/peliculas/:id" component={Detalle} />
         <Route path="/peliculas" exact={true} component={Peliculas} />
         <Route path="/series" component={Series} />
         <Route path="/favoritas" component={Favoritas} />
         <Route path="/register" component={Register} />
         <Route path="/login" component={Login} />
         <Route path="/resultados/:busqueda" component={Resultados} />
         <Route path="*" component={NotFound} />
       </Switch>
     </main>
     <Footer />
   </div>
  );
}

export default App;
