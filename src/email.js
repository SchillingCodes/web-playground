// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import firebase from "firebase/app";
import "firebase/auth";

function signUpWithEmailPassword() {
    var email = "test2@example.com";
    var password = "Test123!";
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
        alert("user created");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
    // [END auth_signup_password]
  }

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("you signed out.");
      }).catch((error) => {
        // An error happened.
        console.log("error");
      });
}

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        alert("signed in!");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function getUser() {
    var user = firebase.auth().currentUser;

    if (user) {
    // User is signed in.
        return user.uid;
    } else {
    // No user is signed in.
        return null;
    }
}

export {signUpWithEmailPassword};
export {signOut};
export {signIn};
export {getUser};