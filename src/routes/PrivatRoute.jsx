import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivatRoute = ({component,fallbackPath,isAuth}) => {
    if (isAuth) {
        return component 
    }

  return (
    <Navigate to={fallbackPath}/>
  )
}

export default PrivatRoute