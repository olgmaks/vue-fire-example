import firebase, {User} from "firebase";
import store from "@/store";

export function doLogin(): Promise<User> {
  return firebase
    .auth()
    .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then(() => firebase.auth().getRedirectResult())
    .then(res => {
      store.dispatch('loginSuccess', res.user)
      return res.user;
    });
}

export function doLogout(): Promise<void> {
  return firebase.auth().signOut();
}
