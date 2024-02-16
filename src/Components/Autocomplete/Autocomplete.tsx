import React, { useCallback, useEffect, useState } from 'react';
import './Autocomplete.css';

interface Post {
  id: number;
  title: string;
}

export const Autocomplete: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filterPosts = useCallback(
    async (posts: Post[]): Promise<Post[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(text.toLowerCase())
          );
          resolve(filteredPosts);
        }, 300);
      });
    },
    [text]
  );

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const posts: Post[] = await response.json();
      const filteredPosts: Post[] = await filterPosts(posts);
      setSuggestions(text ? filteredPosts : []);
    } catch (error) {
      console.error(error);
      setError('Error while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [text, filterPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = (post: Post) => {
    setText(post.title);
  };

  return (
    <div className='autocomplete'>
      <input
        type='text'
        value={text}
        onChange={handleChange}
        placeholder='Type name of a post...'
      />
      <div className='autocomplete-suggestion'>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {suggestions.length > 0 && !loading && (
          <ul className='autocomplete-suggestion-list'>
            {suggestions.map((post) => (
              <li
                key={post.id}
                className='autocomplete-suggestion-item'
                onClick={() => handleClick(post)}
              >
                {/* Highlight matching part of text */}
                {post.title.toLowerCase().includes(text.toLowerCase()) ? (
                  <>
                    {post.title.substring(
                      0,
                      post.title.toLowerCase().indexOf(text.toLowerCase())
                    )}
                    <strong>{text}</strong>
                    {post.title.substring(
                      post.title.toLowerCase().indexOf(text.toLowerCase()) +
                        text.length
                    )}
                  </>
                ) : (
                  post.title
                )}
              </li>
            ))}
          </ul>
        )}
        {suggestions.length === 0 && text.length > 0 && !loading && !error && (
          <p>No results</p>
        )}
      </div>
    </div>
  );
};
