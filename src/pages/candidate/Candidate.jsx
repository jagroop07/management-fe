import React, { useState } from 'react'
import MyTable from '../../components/mytable/MyTable'
import { apiRoutes } from '../../utils/apiRoutes'
import { BASE_URL } from '../../constants'
import CandidateForm from '../../components/addCandidates/AddCandidate'
import { axiosClient } from '../../utils/axiosClient'

const Candidate = () => {
  const [refresh, setRefresh] = useState(true)

  const handleStatusChange = async (id, value) => {
    try {
      await axiosClient.patch(apiRoutes.UpdateCandidate + '/' + id, {
        status: value
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const columns = [
    { label: 'Sr. No', key: 'sr_number' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone_number' },
    { label: 'Position', key: 'position' },
    {
      label: 'Status',
      key: 'status',
      type: 'SELECT',
      options: [
        {
          value: 'Selected',
          title: 'Selected'
        },
        {
          value: 'Scheduled',
          title: 'Scheduled'
        }
      ],
      onChange: handleStatusChange
    },
    { label: 'Experience', key: 'experience' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MyTable
        search={true}
        columns={columns}
        baseAPI={BASE_URL + apiRoutes.ListCandidate}
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
          },
          {
            key: 'status',
            title: 'Status',
            options: [
              {
                value: 'Selected',
                title: 'Selected'
              },
              {
                value: 'Scheduled',
                title: 'Scheduled'
              }
            ]
          }
        ]}
        menu={[
          {
            title: 'Download Resume',
            onClick: ({ row }) => {
              window.open(`${BASE_URL}/${row.resume}`, '_blank')
            }
          },
          {
            title: 'Delete Candidate',
            onClick: async ({ row }) => {
              await axiosClient.delete(`${apiRoutes.DeleteCandidate}${row._id}`)
              setRefresh(prev => !prev)
            }
          }
        ]}
        addBtn={{
          title: 'Add Candidate',
          component: <CandidateForm refresh={() => setRefresh(prev => !prev)} />
        }}
        refresh={refresh}
      />
    </div>
  )
}

export default Candidate
