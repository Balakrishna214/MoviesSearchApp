import React from 'react';
import { BrowserRouter as Routes,Route,Switch } from 'react-router-dom';
import Home from './components/Home/Home'
 import MovieDetail from './components/MovieDetail/MovieDetail';
import './App.scss'
import Header from './components/Header/Header';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';

const App = (props) => {
  return (
    <div className='app'>
       <Routes>
          <Header></Header>
          <div className='container'>
          <Switch> 
          <Route exact path="/" component={Home}/>
          <Route exact path="/movie/:imdbID" component={MovieDetail}/>
          <Route  component={PageNotFound}/>
          </Switch>
          </div>
           <Footer/>
       </Routes>
    </div>
  );
};

export default App;