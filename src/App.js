import "./App.css";
import contactsJSON from "./contacts.json";
import { useState } from 'react';


function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0,5));

    const addRandom = () => {
    const index = Math.floor(Math.random() * contactsJSON.length);
    const randomContact = contactsJSON[index];
    contactsJSON.slice(index, 1);
    setContacts([randomContact, ...contacts]);
  };

  function sortByPopularity() {
    setContacts(contacts => {
      const copy = [...contacts];
      copy.sort((a,b) => b.popularity - a.popularity);
      console.log("Sorted copy: ", copy);
      return copy;
    });
  }

  const sortByName = () => {
    setContacts([...contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else {
        return 1;
      }
    })]);

  };

  function deleteContact(id) {
    const filteredContacts = contacts.filter(e => e.id !== id);
    setContacts(filteredContacts);
  }


  return <div className="App">
    <h1>IronContacts</h1>
    <button onClick={addRandom}>Add Random Contact</button>
    <button onClick={sortByPopularity}>Sort by popularity</button>
    <button onClick={sortByName}>Sort by name</button>
    
      <table>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won Oscar</th>
      <th>Won Emmy</th>
      <th>Actions</th>
    </tr>
    {contacts.map((contact) => {
      return (
        <tr>
          <td> <img src={contact.pictureUrl} alt="avatar"/> </td>
          <td><p>{contact.name}</p></td>
          <td><p>{contact.popularity.toFixed(2)}</p></td>
          <td>{contact.wonOscar && <p>🏆</p>}</td>
          <td>{contact.wonEmmy && <p>🏆</p>}</td>
          <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
        </tr>
      )
    })}
      </table>


  </div>;
}

export default App;