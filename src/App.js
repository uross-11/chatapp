import './App.css';

// Firebase SDK
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
