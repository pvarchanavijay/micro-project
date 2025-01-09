import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/read')
            .then(response => setUsers(response.data))
            .catch(console.error);
    }, [users]);

    const handleCreate = () => {
        axios.post('http://localhost:3000/create', { name, age })
            .then(() => {
                setName('');
                setAge('');
            })
            .catch(console.error);
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3000/update/${editId}`, { name, age })
            .then(() => {
                setName('');
                setAge('');
                setEditId(null);
            })
            .catch(console.error);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`).catch(console.error);
    };

    const handleEdit = (user) => {
        setName(user.name);
        setAge(user.age);
        setEditId(user.id);
    };

    return (
        <div>
            <h1>CRUD App</h1>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    style={{ display: 'block', marginBottom: '10px' }} // Added margin to create space
                />
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    style={{ display: 'block', marginBottom: '10px' }} // Added margin to create space
                />
                {editId ? (
                    <button onClick={handleUpdate}>Update User</button>
                ) : (
                    <button onClick={handleCreate}>Create User</button>
                )}
            </div>

            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} (Age: {user.age})
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
