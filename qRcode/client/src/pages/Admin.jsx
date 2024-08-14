import React from 'react'
import AllBusinesses from './AllBusinesses.jsx'
import AllContacts from './AllContacts.jsx'
import AllUsers from './AllUsers.jsx'
import AllFeedbacks from './AllFeedbacks.jsx'

const Admin = () => {
  return (
    <div className='lg:ml-20'>
      <AllBusinesses />
      <AllContacts />
      <AllUsers />
      <AllFeedbacks />
    </div>
  )
}

export default Admin