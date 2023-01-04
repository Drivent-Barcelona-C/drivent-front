import Button from '../../components/Form/Button';
import { AiFillGithub } from 'react-icons/ai';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import useOAuth from '../../hooks/api/useOAuth';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

export default function OauthGit() {
  const { OAuth, OAuthLoading } = useOAuth();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  async function Auth() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyAMx2amfsSTYTRiNhh13wRYRQWYIiovHK0',
      authDomain: 'drivent-barcelona-c.firebaseapp.com',
      projectId: 'drivent-barcelona-c',
      storageBucket: 'drivent-barcelona-c.appspot.com',
      messagingSenderId: '235652767835',
      appId: '1:235652767835:web:8a62be65747a92d92f5f7e',
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);
    const provider = new GithubAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const dataUser = user.providerData[0];
        OAuth(token, dataUser).then((result) => {
          setUserData(result);
          toast('Login realizado com sucesso!');
          navigate('/dashboard');
        });
      })
      .catch((error) => {
        //se alguma hora falhar descomentar esse codigo pra ver qual erro ocorreu
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GithubAuthProvider.credentialFromError(error);
        toast('Falha ao logar');
      });
  }
  return (
    <>
      <Button onClick={Auth} disabled={OAuthLoading}>
        Login with Git
        <AiFillGithub />
      </Button>
    </>
  );
}
