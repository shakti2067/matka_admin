import React, { useEffect, useState } from 'react'
import { addSliderImage, getAllSliderImage, updateSliderImage } from 'src/helpers'
import moment from 'moment'
import { Button, Switch, TextField, Typography } from '@mui/material'

function sliderImages() {
  const [inputValue, setInputValue] = useState('')
  const [sliderData, setSliderData] = useState([])
  const [form, setForm] = useState({
    image: '',
    displayOrder: ''
  })
  const [isPopupOpenDelete, setPopupOpenDelete] = useState(false)
  const [sliderImageId, setSliderImageId] = useState('')

  const togglePopupDelete = event => {
    setPopupOpenDelete(!isPopupOpenDelete)
    setSliderImageId(event.target.value)
  }

  const [isPopupOpen, setPopupOpen] = useState(false)
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen)
  }

  let getAllSliderImageApi = () => {
    getAllSliderImage()
      .then(data => {
        if (data.success) {
          console.log('Data', data)
          setSliderData(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  const handleSliderStatus = event => {
    let params = {
      sliderId: event.target.value,
      isActive: event.target.checked
    }
    updateSliderImage(params)
      .then(data => {
        if (data.success) {
          console.log('updated slider', data)
          getAllSliderImageApi()
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleImageUpload = () => {
    let { image, displayOrder } = form

    let params = {
      image,
      displayOrder
    }
    addSliderImage(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          getAllSliderImageApi()
          setPopupOpen(!isPopupOpen)
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleDeleteSliderImage = () => {
    let params = {
      sliderId: sliderImageId,
      isActive: false,
      isDeleted: true
    }
    updateSliderImage(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          getAllSliderImageApi()
          setPopupOpenDelete(false)
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleSliderInActiveStatus = event => {
    let params = {
      sliderId: event.target.value,
      isActive: event.target.checked
    }
    updateSliderImage(params)
      .then(data => {
        if (data.success) {
          console.log('updated slider', data)
          getAllSliderImageApi()
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    getAllSliderImageApi()
  }, [])
  return (
    <div>
      <div style={{ width: '100%', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 style={{ margin: '0' }}>Slider Image Management</h4>
          <Button
            onClick={togglePopup}
            variant='contained'
            style={{
              color: 'white',
              border: 'none',
              padding: '7px 15px',
              fontSize: '12px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add Slider Image
          </Button>
          {isPopupOpen && (
            <div
              style={{
                borderRadius: '5px',
                // width: '60%',
                height: '50%',
                position: 'fixed',
                top: '44%',
                left: '53%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#F7F7F7',
                padding: '20px',
                boxShadow: '0 0 10px #d3bdff'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: '0' }}>Add Slider Image</h3>
                  <div onClick={togglePopup} style={{ cursor: 'pointer' }}>
                    &#10006;
                  </div>
                </div>
                <div>
                  <h5 style={{ marginBottom: '5px' }}>Slider Image(Allow Only.jpeg,.jpg,.png)</h5>
                  <TextField
                    type='file'
                    placeholder='Type something'
                    style={{
                      paddingRight: '30px',
                      padding: '8px',
                      width: '100%',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onChange={e => {
                      setForm({ ...form, image: e.target.files[0] })
                    }}
                  />
                </div>
                <div>
                  <h5 style={{ marginBottom: '5px' }}>Display Order</h5>
                  <TextField
                    inputProps={{ min: '1' }}
                    style={{
                      paddingRight: '30px',
                      padding: '8px',
                      width: '100%',
                      outline: 'none'
                    }}
                    type='number'
                    value={form.displayOrder}
                    onChange={e => {
                      setForm({ ...form, displayOrder: e.target.value })
                    }}
                  ></TextField>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Button
                    style={{ backgroundColor: '#9155FD', color: 'white', width: '11rem', padding: '5px' }}
                    onClick={handleImageUpload}
                  >
                    Submit
                  </Button>
                  <Button
                    style={{
                      backgroundColor: '#f46a6a',
                      color: 'white',
                      width: '11rem',
                      padding: '5px',
                      marginLeft: '30px'
                    }}
                    onClick={() => {
                      setForm({
                        image: '',
                        displayOrder: ''
                      })
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ margin: '0' }}>Show</h5>
            <select name='' id=''>
              <option value=''>25</option>
              <option value=''>50</option>
              <option value=''>75</option>
              <option value=''>100</option>
            </select>
            <h5 style={{ margin: '0' }}>entries</h5>
          </div> */}
          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ margin: '0' }}>Search:</h5>
            <input
              type='text'
              style={{ border: '1px solid lightgray', outline: 'none', borderRadius: '5px', padding: '4px' }}
            />
          </div> */}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr style={{}}>
            <td style={{ width: '80px', border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>#</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Slider Image</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Display Order</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Creation Date</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Status</td>
            <td style={{ border: '1px solid lightgray', cursor: 'pointer', paddingLeft: '10px' }}>Action</td>
          </tr>
          {sliderData &&
            sliderData.map((d, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>{index + 1}</td>
                <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>
                  <img src={d.image} alt='' style={{ width: '100px', height: '100px' }} />
                </td>
                <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>{d.displayOrder}</td>
                <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>
                  {moment(d.createdAt).format('YYYY-MM-DD')}
                </td>
                <td style={{ border: '1px solid lightgray', paddingLeft: '10px' }}>
                  {/* <Switch value={d._id} checked={d.isActive} onClick={handleSliderStatus} /> */}
                  {d.isActive ? (
                    <Button sx={{ color: 'green' }}>Yes</Button>
                  ) : (
                    <Button sx={{ color: 'red' }}>No</Button>
                  )}
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
                    value={d._id}
                    onClick={togglePopupDelete}
                  >
                    Delete
                  </button>
                  <Switch value={d._id} checked={d.isActive} onClick={handleSliderInActiveStatus} />
                  <label>{d.isActive ? 'Activate' : 'InActivate'}</label>
                </td>
              </tr>
            ))}
        </table>
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
                  onClick={handleDeleteSliderImage}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
        </div> */}
      </div>
    </div>
  )
}

export default sliderImages
