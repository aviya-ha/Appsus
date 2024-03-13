
export function MailSideNav() {
    return <section className="main-container-side-nav">
        <button className="btn btn-open-side-nav">≣</button>
        <div className="main-side-nav">
            <button className="Side-Nav-inbox">inbox</button>
            <button className="Side-Nav-starred">starred</button>
            <button className="Side-Nav-sent">sent</button>
            <button className="Side-Nav-draft">draft</button>
            <button className="Side-Nav-trash">trash</button>
        </div>

    </section>
}