const baseUrl = `https://672cb9ed1600dda5a9f9a708.mockapi.io`;

export class Service {
  getPhones = async () => {
    try {
      const res = await axios.get(`${baseUrl}/capstoneJS`);
      return res.data;
    } catch (err) {
      // Handle errors more comprehensively
      console.error("Error fetching phones:", err);
      // Optionally: return an error object or throw a custom error
    }
  };

  getPhoneById = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/capstoneJS/${id}`);
      return res.data;
    } catch (err) {
      // Handle errors more comprehensively
      console.error("Error fetching phone by ID:", err);
      // Optionally: return an error object or throw a custom error
    }
  };
}