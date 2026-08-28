import bookLikesHandler from '../../routes/api/bookLikes.js';

export async function onRequest(context) {
  const { request, env } = context;

  try {
    // Memanggil handler dengan parameter Request dan Context Environment
    const response = await bookLikesHandler(request, env);
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
