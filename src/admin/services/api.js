const baseUrl = "https://672cb9ed1600dda5a9f9a708.mockapi.io/";

export const api = {
  //phương thức lấy tất cả dữ liệu về
  getProductList: () => {
    return axios({
      method: "GET",
      url: `${baseUrl}/capstoneJS`,
    });
  },
  //phương thức xóa id sản phẩm
  deleteProduct: (productId) => {
    return axios({
      method: "DELETE",
      url: `${baseUrl}/capstoneJS/${productId}`,
    });
  },

  // phương thức thay đổi khi edit

  //phương thức thêm sản phẩm khi nhập liệu vào form
  addProduct: (payload) => {
    return axios({
      method: "POST",
      url: `${baseUrl}/capstoneJS`,
      data: payload, // dữ liệu gửi lên sever
    });
  },

  getProductById: (productId) => {
    return axios({
      method: "GET",
      url: `${baseUrl}/capstoneJS/${productId}`,
    });
  },

  editProduct: (productId, payload) => {
    return axios({
      method: "PUT",
      url: `${baseUrl}/capstoneJS/${productId}`,
      data: payload,
    });
  },
};
