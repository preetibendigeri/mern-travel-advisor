
import Map, {Marker,Popup} from 'react-map-gl';
import {Place,StarRate} from '@mui/icons-material';
import "./app.css";
import axios from "axios";
import React,{ useEffect,useState } from 'react';
import {format} from "timeago.js";
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  const myStorage=window.localStorage;
  const [currentUser,setcurrentUser]=useState(myStorage.getItem("user"));
  const[pins,setPins]=useState([]);
  const[currentPlaceId,setcurrentPlaceId]=useState(null);
  const[newPlace,setnewPlace]=useState(null);
  const[title,setTitle]=useState(null);
  const[desc,setDesc]=useState(null);
  const[rating,setRating]=useState(0);
  const[showSignup,setShowSignup]=useState(false);
  const[showLogin,setShowLogin]=useState(false);
  useEffect(()=>{
    const getPins=async()=>{
      try{
        const res=await axios.get("http://127.0.0.1:5000/api/pins/getpins");
        setPins(res.data)
         
      }catch(err)
      {
        console.log(err)
      }
    }
    getPins()
  },[]);

  const handleMarker=(id,lat,long)=>{
    setcurrentPlaceId(id);
   const initialViewState=({
      longitude: long,
      latitude: lat,
    
    })

    console.log(id)
  }

  const handleAddpin=(e)=>{
   const long=e.lngLat.lng;
   const lat=e.lngLat.lat;
    setnewPlace({
      lat,
      long
    })
  }


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPin={
      username:currentUser,
      title,
      description:desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try {
      const res=await axios.post("http://127.0.0.1:5000/api/pins/createpin",newPin)
      setPins([...pins,res.data])
      console.log(res.data)
      setnewPlace(null);
    } catch (error) {
      console.log(error)
    }

  }

  const handleLogout=()=>{
    myStorage.removeItem("user");
    setcurrentUser(null);
  }

  return (
    <div className="App">
   <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 17,
        latitude: 46,
        zoom: 4
      }}

     

      style={{width: "100vw", height: "100vh",zIndex:"0"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddpin}
    >
      {pins.map(p=>(

        <>
    
       <Marker
        longitude={p.long} 
       latitude={p.lat}
       anchor="bottom"
        >
          <Place style={{fontSize:'2rem',color:p.username===currentUser ? "tomato" : "slateblue",cursor:"pointer"}}
          onClick={()=>handleMarker(p._id,p.lat,p.long)} />
   
    </Marker>
    {p._id === currentPlaceId && (
    <Popup 
    longitude={p.long} 
    latitude={p.lat}
    anchor="left"
    closeButton={true}
    closeOnClick={false}
    onClose={()=>setcurrentPlaceId(null)}

        >
      <div className="card">
     
        <label>Place</label>
        <h4 className='place'>{p.title}</h4>
        <label>Review</label>
        <p className='desc' style={{fontSize:'16px'}}>{p.description}</p>
        <label>Rating</label>
        <div className='starrate'>
          {Array(p.rating).fill( <StarRate className='star'/>)}
       
       
        </div>
        <br/>
        <span className='username'>Created by {p.username}</span>
        <span className='date'>{format(p.timestamp)} ago</span>
        
    
      </div>
      </Popup> 
  )}
      </>
      ))}
      {newPlace && (
      <Popup 
    longitude={newPlace.long} 
    latitude={newPlace.lat}
    anchor="left"
    closeButton={true}
    closeOnClick={false}
    onClose={()=>setnewPlace(null)}

        >
         <div>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input placeholder='Enter a title' onChange={(e)=>setTitle(e.target.value)}/>
            <label>Review</label>
            <textarea placeholder='Say something about this Place' onChange={(e)=>setDesc(e.target.value)}/>
            <label>Rating</label>
            <select onChange={(e)=>setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>

            </select>
            <button className='submitButton' type='submit'>Add Pin</button>
          </form>
         </div>
          </Popup>
     ) }
      {currentUser ?(<button className='logout' type='button' onClick={handleLogout} style={{position:"absolute",top:"10px",right:"10px"}}>Logout</button>) :(
    <div className="buttons" style={{position:"absolute",top:"10px",right:"10px"}}>
      
     <button className='login' type='button' onClick={()=>setShowLogin(true)}>Login</button>
     <button className='signup' type='button' onClick={()=>setShowSignup(true)}>Signup</button>
     
     </div>)}

     {showSignup &&  <Signup setshowSignup={setShowSignup}/>}
     {showLogin && <Login setshowLogin={setShowLogin} mystorage={myStorage} setcurrentuser={setcurrentUser}/>}
     </Map>
      
    </div>
  );
}

export default App;
