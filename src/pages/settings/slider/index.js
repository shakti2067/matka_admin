import React from 'react'
function sliderImages() {
  return (
    <div>
      <div style={{ width: '90%', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 style={{ margin: '0' }}>Slider Image Management</h4>
          <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              padding: '7px 15px',
              fontSize: '12px',
              borderRadius: '5px'
            }}
          >
            Add Slider Image
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ margin: '0' }}>Show</h5>
            <select name='' id=''>
              <option value=''>25</option>
              <option value=''>50</option>
              <option value=''>75</option>
              <option value=''>100</option>
            </select>
            <h5 style={{ margin: '0' }}>entries</h5>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ margin: '0' }}>Search:</h5>
            <input
              type='text'
              style={{ border: '1px solid lightgray', outline: 'none', borderRadius: '5px', padding: '4px' }}
            />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr style={{}}>
            <td style={{ width: '80px', border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>#</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Slider Image</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Display Order</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Dreation Date</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Status</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Action</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>1</td>
            <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>
              <img src='/images/slider/slider-image.jpg' alt='' style={{ width: '100px', height: '100px' }} />
            </td>
            <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>4</td>
            <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>2023-12-19</td>
            <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>
              <button
                style={{
                  backgroundColor: '#D8F1DB  ',
                  color: '#6A9C6F ',
                  border: 'none',
                  borderRadius: '10px',
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
              >
                yes
              </button>
            </td>
            <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>
              <button
                style={{
                  backgroundColor: '#E16E6E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
              <button
                style={{
                  backgroundColor: '#62BB87 ',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
              >
                Inactivate
              </button>
            </td>
          </tr>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <h5 style={{ margin: '0' }}>Showing 1 to 1 of 1 entries</h5>
          <div style={{ display: 'flex' }}>
            <h5
              style={{
                margin: '0',
                padding: '10px',
                alignItems: 'center',
                padding: '5px 10px',
                borderTop: '1px solid lightgray',
                borderLeft: '1px solid lightgray',
                borderBottom: '1px solid lightgray',
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px '
              }}
            >
              Previous
            </h5>
            <h5
              style={{
                margin: '0',
                padding: '10px',
                alignItems: 'center',
                padding: '5px 10px',
                backgroundColor: '#D8BD69',
                cursor: 'pointer'
              }}
            >
              1
            </h5>
            <h5
              style={{
                margin: '0',
                padding: '10px',
                alignItems: 'center',
                padding: '5px 10px',
                borderTop: '1px solid lightgray',
                borderRight: '1px solid lightgray',
                borderBottom: '1px solid lightgray',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px '
              }}
            >
              Next
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default sliderImages
