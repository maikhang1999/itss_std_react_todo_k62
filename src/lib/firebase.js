import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyBd_uhk1uUAITpDzqRJT8LZEkxln5xe-yw",
  authDomain: "itss-pj-143e5.firebaseapp.com",
  projectId: "itss-pj-143e5",
  storageBucket: "itss-pj-143e5.appspot.com",
  messagingSenderId: "616186546199",
  appId: "1:616186546199:web:2fc9b50e45a210ead8b452"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await db.collection("users").doc(uid).set({ name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
}

export const updateUser = async (user, image) => {
  try {
    const userDoc = await firebase.firestore().collection("users").doc(user.id).get();
    if (userDoc.exists) {
      await firebase.firestore().collection("users").doc(user.id).update({ ...userDoc.data(), image: image });
    }
  } catch (err) {
    console.log(err);
  }
}
export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let downloadUrl = "";
  try {
    await ref.put(image);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};