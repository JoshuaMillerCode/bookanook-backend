import axios from 'axios';

export async function searchBooks(query) {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URL}/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`
    );
    if (response.statusText !== 'OK') {
      throw new Error('Failed to fetch from Google Books API');
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
