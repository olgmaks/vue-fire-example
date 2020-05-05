import firebase, {User} from "firebase";
import store from "@/store";
import router from "@/router";

export function doLogin(): Promise<User> {
  return firebase
    .auth()
    .signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
        .setCustomParameters({ prompt: 'select_account' }))
    .then(() => firebase.auth().getRedirectResult())
    .then(res => {
      store.dispatch('loginSuccess', res.user)
      return res.user;
    });
}

export function doLogout(): Promise<void> {
  store.dispatch('loginSuccess', null);
  return firebase.auth().signOut().then(() => {
    router.push('/login');
  });
}
