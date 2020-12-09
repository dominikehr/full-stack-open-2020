import React from 'react'

const Notification = ({notification}) => {
  const {style, message} = notification
    if (message == null) {
      return null
    }
  
    
    return (
      <div className={style}> 
        {message}
      </div>
    )
  }

export default Notification