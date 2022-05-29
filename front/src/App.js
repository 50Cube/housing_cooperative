import './css/App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import { useStyles } from './css/Styles';
import Register from './components/Register';
import ListUsers from './components/ListUsers';
import ListBuildings from './components/ListBuildings';
import UserDetails from './components/UserDetails';
import CreateBill from './components/CreateBill';
import ListBills from './components/ListBills';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './services/Keycloak';

function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <Router>
        <ReactKeycloakProvider authClient={keycloak}>
          <ReactNotification />
          <NavigationBar />
          <div className={classes.root}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/users" component={ListUsers} />
              <Route path="/buildings" component={ListBuildings} />
              <Route path="/user" component={UserDetails} />
              <Route path="/bill" component={CreateBill} />
              <Route path="/bills" component={ListBills} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </ReactKeycloakProvider>
      </Router>
    </Fragment>
  );
}

export default App;
