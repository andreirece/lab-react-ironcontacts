import "../App.css";
import contacts from "../contacts.json";
import { useState } from "react";

function App() {
  const [newContacts, setNewContacts] = useState(contacts.slice(0, 5));

  function handleAddClick(event) {
    const random = Math.floor(Math.random() * contacts.length);
    const randomContact = contacts[random];
    const cloneListContacts = [...newContacts];

    if (cloneListContacts.indexOf(randomContact) < 0) {
      cloneListContacts.push(randomContact);
    }
    console.log(cloneListContacts);
    setNewContacts(cloneListContacts);
  }

  function handleSortByPopularity(event) {
    const cloneListContacts = [...newContacts];

    cloneListContacts.sort(function (a, b) {
      if (a.popularity < b.popularity) {
        return 1;
      }
      if (a.popularity > b.popularity) {
        return -1;
      }
      return 0;
    });

    setNewContacts(cloneListContacts);
  }

  function handleSortByName(event) {
    const cloneListContacts = [...newContacts];

    cloneListContacts.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    setNewContacts(cloneListContacts);
  }

  function handleDelete(event) {
    const id = event.currentTarget.attributes[0].value;
    return setNewContacts([
      ...newContacts.filter((currentContact) => currentContact.id !== id),
    ]);
  }

  return (
    <div className="App">
      <table>
        <h1>
          <strong>IronContacts</strong>
        </h1>
        <div>
          <button onClick={handleAddClick}>Add Random Contact</button>
          <button onClick={handleSortByPopularity}>Sort by popularity</button>
          <button onClick={handleSortByName}>Sort by name</button>
        </div>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
        {newContacts.map((currentContact) => (
          <tr>
            <td>
              <img
                src={currentContact.pictureUrl}
                alt="personal photography"
                style={{ width: "60px" }}
              />
            </td>
            <td>{currentContact.name}</td>
            <td>{currentContact.popularity.toFixed(2)}</td>
            <td>{currentContact.wonOscar && "🏆"}</td>
            <td>{currentContact.wonEmmy && "🏆"}</td>
            <button onClick={handleDelete} dataid={currentContact.id}>
              Delete
            </button>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
