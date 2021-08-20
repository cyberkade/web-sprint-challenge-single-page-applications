import './Form.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        topping1: false,
        topping2: false,
        topping3: false,
        topping4: false,
        special: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: '',
        size: '',
        topping1: false,
        topping2: false,
        topping3: false,
        topping4: false,
        special: ''
    });

    const formSchema = Yup.object().shape({
        name: Yup
        .string()
        .trim()
        .required()
        .min(2, "name must be at least 2 characters"),
        size: Yup
        .string()
        .required('you must include a size'),
        topping1: Yup
        .boolean(),
        topping2: Yup
        .boolean(),
        topping3: Yup
        .boolean(),
        topping4: Yup
        .boolean(),
        special: Yup
        .string()
        .max(120, 'max character limit reached')
    });

    useEffect( () => {
        formSchema.isValid(formData).then((valid) => {
            setButtonDisabled(!valid);
        })
      }, [formData])

      const inputChange = e => {
        const {name, value, checked, type} = e.target
        const valueToUse = type === 'checkbox' ? checked : value;
        console.log(name)
        Yup
        .reach(formSchema, name)
        .validate(value)
        .then(() => {
            setErrors({
                ...errors, [name]: ''
            })
        })
        .catch(err => {
            setErrors({
                ...errors, [name]: err.errors[0]
            })
        })

        setFormData({
            ...formData, [name]: valueToUse
        })
      }

      const submit = (e) => {
        e.preventDefault();
        const newOrder = {
            name: formData.name,
            size: formData.size,
            topping1: formData.topping1,
            topping2: formData.topping2,
            topping3: formData.topping3,
            topping4: formData.topping4,
            special: formData.special
        }
        axios.post('https://reqres.in/api/orders', newOrder)
        .then(res => {
            console.log(res.data)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
        setFormData({
            name: '',
            size: '',
            topping1: false,
            topping2: false,
            topping3: false,
            topping4: false,
            special: ''
       });
    }

    return (
        <form id='pizza-form' onSubmit={submit}>
            <h2>Build Your Own Pizza</h2>
            <div className='img'></div>
            <h2>Build Your Own Pizza</h2>
            <p>
                What's Your Name? <br/> Required
                {errors.name.length > 0 && <p className='errorMsg'>{errors.name}</p>}
            </p>
                <input value={formData.name} onChange={inputChange} type='text' name='name' id='name-input' />
            <p>
                Pick a Size <br/> Required
            </p>
                <select value={formData.size} onChange={inputChange} name='size' id='size-dropdown'>
                    <option>--pick a size--</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>Jumbo</option>
                </select>
                    <p>
                        Add Toppings <br/> Choose up to 4
                    </p>
                    <div className='toppings'>
                        <label>
                            Pepperoni
                            <input checked={formData.topping1} onChange={inputChange} type='checkbox' name='topping1' id='pepperoni' />
                        </label>
                        <label>
                            Chicken
                            <input checked={formData.topping2} onChange={inputChange} type='checkbox' name='topping2' id='chicken' />
                        </label>
                        <label>
                            Jalapenoes
                            <input checked={formData.topping3} onChange={inputChange} type='checkbox' name='topping3' id='jalapenoes' />
                        </label>
                        <label>
                            Pineapple
                            <input checked={formData.topping4} onChange={inputChange} type='checkbox' name='topping4' id='pineapple' />
                        </label>
                    </div>
                    <p>
                        Special Instructions <br/> Optional
                    </p>
                        <input value={formData.special} className='special' onChange={inputChange} type='text' name='special' id='special-text' />
                    
                    <button id='order-button' disabled={buttonDisabled} >Submit</button>
        </form>
    )
}