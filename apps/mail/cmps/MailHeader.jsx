const { useState, useEffect } = React

export function MailHeader({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])


	function onFilter({ target }) {
		let { value, name: field } = target
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
		onSetFilter(filterByToEdit)
	}


	return <section className="main-container-mail-header">

		<h1 className="mail-logo">Email</h1>
<div>

		<input className="mail-search"
			type="text"
			id="search"
			name="search"
			value={filterByToEdit.search}
			onChange={onFilter}
			placeholder="Search" />


			
	<select className="deBug" onChange={(ev) => { setCmpType(ev.target.value) }}>
			<option value="all">All</option>
			<option value="read">Read</option>
			<option value="unRead">Unread</option>
		</select>
</div>
		






	</section>
}