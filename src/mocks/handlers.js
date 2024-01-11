// import { http, HttpResponse } from "msw";

// export const handlers = [
//   http.post(
//     "http://localhost:8080/user/login",
//     async ({ request, params, cookies }) => {
//       const info = await request.formData();
//       console.log(info);

//       const response = HttpResponse.json({
//         name: "text user",
//         email: "user@example.com",
//         accessToken: "jwt-token",
//       });

//       console.log(response);
//       return response;
//     }
//   ),
// ];
