import React, { useState } from "react";

const PersonsView = ({
  persons,
  error,
  isLoading,
  onCreatePerson,
  onUpdatePerson,
  onDeletePerson,
}) => {
  const [newPerson, setNewPerson] = useState({ name: "", surname: "", email: "", role: "", username: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({ name: "", surname: "", email: "", role: "", username: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onCreatePerson(newPerson);
    setNewPerson({ name: "", surname: "", email: "", role: "", username: "" }); // Reset form fields
    setIsAdding(false); // Hide the form after submission
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateFormSubmit = (event, personId) => {
    event.preventDefault();
    onUpdatePerson(personId, updateFormData);
    setEditingId(null); // Reset editing state
    setUpdateFormData({ name: "", surname: "", email: "", role: "", username: "" }); // Reset update form fields
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Persons List</h2>
      {error && <p className="error">Error: {error}</p>}

      {isAdding ? (
        <form onSubmit={handleFormSubmit} className="person-form">
          <input type="text" name="name" value={newPerson.name} onChange={handleInputChange} placeholder="Name" required />
          <input type="text" name="surname" value={newPerson.surname} onChange={handleInputChange} placeholder="Surname" />
          <input type="email" name="email" value={newPerson.email} onChange={handleInputChange} placeholder="Email" required />
          <input type="text" name="role" value={newPerson.role} onChange={handleInputChange} placeholder="Role" required />
          <input type="text" name="username" value={newPerson.username} onChange={handleInputChange} placeholder="Username" required />
          <button type="submit">Add Person</button>
          <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add New Person</button>
      )}

      <ul className="persons-list">
        {persons.map((person) => (
          <li key={person.id} className="person-item">
            <div>Name: {person.name}</div>
            <div>Surname: {person.surname || 'N/A'}</div>
            <div>Email: {person.email}</div>
            <div>Role: {person.role}</div>
            <div>Username: {person.username}</div>
            {/* Conditional rendering for update and delete actions */}
            {editingId === person.id ? (
              <form onSubmit={(event) => handleUpdateFormSubmit(event, person.id)}>
                {/* Inputs for updating person details */}
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <button onClick={() => { setEditingId(person.id); setUpdateFormData({ name: person.name, surname: person.surname, email: person.email, role: person.role, username: person.username }); }}>Update</button>
                <button onClick={() => onDeletePerson(person.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonsView;
