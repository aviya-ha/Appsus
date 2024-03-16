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

		<div className="mail-logo">
		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png" alt="gmail" />
		<h1 >Email</h1>
		</div>

		<input className="mail-search"
			type="text"
			id="search"
			name="search"
			value={filterByToEdit.search}
			onChange={onFilter}
			placeholder="  Search" 
			autoComplete="off"
			/>

		<div className="mail-filters">
			<select className="mail-isRead" onChange={onFilter} name="isRead">
				<option value="all">All</option>
				<option value="read">Read</option>
				<option value="unRead">Unread</option>
			</select>
		</div>


	</section>
}

