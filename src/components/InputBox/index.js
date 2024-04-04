import React, { useState } from 'react'

function InputBox({ searchValue = () => {} }) {
  const [inputValue, setInputValue] = useState('')

  searchValue(inputValue)

  const handleClearInput = () => {
    setInputValue('')
  }
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <input
          type='text'
          placeholder='Type something'
          style={{
            paddingRight: '30px',
            border: '2px solid #F0EEEE',
            borderRadius: '4px',
            padding: '8px',
            width: '100%',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={e => (e.target.style.borderColor = '#9155FD')}
          onBlur={e => (e.target.style.borderColor = '#F0EEEE')}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '5px',
            transform: 'translateY(-50%)',
            pointerEvents: 'auto',
            cursor: 'pointer',
            color: 'lightgray'
          }}
          onClick={handleClearInput}
        >
          &#x2715;
        </div>
      </div>
    </div>
  )
}

export default InputBox
