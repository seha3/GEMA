import React from 'react'

function SearchInput ({ handleSearchInput }) {
  return (
    <div className='search'>
      <label htmlFor='search-input' className='search-input-label'>Character Search:</label>
      <input type='text' id='search-input' className='search-input' placeholder="e.g. 'Rick'" spellCheck='false' onChange={handleSearchInput} />
    </div>
  )
}

export default SearchInput
