import { useState, useRef } from 'react';
import './App.css';

// Firebase SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Firebase Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyB1Q_zUfp3EFZbJnf7x-srEi7wBB4Et288",
  authDomain: "superchat-fe583.firebaseapp.com",
  projectId: "superchat-fe583",
  storageBucket: "superchat-fe583.appspot.com",
  messagingSenderId: "181567628749",
  appId: "1:181567628749:web:34278ff52c6b8ba75e1084"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')

    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}>

        </div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={e => setFormValue(e.target.value)} />
        <button type='submit' disabled={!formValue}>submit</button>
      </form>
    </>
  )
}

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent': 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="usrimg" />
      <p>{text}</p>
    </div>
  )
}

export default App;