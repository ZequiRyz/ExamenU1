import { useState } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

interface OpenLibraryResponse {
  docs?: OpenLibraryDoc[];
}

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      // Petición a la API de Open Library
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data: OpenLibraryResponse = await response.json();

      // Formatear los resultados y armar la URL de la portada
      const formattedBooks: Book[] = (data.docs || []).slice(0, 12).map((doc) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'Autor desconocido',
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : 'https://via.placeholder.com/150x200?text=Sin+Portada',
      }));

      setBooks(formattedBooks);
    } catch {
      setError('Error al consultar la API de Open Library');
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, searchBooks };
};