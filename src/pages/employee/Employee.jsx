import React, { useState } from 'react'
import MyTable from '../../components/mytable/MyTable'
import { apiRoutes } from '../../utils/apiRoutes'
import { BASE_URL } from '../../constants'
import EmployeeForm from '../../components/employee/AddEditEmployee'
import { axiosClient } from '../../utils/axiosClient'
import Avatar from '../../components/Avatar'

const Employee = () => {
  const [refresh, setRefresh] = useState(true)

  const handleStatusChange = async (id, value) => {
    try {
      await axiosClient.patch(apiRoutes.UpdateEmployee + '/' + id, {
        status: value
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const columns = [
    {
      label: 'Profile',
      key: 'profile',
      render: ({ row }) => <Avatar url={row?.profile} />
    },
    { label: 'Employee Name', key: 'name' },
    { label: 'Email Address', key: 'email' },
    { label: 'Phone Number', key: 'phone_number' },
    { label: 'Position', key: 'position' },
    { label: 'Department', key: 'department' },
    {
      label: 'Date of Joining',
      key: 'joining_date',
      render: ({ row }) => (
        <div className='center'>{new Date(row?.joining_date)?.toLocaleDateString()}</div>
      )
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MyTable
        refresh={refresh}
        search={true}
        columns={columns}
        baseAPI={BASE_URL + apiRoutes.ListEmployee}
        filters={[
          {
            key: 'position',
            title: 'Position',
            options: [
              {
                value: 'Intern',
                title: 'Intern'
              },
              {
                value: 'Full Time',
                title: 'Full Time'
              },
              {
                value: 'Junior',
                title: 'Junior'
              },
              {
                value: 'Senior',
                title: 'Senior'
              },
              {
                value: 'Team Lead',
                title: 'Team Lead'
              }
            ]
          }
        ]}
        menu={[
          {
            title: 'Edit',
            type: 'EDIT_ROW'
          },
          {
            title: 'Delete',
            onClick: async ({ row }) => {
              await axiosClient.delete(`${apiRoutes.DeleteEmployee}${row._id}`)
              setRefresh(prev => !prev)
            }
          }
        ]}
        editBtn={{
          title: 'Edit Employee',
          component: ({ id }) => (
            <EmployeeForm id={id} refresh={() => setRefresh(prev => !prev)} />
          )
        }}
      />
    </div>
  )
}

export default Employee
