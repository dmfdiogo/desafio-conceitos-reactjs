import React, { useState, useEffect } from "react";

import "./styles.css";
import "./services/api"
import api from "./services/api";

function App() {

  // const repository = {
  //   id,
  //   title,
  //   url,
  //   techs,
  //   likes: 0,
  // };

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      "title": "Desafio ReactJS",
      "url": "qwertyu",
      "techs": [
        "yarn",
        "nodejs",
        "express"
      ]
    };

    await api.post('repositories', newRepository).then(response => {
      newRepository.id = response.data.id;
    });

    setRepositories(
      [...repositories, newRepository]
    );
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(
      repositories.filter((repository) => repository.id !== id)
    );
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
