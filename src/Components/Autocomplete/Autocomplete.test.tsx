import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './Autocomplete';

afterEach(() => {
  jest.clearAllMocks();
});

test('renders loading when is fetching', async () => {
  const { getByPlaceholderText, getByText } = render(<Autocomplete />);
  const input = getByPlaceholderText('Type name of a post...');

  userEvent.type(input, 'Test');
  await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());
});

it('displays error message if data fetching fails', async () => {
  jest
    .spyOn(global, 'fetch')
    .mockRejectedValueOnce(new Error('Failed to fetch'));
  const { getByPlaceholderText, getByText } = render(<Autocomplete />);
  const input = getByPlaceholderText('Type name of a post...');
  userEvent.type(input, 'qui');

  await waitFor(() => {
    expect(getByText('Error while fetching data.')).toBeInTheDocument();
  });
});

test('displays "No results" when no suggestions found', async () => {
  const { getByPlaceholderText, getByText } = render(<Autocomplete />);
  const input = getByPlaceholderText('Type name of a post...');

  userEvent.type(input, 'Non-existent post');
  await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());

  await waitFor(() => expect(getByText('No results')).toBeInTheDocument());
});

test('displays suggestions when fetched successfully', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce(
    Promise.resolve({
      ok: true,
      json: async () => [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ],
    } as Response)
  );

  const { getByPlaceholderText, getAllByText } = render(<Autocomplete />);
  const input = getByPlaceholderText('Type name of a post...');
  userEvent.type(input, 'Post');

  await waitFor(() => expect(getAllByText('Post').length).toBe(2));
});
