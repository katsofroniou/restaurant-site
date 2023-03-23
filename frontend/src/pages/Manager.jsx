import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styling/Manager.css";
import axios from 'axios';
/**
 * @author Natalia Widmann
 * @file Manager.jsx contains the frontend page with the list of users for the manager.
 */

/**
 * @function Manager
 * @returns {JSX.Element} Returns the constructed page for the Manager.
 */
function Manager () {

    /**
     * State hook to manage a list of users and a selected user object.
     * @typedef {Object} UserState
     * @property {Object[]} user - The list of user objects.
     * @property {function} setUser - The setter function to update the list of users.
     * @property {Object} selectedUser - The selected user object.
     * @property {function} setSelectedUser - The setter function to update the selected user object.
     */
    const [user, SetUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    /**
     * Retrieves a list of users from the server and sets them as the state of the component.
     * @function getUser
     * @async
     * @returns {Promise<void>}
     */
    const getUser = async () => {
        const response = await axios.get('http://127.0.0.1:8000/users/api')
        SetUser(response.data)
    }

    /**
     * A hook that is called on mount to retrieve the user data from the server and set it as the state of the component.
     * @function
     * @returns {void}
     */
    useEffect(() => {
        getUser();
    }, [])

    /**
     * Selects an user and updates the selected user state.
     * @function handleUserSelect
     * @param {Object} selectedUser - The selected order object.
     * @param {Object} selectedUser.name - The name of the selected user.
     * @returns {void}
     */
    const handleUserSelect = (selectedUser) => {
        setSelectedUser(prevState => ({
            ...prevState,
            [selectedUser.name]: !prevState[selectedUser.name],
        }));
    };

    /**
     * Handles the delete user button click event
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const handleDeleteUserClick = async () => {
        // Get the access_token from local storage
        const access_token = localStorage.getUser('access_token');

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
            <div class="users_container">
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
                                    onChange={() => handleUserSelect(user)}
                                />
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <button class="manager_add_button" onClick={handleDeleteUserClick}>
                <Link to='/Manager' class="manager_button_link">Delete User</Link>
            </button>
        </>
    )
}

export default Manager;