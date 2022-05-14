import { useState } from 'react'

const SearchFilterChoice = (props) => {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    if (checked === false) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  return (
    <li>
      <div className="filter-li-name">{props.name}</div>
      <input
        type="checkbox"
        name={props.name}
        value={checked}
        onChange={handleChange}
      />
      <div className="filter-ul-total">{props.tracks.length}</div>
    </li>
  )
}

export default SearchFilterChoice
