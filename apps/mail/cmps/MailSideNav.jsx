
export function MailSideNav() {
    return <section className="main-container-side-nav">
        <button className="btn btn-open-side-nav">≣</button>
        <div className="main-side-nav">
            <div className="Side-Nav-inbox">inbox</div>
            <div className="Side-Nav-starred">starred</div>
            <div className="Side-Nav-sent">sent</div>
            <div className="Side-Nav-draft">draft</div>
            <div className="Side-Nav-trash">trash</div>
        </div>

    </section>
}