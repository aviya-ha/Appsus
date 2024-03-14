


export function ColorInput({noteCreateStyle,onChangeNoteCreateStyle,onChangeStyle }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']
    


    function onSetColor(color) {
        
        const style = {style: {
            backgroundColor:color,
        }}

        if(noteCreateStyle){
            onChangeNoteCreateStyle(style)
        } else{
            onChangeStyle(style)
        } 
        
        
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





