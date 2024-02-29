import { Card, Typography } from '@mui/material'
import React from 'react'

let boxStyle = {
  border: '2px solid #b690fe',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#f6f1ff',
  borderRadius: '5px',
  cursor: 'pointer'
}

let redBoxStyle = {
  border: '2px solid #f78f8f',
  padding: '8px 0px',
  width: '3.2rem',
  textAlign: 'center',
  backgroundColor: '#fdeaea',
  borderRadius: '5px',
  cursor: 'pointer'
}

let numbers = Array.from(Array(10).keys())

function DoublePana() {
  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Double Pana Numbers</Typography>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              0
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              1
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              2
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              3
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              4
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              5
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              6
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              7
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              8
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
        <div>
          <Typography variant='body1' style={{ marginTop: '5px' }}>
            Single Ank
          </Typography>
          <div style={{ display: 'flex', gap: '30px', margin: '20px' }}>
            <Typography variant='button' style={redBoxStyle}>
              9
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: '30px', margin: '20px', flexWrap: 'wrap' }}>
            {numbers.map((d, i) => {
              return (
                <Typography key={i} variant='button' style={boxStyle}>
                  {d}
                </Typography>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
export default DoublePana
