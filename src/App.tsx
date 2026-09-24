import { useState, type FormEvent } from 'react';
import { useBooks } from './hooks/useBooks';
import { useSearchHistory } from './hooks/useSearchHistory';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  const { books, loading, error, searchBooks } = useBooks();
  const { history, addTerm } = useSearchHistory();

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setSelectedTerm(searchTerm);
    searchBooks(searchTerm);
    addTerm(searchTerm);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '25px' }}>
        <span style={{ color: '#c084fc', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
          OPEN LIBRARY
        </span>
        <h1 style={{ fontSize: '28px', margin: '5px 0' }}>Buscador de libros</h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
          Escribe un título, revisa los resultados en tarjetas y conserva cada búsqueda como un chip.
        </p>
      </header>

      {/* Formulario de búsqueda */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
          Buscar libros
        </label>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="harry potter"
            style={{
              flex: 1,
              padding: '12px 16px',
              backgroundColor: '#111827',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#c084fc',
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Secciones de Búsquedas recientes (Chips) */}
      {history.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Búsquedas recientes</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {history.map((term, index) => {
              const isActive = term.toLowerCase() === selectedTerm.toLowerCase();
              return (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(term);
                    handleSearch(term);
                  }}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    border: isActive ? '1px solid #c084fc' : '1px solid #374151',
                    backgroundColor: isActive ? '#2e1065' : '#1f2937',
                    color: isActive ? '#d8b4fe' : '#e5e7eb',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  {term}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Título de Resultados */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Resultados</h2>
        {selectedTerm && (
          <span style={{ color: '#9ca3af', fontSize: '14px' }}>
            {books.length} libros para "{selectedTerm}"
          </span>
        )}
      </div>

      {/* Estados de Carga y Error */}
      {loading && <p style={{ color: '#9ca3af' }}>Cargando libros desde Open Library...</p>}
      {error && <p style={{ color: '#f87171' }}>{error}</p>}

      {/* Tarjetas de Resultados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#fff' }}>{book.title}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}