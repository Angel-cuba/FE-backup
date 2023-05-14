import React from 'react'
import CheckStock from '../../components/admin/CheckStock/CheckStock'
import './styles/CreatedAndCheck.scss'

const CreateAndCheck = () => {
  return (
    <div className="admin-createandcheck">
      <div className="admin-createandcheck__views">
        <CheckStock />
      </div>
    </div>
  )
}

export default CreateAndCheck
