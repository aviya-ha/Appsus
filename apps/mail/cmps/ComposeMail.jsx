
export function ComposeMail({setIsComposeMail}) {

    function showModal(){
        console.log('hay');
        setIsComposeMail(false)
    }

    return <section className="mail-compose-container">
        <header className="mail-compose-header">
            <h1>New Message</h1> <button className="fa-solid fa-xmark" onClick={showModal}></button>
        </header>
        <main className="mail-compose-main">
            <input className="mail-compose-to"
                type="text"
                id="to"
                name="to"
                // value={filterByToEdit.search}
                // onChange={onFilter}
                placeholder="To" />

            <input className="mail-compose-subject"
                type="text"
                id="subject"
                name="subject"
                // value={filterByToEdit.search}
                // onChange={onFilter}
                placeholder="Subject" />

            <input className="mail-compose-body"
                type="text"
                id="body"
                name="body"
                // value={filterByToEdit.search}
                // onChange={onFilter}
                // placeholder="Subject" 
                />
        </main>

        <footer className="mail-compose-footer">
<button className="btn btn-Send">Send</button>
        </footer>


    </section>
}