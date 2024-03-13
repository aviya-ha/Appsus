

export function MailHeader(){
return <section className="main-container-mail-header">
<button className="btn btn-open-side-nav">≣</button>
<div className="inside-mail-header">
	<h1 className="mail-logo">Email</h1>
<input className="mail-search" type="text"
				id="search"
				name="search"
				// value={filterByToEdit.txt}
				// onChange={handleChange}
				placeholder="Search" />
</div>

</section>
}