/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';

import Header from 'Components/Header';
import { NewThought } from 'Components/NewThought';
import { ThoughtList } from 'Components/ThoughtList';
import { Footer } from './Components/Footer';

export const App = () => {
  const [thoughts, setThoughts] = useState([]); //variable is used to store an array of objects, which will represent the thoughts fetched from the API.
  const [loading, setLoading] = useState(false); // a boolean value that indicates whether the API call is in progress.
  const [newMessage, setNewMessage] = useState(''); //variable to store the value of the text area in the NewThought component.

  //handleNewThoughtsChange is a function that updates the newMessage state variable when the user types in the text area.
  const handleNewThoughtsChange = (event) => {
    setNewMessage(event.target.value);
  };

  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://project-happy-thoughts-api-oivc6zag6a-lz.a.run.app/thoughts')
      .then((data) => data.json())
      .then((jsonData) => setThoughts(jsonData.response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  //The onFormSubmit function is called when the user submits a new thought. It makes a POST request to the API with the new thought message and updates the thoughts state variable.
  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newMessage
      })
    };

    fetch(
      'https://project-happy-thoughts-api-oivc6zag6a-lz.a.run.app/thoughts',
      options
    )
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewMessage(''));
  };

  // const onLikesIncrease = (LikeID) => {
  //   const options = {
  //     method: 'POST',
  //     body: '',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }
  
  //   fetch(
  //     `https://project-happy-thoughts-api-oivc6zag6a-lz.a.run.app/thoughts/${LikeID}/like`,
  //     options
  //   )
  //     .catch((error) => error)
  //     .finally(() => fetchThoughts())
  // } 

  // const onLikesIncrease = (LikeID) => {
  //   const options = {
  //     method: 'PATCH',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   };

  //   // fetch(
  //   //   `https://project-happy-thoughts-api-oivc6zag6a-lz.a.run.app/thoughts/${LikeID}/like`,
  //   //   options
  //   // )
  //   fetch(
  //     `https://localhost:8080/thoughts/${LikeID}/like`,
  //     options
  //   )

  //   `${API_URL}/thoughts/${LikeID}/like`, options
  //     .then((res) => res.json())
  //     .then((tomato) => { 
  //       const updatedThoughts = thoughts.map((thought) => {
  //         if (thought._id === tomato.response._id) {
  //           thought.hearts += 1;
  //         }
  //         return thought;
  //       });
  //       setThoughts(updatedThoughts);
  //     }) 
  //     .catch((error) => error);
  //     fetchThoughts();

  //   //   .then((res) => res.json())
  //   // .then(() => {
  //   //   dispatch(thoughts.actions.likeThought({ LikeID }));
  //   // })
  //   // .catch((error) => console.error(error));
  // };

  return (
    <div className="main-container">
      <Header />
      <div className="thoughts">
        <NewThought
          newMessage={newMessage}
          handleNewThoughtsChange={handleNewThoughtsChange}
          onFormSubmit={onFormSubmit} />
        <ThoughtList
          loading={loading}
          thoughts={thoughts}
          onLikesIncrease={onLikesIncrease} />
        <Footer />
      </div>
    </div>
  );
};