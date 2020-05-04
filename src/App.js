import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import Header from './components/header/header.component';

import { createUserProfileDocument, auth } from './firebase/firebase.utils';

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";


class App extends React.Component {

  // google firebase authentication --->
  unsubscribeFromAuth = null
  // listening to state changes
  // need to "pass back" the userRef, if we wanna use it somewhere else...
  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
          });
        });
      }
      
      setCurrentUser(userAuth);
    });
  }

  // Calling the unsubscribe function when the component is about to unmount is 
  // the best way to make sure we don't get any memory leaks in our application related to listeners 
  // still being open even if the component that cares about the listener is no longer on the page.

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* whatever you put outside of switch, will stay there ...eg header,footer... */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

// basically sending/dispatching the props to user object
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
