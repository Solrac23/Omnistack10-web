import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import './components/DevItem/style.css'
import './components/DevForm/style.css'

import DevForm from './components/DevForm/index';
import DevItem from './components/DevItem/index';

// Conceito React: Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação. 
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
// Propriedade: Informações que um componente PAI passa para o componente FILHO.

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
          <DevForm onSubmmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id}  dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
