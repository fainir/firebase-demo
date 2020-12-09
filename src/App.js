import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCiyoEvT-ufmVKdmOeNSEsFdkDD7RYDPDM",
  authDomain: "metal-center-226418.firebaseapp.com",
  databaseURL: "https://metal-center-226418-default-rtdb.firebaseio.com",
  projectId: "metal-center-226418",
  storageBucket: "metal-center-226418.appspot.com",
  messagingSenderId: "20335481988",
  appId: "1:20335481988:web:29628da47cdfb8c91dded1",
  measurementId: "G-X2W57E6M5R"
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const firestore = firebase.firestore();
  const postsRef = firestore.collection('posts');
  let query = postsRef;
  // query = postsRef.where('title','==','other title');
  const [posts] = useCollectionData(query);
  
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  
  const savePost = () => {
    postsRef.add({
      title: 'bla bla bla',
    }).then(res =>{
      console.log(res);
    })
  }
  return (
    <div>
     <h1>Cloud Demo version 2.0</h1>
     {user ? 
      <h1>Hello {user.email}</h1> 
      :
      <button onClick={signInWithGoogle}>Login</button>
    }
    <button onClick={savePost}>Add Post</button>
    {posts && posts.map(post => {
      return (
        <h1>{post.title}</h1>
      )
    })}
    </div>
  );
}

export default App;
