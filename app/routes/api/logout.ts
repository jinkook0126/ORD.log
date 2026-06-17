export async function action() {
  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': [
        `accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax ${
          process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`,
      ].join(', '),
    },
  });
}
