import { adminservices } from "../model/adminservices.js";
import { api } from "../services/api.js";
import { Validation } from "../model/validation.js";

const validation = new Validation();

// const tenSP = document.getElementById("tenSP");
// console.log("tenSP: ", tenSP.value);

// const isTenSPValid = validation.required(tenSP.value, "idError");
// console.log("isTenSPValid: ", isTenSPValid);

let isEditMode = false;
let editingProductId = null;

// Hàm render bảng sản phẩm
const renderTable = (arr) => {
  const htmlContent = arr
    .map(
      (item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.tenSP}</td>
      <td>${item.giaSP}</td>
      <td>${item.screenSP}</td>
      <td>${item.backcameraSP}</td>
      <td>${item.frontcameraSP}</td>
      <td><img width="100" height="100" src="${item.imgSP}"/></td>
      <td>${item.descSP}</td>
      <td>${item.typeSP}</td>
      <td>
        <button class="btn px-4 py-2 bg-green-500 rounded-xl" onclick="editProduct('${
          item.id
        }')">Edit</button>
        <button class="btndelete px-4 py-2 bg-red-500 rounded-xl" onclick="deleteProduct('${
          item.id
        }')">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");

  document.getElementById("tblDanhSachSP").innerHTML = htmlContent;
};

// Hàm lấy danh sách sản phẩm từ API
const getProducts = async () => {
  try {
    const response = await api.getProductList();
    renderTable(response.data);
  } catch (error) {
    alert("Không thể lấy danh sách sản phẩm. Vui lòng thử lại sau.");
    console.error("Error fetching products: ", error);
  }
};

// Hàm lấy thông tin sản phẩm từ form
const layThongTinSanPham = () => {
  const elements = document.querySelectorAll("#formSP input, #formSP select");
  const sp = {};

  elements.forEach((ele) => {
    sp[ele.id] = ele.value;
  });

  return new adminservices(
    sp.tenSP,
    sp.giaSP,
    sp.screenSP,
    sp.backcameraSP,
    sp.frontcameraSP,
    sp.imgSP,
    sp.descSP,
    sp.typeSP
  );
};

// Hàm xử lý sự kiện khi mở modal
document.getElementById("openModal").onclick = () => {
  const form = document.getElementById("formSP");
  form.reset();
  isEditMode = false;
  document.getElementById("btnCapNhatSP").style.display = "none";
  document.getElementById("btnthemSP").style.display = "inline-block";
  document.getElementById("tenSP").disabled = false;
};

// Hàm xử lý sự kiện submit form
document.getElementById("formSP").onsubmit = async (ev) => {
  ev.preventDefault();

  const sp = layThongTinSanPham();

  let isValid = true;
  //kiểm tra có nhập không
  //value và errorID bên valid và div  trong html
  // tài khoản phải nhập trên < 8 và > 20 kí tự , có thể bao gồm số
  isValid &= validation.checkTenSP(sp.tenSP, "invalidtenSP");
  isValid &= validation.checkGia(sp.giaSP, "invalidgiaSP");
  isValid &= validation.checkScreen(sp.screenSP, "invalidscreenSP");
  isValid &= validation.checkBackCamera(sp.backcameraSP, "invalidbackcameraSP");
  isValid &= validation.checkFrontCamera(
    sp.frontcameraSP,
    "invalidfrontcameraSP"
  );
  isValid &= validation.checkImage(sp.imgSP, "invalidimgSP");
  isValid &= validation.checkDesc(sp.descSP, "invaliddescSP");
  isValid &= validation.checkType(sp.typeSP, "invalidtypeSP");
  if (!isValid) return;
  try {
    if (isEditMode) {
      console.log("editingProductId", editingProductId);
      await api.editProduct(editingProductId, sp);
    } else {
      await api.addProduct(sp);
    }
    getProducts();
    document.getElementById("exampleModal").classList.add("hidden");
  } catch (error) {
    alert("Có lỗi xảy ra. Vui lòng thử lại.");
    console.error("Error saving product: ", error);
  }
};

// Hàm chỉnh sửa sản phẩm
window.editProduct = async (productId) => {
  try {
    const result = await api.getProductById(productId);
    const elements = document.querySelectorAll("#formSP input, #formSP select");

    elements.forEach((ele) => {
      ele.value = result.data[ele.id] || ""; // Đảm bảo có giá trị mặc định
    });

    //const sp = layThongTinSanPham();
    //let isValid = true;
    //kiểm tra có nhập không
    //value và errorID bên valid và div  trong html
    // tài khoản phải nhập trên < 8 và > 20 kí tự , có thể bao gồm số
    // isValid &= validation.checkTenSP(sp.tenSP, "invalidtenSP");
    // isValid &= validation.checkGia(sp.giaSP, "invalidgiaSP");
    // isValid &= validation.checkScreen(sp.screenSP, "invalidscreenSP");
    // isValid &= validation.checkBackCamera(sp.backcameraSP, "invalidbackcameraSP");
    // isValid &= validation.checkFrontCamera(
    //   sp.frontcameraSP,
    //   "invalidfrontcameraSP"
    // );
    // isValid &= validation.checkImage(sp.imgSP, "invalidimgSP");
    // isValid &= validation.checkDesc(sp.descSP, "invaliddescSP");
    // isValid &= validation.checkType(sp.typeSP, "invalidtypeSP");
    // if (!isValid) return;

    isEditMode = true;
    editingProductId = productId;
    document.getElementById("btnCapNhatSP").style.display = "inline-block";
    document.getElementById("btnthemSP").style.display = "none";
    document.getElementById("exampleModal").classList.remove("hidden");
  } catch (error) {
    alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại.");
    console.error("Error fetching product for edit: ", error);
  }
};

// Gán sự kiện cho nút cập nhật
document.getElementById("btnCapNhatSP").onclick = async () => {
  const sp = layThongTinSanPham();
  try {
    await api.editProduct(editingProductId, sp);
    getProducts();
    document.getElementById("exampleModal").classList.add("hidden");
  } catch (error) {
    alert("Có lỗi xảy ra. Vui lòng thử lại.");
    console.error("Error updating product: ", error);
  }
};

// Hàm xóa sản phẩm
window.deleteProduct = async (productId) => {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    try {
      await api.deleteProduct(productId);
      getProducts();
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
      console.error("Error deleting product: ", error);
    }
  }
};

// Hàm lọc sản phẩm theo giá
window.locGiaSP = async () => {
  const sort = document.getElementById("locGiaSP").value;

  const sapXepSanPham = (data, tangDan = true) => {
    return data.sort((a, b) => {
      return tangDan
        ? parseFloat(a.giaSP) - parseFloat(b.giaSP)
        : parseFloat(b.giaSP) - parseFloat(a.giaSP);
    });
  };

  try {
    const result = await api.getProductList();
    const danhSachSapXep = sapXepSanPham(result.data, sort === "nhoDenLon");
    renderTable(danhSachSapXep);
  } catch (error) {
    console.error("Error sorting products: ", error);
  }
};

// Hàm tìm kiếm sản phẩm
const searchSP = async () => {
  const valueSearchInput = document.getElementById("timKiemSP").value;

  try {
    const response = await api.getProductList();
    const productList = response.data;

    const nameSearch = productList.filter((sanpham) =>
      sanpham.tenSP.toUpperCase().includes(valueSearchInput.toUpperCase())
    );

    renderTable(nameSearch);
  } catch (error) {
    alert("Có lỗi xảy ra trong quá trình tìm kiếm.");
    console.error("Error searching products: ", error);
  }
};
document.getElementById("timKiemSP").oninput = searchSP;
// Khởi chạy hàm lấy danh sách sản phẩm khi tải trang
getProducts();
