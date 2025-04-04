import iconSearch from './icons8-search.svg'
import { useState } from 'react';
import './App.css';

function App() {

  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState(null);

  const buscarLivros = async () => {
    if (!busca) return;

    setErro(null);

    try {
      const resposta = await fetch(`https://hn.algolia.com/api/v1/search?query=${busca}`);
      const dados = await resposta.json();
      setResultados(dados.hits);
    } catch (err) {
      setErro("Erro ao buscar livros");
    }
  };

  return (
    <div className="container">
      <h1>Busca de livros</h1>
      <div className='search-container'>
        <input type="text" placeholder="Buscar livros..." value={busca}
          onChange={(e) => setBusca(e.target.value)} />
        <button onClick={buscarLivros}>
          <img src={iconSearch} alt="Search" />
        </button>
      </div>

      {erro && <p className="error">{erro}</p>}

      <div className="books-container">
        {resultados.length === 0 && !erro && busca && (
          <p className="no-results">Nenhum resultado encontrado.</p>
        )}

        {resultados.map((livro) => (
          <div key={livro.objectID} className="card">
            <h3>👤 {livro.title || "Sem título"}</h3>
            <h3>📖 {livro.author || "Autor desconhecido"}</h3>
            {livro.url && (
              <a href={livro.url} target="_blank" rel="noopener noreferrer">🔗 Ver mais</a>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
