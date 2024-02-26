import { Button } from '@mui/material'
import React, { useState } from 'react'

function Popup({ isOpen }) {
  const [isPopupOpenDelete, setPopupOpenDelete] = useState(isOpen)

  const togglePopupDelete = () => {
    setPopupOpenDelete(!isPopupOpenDelete)
  }
  return (
    <>
      {isPopupOpenDelete && (
        <div
          style={{
            borderRadius: '5px',
            width: '30%',
            position: 'fixed',
            top: '21%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F7F7F7',
            padding: '20px',
            boxShadow: '0 0 10px #d3bdff'
          }}
        >
          <div>
            <h5 style={{ marginTop: '5px' }}>Are you sure you want to delete this?</h5>
            <div>
              <Button
                onClick={togglePopupDelete}
                style={{ backgroundColor: '#f46a6a', color: 'white', width: '6rem', padding: '5px' }}
              >
                No
              </Button>
              <Button
                style={{
                  backgroundColor: '#9155FD',
                  color: 'white',
                  width: '6rem',
                  padding: '5px',
                  marginLeft: '30px'
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Popup
