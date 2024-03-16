const { useState, useEffect } = React


export function MailSideNav({ setIsComposeMail, onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)



    useEffect(() => {
        if (!onSetFilter) return
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter({ target }) {
        if (!onSetFilter) return
        let value = target.id
        let field = 'folder'
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        onSetFilter(filterByToEdit)

    }

    function showModal() {
        setIsComposeMail(true)
    }

    



    return <section className="main-side-nav">
        <span className="Side-Nav-compose fa-solid fa-pen" onClick={showModal}></span>
        <span id="inbox" className="Side-Nav-inbox fa-solid fa-inbox" onClick={onFilter}></span>
        <span id="isStarred" className="Side-Nav-starred fa-regular fa-star" onClick={onFilter}></span>
        <span id="sent" className="Side-Nav-sent fa-regular fa-paper-plane" onClick={onFilter}></span>
        {/* <span className="Side-Nav-draft fa-regular fa-note-sticky"></span> */}
        {/* <span className="Side-Nav-trash fa-solid fa-trash-can"></span> */}
    </section>

}