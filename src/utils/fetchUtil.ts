const fetchUtil = async (options: any) => {
  try {
    const response = await fetch(options.url, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        ...(options.token && { Authorization: `Bearer ${options.token}` }), // Include token if provided
      },
      body: options.body,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse response JSON
  } catch (error: any) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
};
