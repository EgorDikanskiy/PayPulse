const API_BASE = 'https://pay-pulse-backend.where-pizza.ru/api';
const createApiRoute = (route: string) => `${API_BASE}${route}`;

export const apiRoutes = {
  login: createApiRoute('/auth/signin'),
  register: createApiRoute('/auth/signup'),
  curentUser: createApiRoute('/auth/current'),
  books: createApiRoute('/books'),
  profile: createApiRoute('/profile'),
  bookOnSlug: (slug: string) => createApiRoute(`/books/${slug}`),
  chapters: createApiRoute('/chapters'),
  images: createApiRoute('/images'),
  genres: createApiRoute('/genres'),
  ratings: createApiRoute('/ratings'),
  tags: createApiRoute('/tags'),
  bookmarks: createApiRoute('/bookmarks'),
};
