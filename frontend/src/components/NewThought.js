import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';
import { API_URL } from 'utils/urls';

// The newMessage state is passed in as a prop to the component
// The handleNewThoughtsChange function is called when
// the user interacts with the input field and and onFormSubmit when user submits the form.
export const NewThought = () => {
  const [newMessage, setNewMessage] = useState("")
  const accessToken = useSelector(store => store.user.accessToken);
  // const [remainingChars, setRemainingChars] = useState(160 - newMessage.length);
  const handleNewThoughtsChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    // const remaining = 140 - input.length;
    // setRemainingChars(remaining);
    handleNewThoughtsChange(event);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
        body: JSON.stringify({ message: newMessage })
    }
    fetch(API_URL("thoughts"), options)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                dispatch(thoughts.actions.setError(null));
                dispatch(thoughts.actions.setItems(data.response));
            } else {
                dispatch(thoughts.actions.setError(response));
                dispatch(thoughts.actions.setItems([]));
            }
        }) 
        .catch((error) => console.log(error))
        .finally(() => {setNewMessage('')})
}
  
  return (
    <>
    <form className="message-container" onSubmit={onFormSubmit}>
      <div className='input-btn-box'>
      <textarea
        placeholder="What's up?"
        value={newMessage}
        onChange={handleInputChange} 
        />
      <div className="main">
        {/* <div className="char-count">{remainingChars}  / 140</div> */}
        <button className="submit-btn" type="submit" disabled={newMessage.length < 1 || newMessage.length > 160}>
          send
        </button>
        </div>
      </div>
    </form>
    </>
  );
};