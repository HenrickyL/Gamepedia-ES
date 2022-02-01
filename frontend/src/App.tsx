import './App.css'
import {Aplication} from './styleGlobal'
import { BrowserRouter , Routes, Route,Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signin from './pages/Signin';
import { Menu } from './component/Menu';
import {MainGame} from './pages/Game/MainGame'
import { GamePage } from './pages/Game';
import { ReviewPage } from './pages/Review';
import { MainReview } from './pages/Review/MainReview';
import { uploadImage } from './services/ApiService';
import CreateGame from './pages/CreateGame';
import CreateReview from './pages/CreateReview';
import { useDispatch } from 'react-redux';
import { auth as authActions } from './store/actions';
import { checkAuthentication } from './services/ApiService/Requests';
import { getToken, setUser } from './services/AuthService';

const Home = ()=>{
  const [redirectLogin, setRedirectlogin] = useState(false)
  const [redirectSignin, setRedirectsignin] = useState(false)
  const [redirectCreateGame, setRedirectCreateGame] = useState(false)

  return <Aplication>
    <Menu  />

    <Outlet/>

    {redirectLogin && <Navigate to={'/login'}/>}
    {redirectSignin && <Navigate to={'/signin'}/>}
    {redirectCreateGame && <Navigate to={'/createGame'}/>}


  </Aplication>
}

const Test = ()=>{
  const [file,setFile] = useState<any>(null)

  const handleSubmit = (e:any)=>{
    e.preventDefault()
    uploadImage(file)
      .then(res=>{
        console.log(res)
      }).catch(console.error)
    
  }
  return(
      <div>
          <form action="" onSubmit={handleSubmit}  style={{display:'flex',flexDirection:'column'}}>

              <input type="file" onChange={(e)=>{
                if(e.target.files){
                  const myFile = e.target.files[0]
                  setFile(myFile)

                }
              }} accept="image/png, image/jpeg"  name="img" id="img" />
              <button type="submit">Enviar</button>
          </form>
      </div>
  )
}





function App(): any{  
  const dispatch = useDispatch()
  useEffect(()=>{
      checkAuthentication()
        .then(res=>{
          console.log('>>>>>>>>>>>',res)
          if(res.status===200){
            dispatch(authActions.setAuthentication())
            setUser(res.data.user)
          }
        }).catch(console.error)
  },[])

  return (
    <BrowserRouter>
      <Routes>
          

          {/* <Route path='/' element={<AuthRouter action={()=>true}/>} > */}
          {/* </Route> */}

            <Route path='' element={<Home />}>

              <Route path='games' element={<Outlet/>}>
                <Route path='' element={<GamePage/>} />
                <Route path=':id' element={<MainGame />} />
              <Route path='create' element={<CreateGame />} />

              </Route>
              
              <Route path='reviews' element={<Outlet/>}>
                <Route path='' element={<ReviewPage/>} />
                <Route path=':id' element={<MainReview/>} />
                <Route path='create' element={<CreateReview />} />
              </Route>
              
              <Route path='ranks' element={<h1>Ranks</h1>} />
              <Route path='login' element={<Login />} />
              <Route path='signin' element={<Signin />} />

              <Route path='teste' element={<Test/>}/>

            </Route>

            
            <Route path='*' element={<h1>NotFound</h1>} />




          
      </Routes>   
    </BrowserRouter>
    
  );
}

export default App;
