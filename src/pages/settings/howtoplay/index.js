import React from 'react'

function HowToPlay() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '70%', backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <div>
          <h3 style={{ margin: '5px' }}>How To Play</h3>
          <h5 style={{ margin: '5px' }}>How To Play Content</h5>
        </div>
        <textarea
          name='postContent'
          defaultValue='Simply download our application from Google Play Store or from our official website. 
                    Register with your Mobile Number, Email ID, User Name with our platform.                
                    Login with the application using Mobile Number and Password with your secure PIN code. 
                    Select the Game type, select your favourite number and start to Play Game.  
                    Get a chance to win upto 10 Lac Points.'
          rows={10}
          style={{
            width: '100%',
            marginBottom: '10px',
            outline: 'none',
            resize: 'none',
            fontSize: '16px',
            padding: '15px',
            opacity: '0.5'
          }}
        />
        <div style={{ marginBottom: '10px' }}>
          <h5 style={{ margin: '5px' }}>Video Link</h5>
          <input
            type='text'
            id='videoLink'
            style={{
              width: '100%',
              padding: '7px 15px',
              borderRadius: '20px ',
              border: '1px solid gray',
              outline: 'none',
              fontSize: '14px',
              opacity: '0.7'
            }}
            defaultValue={'https://www.youtube.com/watch?v=tvNc3jA-6_U'}
          />
        </div>
        <div>
          <button
            style={{
              padding: '10px 15px',
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '5px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '14px'
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default HowToPlay
