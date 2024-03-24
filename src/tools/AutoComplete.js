import React, { useState } from 'react';

const Autocomplete = ({names}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedName, setSelectedName] = useState('');
  //const names = ['John', 'Jane', 'Doe', 'Alice', 'Bob']; // Örnek isim listesi
  const filteredNames = names.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (name) => {
    setSelectedName(name);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="İsim ara..."
      />
      {false?(<span>Doğru</span>):(<span>yanlış</span>)}
      <ul className='list-group border-0'>
        {filteredNames.map((name, index) => (
          <li className='list-group-item py-0 border-0' key={index} onClick={() => handleItemClick(name)}>
            {name}
          </li>
        ))}
      </ul>
      <p>Seçilen İsim: {selectedName}</p>
    </div>
  );
};

export default Autocomplete;
