import categoriesHandler from '../../routes/api/categories.js';

export async function onRequest(context) {
  const { request, env } = context;

  try {
    // Memanggil handler dengan parameter Request dan Context Environment
    const response = await categoriesHandler(request, env);
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
