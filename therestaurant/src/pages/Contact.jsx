import React from "react";

export const Contact = () => {
  return (
    <div className='form-container'>
      <form>
        <h2 className='title'>Talk to Us</h2>
        <input
          type='text'
          className='fullname'
          placeholder='Fullname'
        />
        <div className='form-control'>
          <input
            type='text'
            className='phone'
            placeholder='Phone Number'
          />
          <input
            type='text'
            className='email'
            placeholder='Email'
          />
        </div>
        <textarea
          name='message'
          id='message'
          cols='50'
          rows='20'
          placeholder='Message...'
        ></textarea>
      </form>
    </div>
  );
};
