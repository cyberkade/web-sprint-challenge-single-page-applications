import './Form.css'

export default function Form() {

    return (
        <form id='pizza-form'>
            <h2>Build Your Own Pizza</h2>
            <div className='img'></div>
            <h2>Build Your Own Pizza</h2>
            <label>
                What's Your Name? <br/> Required
                </label>
                <input type='text' name='name' id='name-input' />
            
        </form>
    )
}