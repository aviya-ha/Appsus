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
		// console.log('target', target)

		let { value, name: field, type } = target
		// if (type === 'number') value = +value
		
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
		// onSetFilter(filterByToEdit)
	}
	

	return <section className="note-filter">
		<h2>Filter your notes</h2>
        
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


