const { useState, useEffect } = React



export function NoteFilter({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function onFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

	function handleChange({ target }) {
		let { value, name: field, type } = target
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
	}
	

	return <section className="note-filter">
        
		<form onSubmit={onFilter}>
			<label htmlFor="search">search</label>
			<input type="text"
				id="search"
				name="txt"
				value={filterByToEdit.txt}
				onChange={handleChange}
				placeholder="By txt" 
                autoComplete="off"
                />

			<label htmlFor="type">type</label>
			<input type="text"
				id="type"
				name="type"
				value={filterByToEdit.type}
				onChange={handleChange}
				placeholder="By type" 
                autoComplete="off"
                />
                

			<button>Filter</button>
		</form>
	</section>
}


