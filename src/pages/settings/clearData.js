import React from 'react'
import DatePickerComponent from 'src/layouts/components/datePickerComponent//datePickerComponent'


function clearData() {
    return (
        <div>
            <div style={{ margin: '5px', borderRadius: '5px' }}>
                <h3 style={{ backgroundColor: '#F7F5F4', padding: '15px', margin: '0px' }}>Clear Data</h3>

                <div style={{ backgroundColor: 'white', padding: '25px' }}>
                    <h5 style={{margin:'5px'}}>Date to</h5>
                    <div style={{ display: 'flex', alignItems:'center' }}>
                            <DatePickerComponent 
                            />
                        
                        <div>
                        <button style={{padding:'8px 80px', marginLeft:'30px', border:'none', backgroundColor:'black', color:'white', borderRadius:'5px'}}>Download Bid History</button>
                        <button style={{padding:'8px 80px', marginLeft:'30px', border:'none', backgroundColor:'black', color:'white', borderRadius:'5px'}}>Download Wallet History</button>
                        <button style={{padding:'8px 80px', marginLeft:'30px', border:'none', backgroundColor:'black', color:'white', borderRadius:'5px'}}>Clean Data</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default clearData

