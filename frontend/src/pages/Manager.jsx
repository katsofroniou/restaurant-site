import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styling/Manager.css";
import axios from 'axios';

function Manager () {

    const [user, SetUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    const getUser = async () => {
        const response = await axios.get('http://127.0.0.1:8000/users/api')
        SetUser(response.data)
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleUserSelect = (selectedUser) => {
        setSelectedUser(prevState => ({
            ...prevState,
            [selectedUser.name]: !prevState[selectedUser.name],
        }));
    };

    const handleDeleteUserClick = async () => {
        // Get the access_token from local storage
        const access_token = localStorage.getItem('access_token');

        // If access_token is null or empty, the user is not authenticated
        if (!access_token) {
            console.log('User not authenticated');
            return;
        }

        // Delete the selected user
        const deleteUsers = [];

        Object.keys(selectedUser).forEach((name) => {
            if (selectedUser[name]) {
                deleteUsers.push(name);
            }
        });

        if (deleteUsers.length > 0) {
            try {
                await Promise.all(deleteUsers.map(user => {
                    return axios({
                        method: 'DELETE',
                        url: `http://127.0.0.1:8000/users/api/${user}`,
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                }));

                // Update the state to remove the deleted users
                const newUser = user.filter((u) => !deleteUsers.includes(u.name));
                SetUser(newUser);

            } catch (error) {
                console.error(error);
            }
        }
    }
    return(
        <>
            <table class="user_menu_table">
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Delete?</th>
                </tr>
                {user.map((user, index) => (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedUser[user.name] || false}
                                onChange={() => handleItemSelect(user)}
                            />
                        </td>
                    </tr>
                ))}
            </table>
            <button class="manager_add_button" onClick={handleDeleteUserClick}>
                <Link to='/Manager' class="manager_button_link">Delete User</Link>
            </button>
        </>
    )
}

export default Manager;