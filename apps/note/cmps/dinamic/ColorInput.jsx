


export function ColorInput({noteStyle,onChangeStyle }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']
    

    function onSetColor(color) {
        
        const style = {style: {
            backgroundColor:color,
        }}
        onChangeStyle(style)
    }

    return <section className="color-input">
        <div className="items-container">
            {
                colors.map(color => <div key={color}
                    className={`item  + ${color}`}
                    onClick={() => onSetColor(color)}
                    style={{ backgroundColor: color }}
                ></div>)
            }
        </div>
    </section>
}





