import axios from 'axios';

export async function searchBooks(query) {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URL}/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`
    );
  } catch (err) {
    console.log(err);
  }
}
