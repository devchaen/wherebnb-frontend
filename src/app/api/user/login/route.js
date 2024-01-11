export async function POST(request) {
  const { email, password } = await request.json();
  const mockUsers = [
    {
      name: "test user",
      email: "user@example.com",
      password: "1234",
      accessToken: "jwt-token",
    },
  ];

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return new Response(
      JSON.stringify({ message: "가입된 회원 정보가 없습니다.", result: null }),
      {
        status: 400,
      }
    );
  }

  return new Response(
    JSON.stringify(
      {
        message: "로그인 성공",
        result: {
          name: "test user",
          email: "user@example.com",
          accessToken: "jwt-token",
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
  );
}
