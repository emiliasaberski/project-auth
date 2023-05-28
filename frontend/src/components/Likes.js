/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { API_URL } from 'utils/urls';

export const LikeBtn = ({ thoughtId }) => {
  const [liked, setLiked] = useState(false);
  const accessToken = useSelector(store => store.user.accessToken);
  const dispatch = useDispatch()

//   // the function that enables the likes-count to update in the App-component
//   const handleNewLikeChange = () => {
//     setNewLike(true)
//   }

  // The function that registers the users like to the database, it also
  // triggers the state-hook that makes the button change color
  const onButtonClick = (event) => {
    event.preventDefault();

    if (!liked) {
      const options = {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL(`thoughts/${thoughtId}/like`), options)
            .then(res => res.json())
            .catch((error) => console.log(error))
            .finally(() => setLiked(true))
    }
  }

  return (
    <>
      <button type="button" className={liked ? 'no-like-btn' : 'like-btn'} onClick={onButtonClick}>
        <p className="counter">🍋 {thoughts.hearts}</p>
      </button>

      {/*<button type="button" className={liked ? 'no-like-btn' : 'like-btn'} onClick={onButtonClick}>
        <p className="counter">🔎 {thoughts.hearts}</p>
  </button> */}
      </>
  )
}
