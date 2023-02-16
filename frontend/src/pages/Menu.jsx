import React, {useState, useEffect} from "react";
import "../styling/Menu.css";
import axios from 'axios'

function Menu () {
    const [dish, setDish] = useState([])

    const getDish = async () => {
        const response = await axios.get('http://127.0.0.1:8000/menu/api')
        setDish(response.data)
    }

    useEffect(() =>{
        getDish();
    }, [])

    return (
        <>
            <button class="menu_button">Show Calories</button>
            <button class="menu_button">Call waiter</button>
            
            { dish.map((dish, index) => (
                    <table class="menu_table">
                        <tr>
                            <th>Dish</th>
                            <th>Description</th>
                            <th>Course</th>
                            <th>Allergens</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>{dish.name}</td>
                            <td>{dish.description}</td>
                            <td>{dish.course}</td>
                            <td>{dish.allergens}</td>
                            <td>{dish.price}</td>
                        </tr>
                   </table> 
            ))}
        </>  
    );
}

export default Menu;