import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ModalLogin from "./components/Login/Login";
import ModalRegister from "./components/Register/Register";
import Home from "./pages/Home";
import TVSection from "./pages/TVSection";
import MoviesSection from "./pages/MoviesSection";
import Profile from "./pages/Profile";
import Allfilms from "./pages/Allfilms";
import Addfilm from "./pages/Addfilm";
import Alluser from "./pages/Alluser";
import Payment from "./pages/Payment";
import Transaction from "./pages/Transaction";
import Detail from "./pages/Detail";
import AddEpisode from "./pages/AddEpisodes";
import Addlinkmovie from "./pages/Addlinkmovie";

import AdminRoute from "./components/Routing/AdminRoute";
import UserRoute from "./components/Routing/UserRoute"

import { loadUser } from "./actions/auth";
import { setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
	store.dispatch(loadUser());
  }, []);
  
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  

  const showModalLogin = () => {
    setModalLogin(!modalLogin);
    setModalRegister(false);
  };
	const showModalRegister = () => {
    setModalRegister(!modalRegister);
	setModalLogin(false);
  };

  return (
    <Provider store={store}>
			<div className="app">
				<Router>
					<Navbar
						showModalLogin={showModalLogin}
						showModalRegister={showModalRegister}
					/>

					<Route exact path="/" component={Home} />
					<Route exact path="/tv-series" component={TVSection} />
					<Route exact path="/movies" component={MoviesSection} />

					
					<UserRoute exact path="/profile" component={Profile} />
					<UserRoute exact path="/payment" component={Payment}/>
					<UserRoute exact path="/detail/:id" component={Detail} showModalLogin={showModalLogin} modalLogin={modalLogin}/>

					<AdminRoute exact path="/movie-list" component={Allfilms}/>
					<AdminRoute exact path="/add-movie" component={Addfilm}/>
					<AdminRoute exact path="/users" component={Alluser}/>
					<AdminRoute exact path="/transaction" component={Transaction}/>
					<AdminRoute exact path="/add-episodes-tvseries" component={AddEpisode}/>
					<AdminRoute exact path="/add-episodes-movie" component={Addlinkmovie}/>
					{modalLogin && (
						<ModalLogin
							showModalLogin={showModalLogin}
							showModalRegister={showModalRegister}
							modalLogin={modalLogin}
						/>
					)}
					{modalRegister && (
						<ModalRegister
							showModalLogin={showModalLogin}
							showModalRegister={showModalRegister}
							modalRegister={modalRegister}
						/>
					)}
				</Router>
			</div>
		</Provider>
  );
}

export default App;
