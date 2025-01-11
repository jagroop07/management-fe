import React, { useState, useEffect } from 'react'
import './style.css'
import { axiosClient } from '../../utils/axiosClient'
import MyModal from '../../components/MyModal'

const MyTable = ({
  baseAPI,
  filters: defaultFilters,
  search = false,
  columns,
  menu = null,
  addBtn = null,
  editBtn = null,
  refresh
}) => {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(-1)

  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  
  const fetchData = async () => {
    try {
      const response = await axiosClient.post(baseAPI, {
        filter: {
          ...filters
        },
        search: searchQuery
      })

      setData(response.data.details || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    setModalOpen(false)
  }, [refresh])

  useEffect(() => {
    fetchData()
  }, [filters, searchQuery, refresh])

  const handleFilterChange = e => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: Boolean(value) ? value : undefined
    }))
  }

  const handleSearch = e => {
    setSearchQuery(e.target.value)
  }

  const handleDelete = async id => {
    try {
      await axiosClient.delete(`${baseAPI}/${id}`)
      fetchData() 
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }

  return (
    <div className='table-container'>
      <div className='filter-bar'>
        <div className='filter-bar-filters'>
          {defaultFilters.map(filterObj => (
            <select
              key={filterObj.key}
              name={filterObj.key}
              value={filters[filterObj.key]}
              onChange={handleFilterChange}
            >
              <option value='' className='uppercase'>
                {filterObj.key}
              </option>
              {filterObj.options.map(fOptions => (
                <option value={fOptions.value}>{fOptions.title}</option>
              ))}
            </select>
          ))}
        </div>
        <div className='flex-row'>
          {search && (
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearch}
            />
          )}
          {addBtn && (
            <div className='primary-btn' onClick={() => openModal()}>
              {addBtn.title}
            </div>
          )}
        </div>
      </div>
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
              {menu && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                {columns.map(col => {
                  if (col.render) {
                    return col.render({ row: item })
                  }

                  return (
                    <td key={col.key}>
                      {col.type === 'SELECT' ? (
                        <select
                          value={col.key
                            .split('.')
                            .reduce((o, i) => o[i], item)}
                          onChange={e => {
                            col.onChange(item._id, e.target.value)
                            let oldData = [...data]
                            const keys = col.key.split('.')
                            keys.reduce((o, i, idx) => {
                              if (idx === keys.length - 1) {
                                o[i] = e.target.value
                              }
                              return o[i]
                            }, oldData[index])
                            setData([...oldData])
                          }}
                        >
                          {col.options.map(fOptions => (
                            <option value={fOptions.value}>
                              {fOptions.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        col.key.split('.').reduce((o, i) => o[i], item)
                      )}
                    </td>
                  )
                })}
                {menu && (
                  <td className='action-button-wrapper'>
                    <div
                      onClick={() =>
                        setIsMenuOpen(isMenuOpen != -1 ? -1 : index)
                      }
                      className={`action-button ${
                        isMenuOpen == index && isMenuOpen != -1 ? 'rotate' : ''
                      }`}
                    >
                      <div className='three-dots'>
                        <div className='dot dot1'></div>
                        <div className='dot dot2'></div>
                        <div className='dot dot3'></div>
                      </div>
                      {isMenuOpen == index && isMenuOpen != -1 && (
                        <div className='popup-menu'>
                          {menu &&
                            menu.map(m => {
                              if (m?.type && m?.type == 'EDIT_ROW') {
                                return (
                                  <button
                                    className='popup-menu-item'
                                    onClick={() => {
                                      setModalOpen(item?._id)
                                    }}
                                  >
                                    {m.title}
                                  </button>
                                )
                              }

                              return (
                                <button
                                  className='popup-menu-item'
                                  onClick={() =>
                                    m.onClick ? m.onClick({ row: item }) : null
                                  }
                                >
                                  {m.title}
                                </button>
                              )
                            })}
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addBtn && (
        <MyModal
          title={addBtn?.title}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          {addBtn?.component}
        </MyModal>
      )}

      {editBtn && isModalOpen && (
        <MyModal
          title={editBtn?.title}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          {editBtn.component({ id: isModalOpen })}
        </MyModal>
      )}
    </div>
  )
}

export default MyTable
