import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from 'utils/urls';
import thoughts from 'reducers/thoughts';

export const Hearts = () => {
    const heartItems = useSelector((store) => store.thoughts.items);
    const [thought, setThought] = useState("")
    const accessToken = useSelector(store => store.user.accessToken);
    // const [thoughts, setThoughts] = useState("")
    const dispatch = useDispatch()

const onLikesIncrease = (likeID) => {
    likeID.preventDefault()


    if(likeID === false) {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        "Authorization": accessToken
      }
    };
  
    fetch(API_URL(`thoughts/${thought._id}/like`), options)
      .then((res) => res.json())
    .then(() => {
      dispatch(thoughts.actions.items(data.response));
    })
    .catch((error) => console.error(error));

}
  }


return (
<>
{heartItems.map((likes) => (
    <div className="likes">
              {/* hand */}
              <button
              type="button"
              className={list.flames === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(likes._id)}>
                <p className="counter">🤘🏽  {likes.hearts}</p>
            </button>

            {/* hearts */}
            <button
              type="button"
              className={list.hearts === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(likes._id)}>            
              <p className="counter">💗  {likes.hearts}</p>
            </button>

            {/* flames */}
            <button
              type="button"
              className={list.flames === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(likes._id)}>
                <p className="counter">🔥  {likes.hearts}</p>
            </button>

            {/* lemon */}
            <button
              type="button"
              className={list.flames === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(likes._id)}>              
                <p className="counter">🍋  {likes.hearts}</p>
            </button>

            {/* <p className="date">
              {formatDistance(new Date(list.createdAt), Date.now(), {
                addSuffix: true
              })}
            </p> */}
        </div>
        ))}
        </>

)
};