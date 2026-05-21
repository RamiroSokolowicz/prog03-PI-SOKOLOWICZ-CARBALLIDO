import './App.css';
import Footer from './components/Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/Home/Home';
import Peliculas from './screens/Peliculas/Peliculas';
import Detalle from './screens/Detalle/DetalleN';
import Series from './screens/Series/Series';
import Favoritas from './screens/Favoritas/FavoritasN';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import Resultados from './screens/Resultados/ResultadosN';
import Logout from './components/Logout/Logout';
import NotFound from './screens/NotFound/NotFound';

function App() {
  return (
   <div className="container app-shell">
     <main className="app-main">
       <Switch>
         <Route path="/" exact={true} component={Home} />
         <Route path="/detalle/:tipo/:id" component={Detalle} />
         <Route path="/peliculas" exact={true} component={Peliculas} />
         <Route path="/series" component={Series} />
         <Route path="/favoritas" component={Favoritas} />
         <Route path="/register" component={Register} />
         <Route path="/login" component={Login} />
         <Route path="/resultados/:busqueda/:tipo" component={Resultados} />
          <Route path="/logout" component={Logout} />
         <Route path="*" component={NotFound} />
       </Switch>
     </main>
     <Footer />
   </div>
  );
}

export default App;
