const { useState, useEffect } = React


export function MailSideNav({ setIsComposeMail, onSetFilter, filterBy }) {


    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onFilter({target}) {
        
        let value = target.id
        let  field = 'folder'
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
		onSetFilter(filterByToEdit)
        console.log('prevFilterBy:', filterByToEdit)
    }

    function showModal() {
        console.log('hay');
        setIsComposeMail(true)
    }


    return <section className="main-container-side-nav">
        <button className="btn btn-open-side-nav fa-solid fa-bars"></button>
        <div className="main-side-nav">
            <button className="Side-Nav-compose fa-solid fa-pen" onClick={showModal}></button>
            <button id="inbox" className="Side-Nav-inbox fa-solid fa-inbox" onClick={onFilter}></button>
            <button className="Side-Nav-starred fa-regular fa-star"></button>
            <button id="sent" className="Side-Nav-sent fa-regular fa-paper-plane" onClick={onFilter}></button>
            <button className="Side-Nav-draft fa-regular fa-note-sticky"></button>
            <button className="Side-Nav-trash fa-solid fa-trash-can"></button>

        </div>

    </section>
}