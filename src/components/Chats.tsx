'use client'
import React from 'react'
import { useEffect } from 'react'
function Chats() {
    useEffect(() => {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
          }, []);
  return (
    <div className='border border-danger d-flex' >
        test
    </div>
  )
}

export default Chats