import '@testing-library/jest-dom';

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => [
    { id: 1, title: 'Test Post 1' },
    { id: 2, title: 'Test Post 2' },
  ],
});
