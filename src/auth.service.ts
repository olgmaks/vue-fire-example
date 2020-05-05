import firebase, {User} from "firebase";
import store from "@/store";
import router from "@/router";

export function doLogin(): Promise<User> {
  const google = new firebase
    .auth.GoogleAuthProvider()
    .setCustomParameters({prompt: 'select_account'});
  return firebase
    .auth()
    .signInWithRedirect(google)
    .then(() => firebase.auth().getRedirectResult())
    .then(res => {
      store.dispatch('loginSuccess', res.user)
      return res.user;
    });
}

export function doLogout(): Promise<void> {
  store.dispatch('loginSuccess', null);
  return firebase.auth().signOut().then(() => {
    router.push({path: 'welcome'})
  });
}

export function setCurrentAuthUser(user: User): User {
  store.dispatch('loginSuccess', user);
  return user;
}

export function getCurrentAuthUser(): Promise<User> {
  if (store.getters.currentUser) {
    return  Promise.resolve(store.getters.currentUser);
  }
  else {
    return new Promise<User>((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    }).then(user => setCurrentAuthUser(user));
  }
}
