export const signup = async (userData) => {
  try {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Signup failed');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const otherRequest = () => {};
