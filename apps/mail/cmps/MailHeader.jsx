const { useState, useEffect } = React

export function MailHeader({onSetFilter,filterBy}) {
	console.log('filterBy:', filterBy)
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])


	function onFilter({ target }) {
		// ev.preventDefault()
		let { value, name: field, type } = target
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
		onSetFilter(filterByToEdit)
	}

	function handleChange({ target }) {
		// console.log('target', target)

		let { value, name: field, type } = target
		if (type === 'number') value = +value


		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
	
	}

console.log('filterByToEdit:', filterByToEdit)
	return <section className="main-container-mail-header">

		<h1 className="mail-logo">Email</h1>
		
		<input className="mail-search" 
		 type="text"
			id="search"
			name="search"
			value={filterByToEdit.search}
			onChange={onFilter}
			placeholder="Search" />

		


	</section>
}