import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { CallumAPI } from './Api/api'
import SearchPageComponent from './containers/search-page';
import { BrowserRouter, useHistory, Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DetailPage from './containers/detail-page';
import CreatePageComponent from './containers/create-page';
import GuardedRoute from './guarded-route';
import SignupPageComponents from './containers/signup';
import LoginPageComponent from './containers/login';
import LikePageComponent from './containers/likes';
import UserProfile from './containers/session';

function App() {

  const [isAutheticated, setisAutheticated] = useState(false);
  const history = useHistory();
  let likes = '';
  function login(celebrities) {
    setisAutheticated(true);
    UserProfile.setName("Some");
  }


  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  function onLike(celebrity) {
    CallumAPI.getCelebrity(window.sessionStorage.getItem("login")).then(celebrities => {
      var file = dataURLtoFile(`data:${celebrities.imageContentType};base64,${celebrities.image}`, celebrities.imageOriginalName);
      celebrities.file = file;
      celebrities.likes ? celebrities.likes = [...celebrities?.likes, celebrity.id] : celebrities.likes = [celebrity.id];
      const selectedcelebrity = { ...celebrities };
      CallumAPI.editCelebrity(selectedcelebrity, selectedcelebrity.id).then(celeb => {
        alert(`You like ${celebrity.firstName}`)
      });
    });

  }

  function logout() {
    setisAutheticated(false);
    window.sessionStorage.setItem("login", false);
  }

  return (
    <BrowserRouter>
      <Switch>
        <GuardedRoute auth={window.sessionStorage.getItem("login")} exact path='/' component={SearchPageComponent} prop={onLike = { onLike }} />
        <Route exact path='/login' render={(props) => <LoginPageComponent {...props} onLogin={login} />}>
        </Route>
        <Route exact path='/signup' component={SignupPageComponents} />
        <GuardedRoute auth={window.sessionStorage.getItem("login")} exact path="/create/celebrity" component={CreatePageComponent} />
        <GuardedRoute auth={window.sessionStorage.getItem("login")} exact path="/:id" component={DetailPage} />
        <GuardedRoute auth={window.sessionStorage.getItem("login")} exact path="/search/likes" component={LikePageComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
