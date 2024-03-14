
export function MailSideNav({setIsComposeMail}) {

function showModal(){
    console.log('hay');
    setIsComposeMail(true)
}


    return <section className="main-container-side-nav">
        <button className="btn btn-open-side-nav fa-solid fa-bars"></button>
        <div className="main-side-nav">
            <button className="Side-Nav-compose fa-solid fa-pen" onClick={showModal}></button>
            <button className="Side-Nav-inbox fa-solid fa-inbox"></button>
            <button className="Side-Nav-starred fa-regular fa-star"></button>
            <button className="Side-Nav-sent fa-regular fa-paper-plane"></button>
            <button className="Side-Nav-draft fa-regular fa-note-sticky"></button>
            <button className="Side-Nav-trash fa-solid fa-trash-can"></button>
            
        </div>

    </section>
}