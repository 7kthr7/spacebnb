import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { spotDetailThunk } from "../../store/spots";
import { getReviewsThunk } from "../../store/reviews";
import CreateReviewModal from "../Reviews/CreateReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
//import DeleteReviewModal from "../Reviews/DeleteReview";



import "./style.css"
import DeleteReviewModal from "../Reviews/DeleteReview";

export default function SingleSpot() {
    const params = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpotObj);
    const user = useSelector(state => state.session.user)
    //const reviews = Object.values(useSelector(state => state.reviews.spot));
    const reviews = useSelector((state) => state.reviews.rev)
    //const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(spotDetailThunk(params.spotId))
        dispatch(getReviewsThunk(params.spotId))
    }, [dispatch, params.spotId])

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const convertDate = (date) => {
        const reviewMonth = months[new Date(date).getMonth()];
        const reviewYear = new Date(date).getFullYear();

        return (
            <p className="reviews-date">{reviewMonth} {reviewYear}</p>
        )


    }

    let currentUser = true;

    if (reviews) {
        const reviewsArray = Object.values(reviews)

        if (user) {
            for (let review of reviewsArray) {
                if (review.userId === user.id) currentUser = false
            }
        }

    }

    return (
        <div className="detail-page">


            <div className="spot-header">
                <h1 className="spot-name">{spot?.name}</h1>
                <h4 className="spot-location">
                    <span className="spot-city">{spot?.city}</span>,{" "}
                    <span className="spot-state">{spot?.state}</span>,{" "}
                    <span className="spot-country">{spot?.country}</span>
                </h4>
            </div>


            <div className="spot-images">
                <div className="preview-image">
                    {spot?.SpotImages && spot?.SpotImages[0] && <img src={spot?.SpotImages[0].url} alt="Preview Image" />}
                </div>
                <div className="smaller-images-1">
                    {spot.SpotImages && spot.SpotImages[1] && (
                        <img src={spot.SpotImages[1].url} alt="Smaller Image" />
                    )}
                    {spot.SpotImages && spot.SpotImages[2] && (
                        <img src={spot.SpotImages[2].url} alt="Smaller Image" />
                    )}
                </div>
                <div className="smaller-images-1">
                    {spot.SpotImages && spot.SpotImages[3] && (
                        <img src={spot.SpotImages[3].url} alt="Smaller Image" />
                    )}
                    {spot.SpotImages && spot.SpotImages[4] && (
                        <img src={spot.SpotImages[4].url} alt="Smaller Image" />
                    )}
                </div>
            </div>



            <div className="spot-host">
                <h1>
                    Hosted by {spot?.Owner && `${spot.Owner.firstName} ${spot.Owner.lastName}`}
                </h1>
            </div>
            <div className="spot-body">
                <div className="description">
                    <p>{spot?.description}</p>
                </div>


                <div className="callout-box">

                    <div className="callout-content">

                        <div className="callout-price">
                            <p className="card-price">${spot.price}<span className="night-text"> night</span></p>
                        </div>


                        <div className="callout-reviews">
                            <h3>
                                <i className="fa fa-star gold"></i>{" "}
                                {spot?.avgStarRating ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} ` : "New"}

                                {spot?.numReviews === 1 ? "review" : ""}
                                {spot?.numReviews > 1 ? "reviews" : ""}
                            </h3>
                        </div>

                    </div>




                    <div className="callout-reserve">
                        <button onClick={() => alert("Feature Coming Soon")}>Reserve</button>
                    </div>



                </div>

            </div>
       <div className="review-summary">
            <h3>
                                <i className="fa fa-star gold"></i>{" "}
                                {spot?.avgStarRating ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} ` : "New"}

                                {spot?.numReviews === 1 ? "review" : ""}
                                {spot?.numReviews > 1 ? "reviews" : ""}
                            </h3>

                            </div>
    

            {
                user && user.id !== spot.ownerId && currentUser && (
                    <div className="post-review">
                        
                        <button className="post-review-btn">
                            <OpenModalMenuItem
                                itemText="Post Your Review"
                                modalComponent={<CreateReviewModal spot={spot} />}
                            />
                        </button>
                    </div>
                )
            }
            <div className="spot-reviews">
                {reviews && (
                    <div>
                        {spot.numReviews === 0 ? (
                            <div>
                                <p>Be the first to post a review!</p>
                               
                            </div>
                        ) : (
                            <div>
                                {Object.values(reviews).map((review) => (
                                    review.User && (
                                        <div key={review.id}>
                                            <div>
                                                <div>

                                                    <p className="reviews-user">{review.User.firstName}</p>
                                                    <p className="reviews-date">{convertDate(review.createdAt)}</p>

                                                    <p className="review-content">{review.review}</p>
                                                </div>
                                                {user && user.id === review.userId && (

                                                    <div>
                                                        <button className="delete-review-button">
                                                <OpenModalMenuItem
                                                    itemText="Delete"
                                                    modalComponent={<DeleteReviewModal review={review} />}
                                                />
                                                </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )

                                ))}

                            </div>
                        )}
                    </div>
                )}
            </div>


            {/* <div className="rating-numReview">
                <h3>
                    <i className="fa fa-star gold"></i>{" "}
                    {spot?.avgStarRating ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} ` : "New"}
                    {spot?.numReviews === 1 ? "review" : ""}
                    {spot?.numReviews > 1 ? "reviews" : ""}
                </h3>
            </div> 



            {reviews?.length === 0 ? <p>Be the first to post a review</p> : reviews.reverse().map(review => (
                    <div className="review-section" key={review.id}>
                        <p className="user-review">{review.User.firstName} {review.User.lastName}</p>
                        <p className="review-date">{convertDate(review.createdAt)}</p>
                        <p className="spot-review">{review.review}</p>
                    </div>
                ))} 

 */}




        </div>



    )
}


/* {reviews?.length === 0 ? <p>Be the first to post a review</p> : reviews?.reverse().map(review => (
  <div className="review-section" key={review.id}>
      <h4 className="user-review">{review.User?.firstName} {review.User?.lastName}</h4>
      <h5 className="review-date">{convertDate(review.createdAt)}</h5>
      <p className="spot-review">{review.review}</p>
  </div>
))} */

