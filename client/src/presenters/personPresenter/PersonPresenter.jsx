import React, { useEffect, useState } from 'react';
import apiModule from "../../integration/funtownApi";
import PersonsView from "../../views/personView/PersonView";

const PersonPresenter = () => {
    const [persons, setPersons] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () => {
        setIsLoading(true);
        try {
            const data = await apiModule.getAllPersons();
            setPersons(data);
            setError(''); // Reset any previous errors
        } catch (err) {
            setError(err.message || 'An error occurred while fetching persons');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePersonAction = async (action, ...args) => {
        setIsLoading(true);
        try {
            await action(...args);
            fetchPersons(); // Refresh the list after any action
            setError(''); // Reset any previous errors
        } catch (err) {
            setError(err.message || `An error occurred`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PersonsView
            persons={persons}
            error={error}
            isLoading={isLoading}
            onCreatePerson={(personData) => handlePersonAction(apiModule.createPerson, personData)}
            onUpdatePerson={(id, updatedPersonData) => handlePersonAction(apiModule.updatePerson, id, updatedPersonData)}
            onDeletePerson={(id) => handlePersonAction(apiModule.deletePerson, id)}
        />
    );
};

export default PersonPresenter;
