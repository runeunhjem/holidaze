// // Example login function
// const login = async (credentials) => {
//   try {
//     // Attempt to login with provided credentials
//     // This is a placeholder, replace with your actual login logic
//     const response = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       // Assuming your API responds with an accessToken on successful login
//       useAuthStore.getState().setAccessToken(data.accessToken);
//     } else {
//       throw new Error(data.message || "Login failed");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };
