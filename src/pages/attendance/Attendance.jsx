import React, { useState } from 'react'
import MyTable from '../../components/mytable/MyTable'
import { apiRoutes } from '../../utils/apiRoutes'
import { BASE_URL } from '../../constants'
import EmployeeForm from '../../components/employee/AddEditEmployee'
import { axiosClient } from '../../utils/axiosClient'
import Avatar from '../../components/Avatar'

const Attendance = () => {
  const [refresh, setRefresh] = useState(true)

  const handleStatusChange = async (id, value) => {
    try {
      await axiosClient.patch(apiRoutes.UpdateAttendance + '/' + id, {
        status: value
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const columns = [
    {
      label: 'Profile',
      key: 'employees.profile',
      render: ({ row }) => <Avatar url={row?.employees?.profile} />
    },
    { label: 'Employee Name', key: 'employees.name' },
    { label: 'Position', key: 'employees.position' },
    { label: 'Department', key: 'employees.department' },
    { label: 'Task', key: 'task' },
    {
      label: 'Status',
      key: 'status',
      type: 'SELECT',
      options: [
        {
          value: 'Present',
          title: 'Present'
        },
        {
          value: 'Absent',
          title: 'Absent'
        }
      ],
      onChange: handleStatusChange
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MyTable
        refresh={refresh}
        search={true}
        columns={columns}
        baseAPI={BASE_URL + apiRoutes.ListAttendance}
        filters={[
          {
            key: 'status',
            title: 'Status',
            options: [
              {
                value: 'Present',
                title: 'Present'
              },
              {
                value: 'Absent',
                title: 'Absent'
              },
              {
                value: 'Medical Leave',
                title: 'Medical Leave'
              },
              {
                value: 'Work from Home',
                title: 'Work from Home'
              }
            ]
          }
        ]}
        menu={[
          {
            title: 'Delete',
            onClick: async ({ row }) => {
              await axiosClient.delete(
                `${apiRoutes.DeleteAttendance}${row._id}`
              )
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

export default Attendance
