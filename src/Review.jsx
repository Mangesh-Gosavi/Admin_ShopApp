import React, { useState, useEffect } from 'react';
import Popup from './Popup'; 
import "../src/CSS/Popup.css"
import '../src/CSS/Review.css'; 
import Loader from '../src/Loader';
import Eye from '/eye.png';
import Crosseye from '/crossed-eye.png';
import trash from '../public/trash.png';


function Review({ productId }) {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]); 
  const [commentVisible, setCommentVisible] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try{
        const token = localStorage.getItem('token');
        console.log("Token retrieved:", token);
        const response = await fetch('http://localhost:3001/adminreviews' , {
          method: 'GET',
          headers: {
             'Accept': 'application/json',
             "Authorization": `Bearer ${token}` },
        });
  
        const Data = await response.json(); // Update reviews state with new review
        setReviews(Data);
      }catch (error) {
        console.error(error);
      }
    };

    const init = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log("Token retrieved:", token);
            const response = await fetch("http://localhost:3001/profile", {
                method: "GET",
                headers: 
                {                        
                  "Accept": "application/json",
                  "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            setUser(data.email);
            const serializedData = btoa(JSON.stringify(data.email));
            setdata(serializedData);
        } catch (error) {
            console.error(error);
        }
    }
    init();
    fetchReviews();

    setTimeout(() => {
      setLoading(false); 
    }, 2000); 

  }, []);

  useEffect(() => {
    console.log("commentVisible",commentVisible);
  
  }, [commentVisible]);

  const deletecomment = async (reviewid) => {
    const data = {"reviewid":reviewid}
            try {
              const token = localStorage.getItem('token');
              console.log("Token retrieved:", token);
                const response = await fetch("http://localhost:3001/deletereview", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });
                
              if (!response.ok) {
                const error = await response.json()
                console.error(error);
                setShowPopup(true);
                setPopupMessage(error.message)
                return;
              }
              setShowPopup(true);
              setPopupMessage("Review deleted from Database")
              setTimeout(() => {
                location.reload()
              }, 2100);
              
            } catch (error) {
                console.error("Error:", error);
            }
          }


  return (
    <>
     {loading ? (
        <Loader/>
      ) : (<div className="review-page">
      <h2>User Reviews For Product</h2>
      <div className="reviews-container">
        <ul>
          {reviews === null ? <h2> No Comments Posted</h2>
          :reviews.map((review) => ( 
            review.label === 1 ? <li style={{border:"0.5px solid rgb(192, 186, 186)",borderRadius:"5px"}}>
               <span className="reviewid">{review.id}</span>
              <span className="email">{review.email}</span>
              <span className="id">ProductID: {review.productid}</span>
              <p className="review">{commentVisible.includes(review.id)?review.review:"This commment is inappropriate"}</p>
              {
                !commentVisible.includes(review.id)?
                <img  style={{width:"25px",height:"25px"}} onClick={()=>setCommentVisible(prev=>[...prev,review.id])} src={Eye} alt='loading'/>
                :<img style={{width:"25px",height:"25px"}} onClick={()=>setCommentVisible(commentVisible.filter(review =>review == review.id))} src={Crosseye} alt='loading'/>
              }
              <img style={{width:"25px",height:"25px"}} onClick={()=>{deletecomment(review.id)}} src={trash} alt='loading'/>

            </li> : 
            <li style={{border:"0.5px solid rgb(192, 186, 186)",borderRadius:"5px"}}>
               <span className="reviewid">{review.id}</span>
              <span className="email">{review.email}</span>
              <span className="id">Productid: {review.productid}</span>
              <p className="review">{review.review}</p>
              <img style={{width:"25px",height:"25px",visibility:"hidden"}}  src={Crosseye} alt='loading'/>
              <img style={{width:"25px",height:"25px"}} onClick={()=>{deletecomment(review.id)}} src={trash} alt='loading'/>

            </li>
          ))}
        </ul>
        <div>{showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}</div>
      </div>
    </div>)}
    </>
  );
}

export default Review;
