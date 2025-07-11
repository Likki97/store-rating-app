// src/api/auth.js
const BASE_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true, token: data.token };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
