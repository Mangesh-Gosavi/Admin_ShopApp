import  { useState, useEffect } from 'react';
import Popup from './Popup';
import '../src/CSS/Popup.css';
import '../src/CSS/Review.css';
import Loader from '../src/Loader';
import Eye from '/eye.png';
import Crosseye from '/crossed-eye.png';
import trash from '../public/trash.png';
import API_BASE_URL from './config';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [commentVisible, setCommentVisible] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/adminreviews`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });
        const Data = await response.json();
        setReviews(Data);
      } catch (error) {
        console.error(error);
      }
    };

    const init = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    init();
    fetchReviews();

    setTimeout(() => setLoading(false), 2000);
  }, []);

  const deletecomment = async (reviewid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/deletereview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ reviewid })
      });

      if (!response.ok) {
        const error = await response.json();
        setShowPopup(true);
        setPopupMessage(error.message);
        return;
      }

      setShowPopup(true);
      setPopupMessage("Review deleted from Database");
      setTimeout(() => location.reload(), 2100);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="review-page">
          <h3 className="review-heading">All Reviews</h3>
          <div className="review-cards">
            {reviews.length === 0 ? (
              <h2>No Comments Posted</h2>
            ) : (
              reviews.map((review) => (
                <div className="review-card" key={review._id}>
                  <div className="review-card-content">
                    <h4><strong>ID:</strong> {review._id}</h4>
                    <p><strong>Email:</strong> {review.useremail}</p>
                    <p><strong>ProductID:</strong> {review.productid}</p>
                    <p><strong>Review:</strong> {
                      review.label === 1
                        ? commentVisible.includes(review._id)
                          ? review.text
                          : "This comment is inappropriate"
                        : review.text
                    }</p>
                  </div>
                  <div className="icon-group">
                    {review.label === 1 && (
                      <img
                        className="icon"
                        src={commentVisible.includes(review._id) ? Crosseye : Eye}
                        onClick={() =>
                          setCommentVisible((prev) =>
                            commentVisible.includes(review._id)
                              ? prev.filter((id) => id !== review._id)
                              : [...prev, review._id]
                          )
                        }
                        alt="toggle"
                      />
                    )}
                    <img
                      className="icon"
                      src={trash}
                      onClick={() => deletecomment(review._id)}
                      alt="delete"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div>
      )}
    </>
  );
}

export default Review;
