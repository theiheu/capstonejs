export class Validation {
  //check ten
  checkTenSP(value, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML = "Vui lòng nhập tên sản phẩm,không để trống!";
      element.style.display = "block";
      return false;
    }
    if (value.length < 4 || value.length > 30) {
      element.innerHTML = "Độ dài phải từ 4 đến 20 ký tự.";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
  checkGia(value, errorId) {
    const element = document.getElementById(errorId);
    const salary = parseFloat(value);
    if (value.trim() === "") {
      element.innerHTML = " Vui lòng nhập giá,không để trống!";
      element.style.display = "block";
      return false;
    }
    if (isNaN(salary) || salary < 1 || salary > 50000000) {
      element.innerHTML = "số tiền phải 1 đến 50 triệu";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  checkScreen(value, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML = "Vui lòng nhập thông tin màn hình,không để trống!";
      // element.innerHTML = "";
      element.style.display = "block";
      return false;
    }
    if (value.length < 5 || value.length > 50) {
      element.innerHTML = "Độ dài phải từ 5 đến 50 ký tự.";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
  checkBackCamera(value, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML = "Vui lòng nhập thông tin camera sau ,không để trống!";
      element.style.display = "block";
      return false;
    }
    if (value.length < 2 || value.length > 30) {
      element.innerHTML = "Độ dài phải từ 4 đến 6 ký tự.";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
  checkFrontCamera(value, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML =
        "Vui lòng nhập thông tin camera trước,không để trống!";
      element.style.display = "block";
      return false;
    }
    if (value.length < 4 || value.length > 30) {
      element.innerHTML = "Độ dài phải từ 4 đến 30 ký tự.";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
  checkImage(value, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML = "Vui lòng nhập link hình ảnh, không để trống!";
      element.style.display = "block";
      return false;
    }
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
    if (!urlPattern.test(value)) {
      element.innerHTML =
        "Link hình ảnh không hợp lệ. Vui lòng nhập link có định dạng png, jpg, jpeg, gif, hoặc svg.";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
  //
  checkDesc(value, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML = "Vui lòng nhập mô tả sản phẩm,không để trống!";
      element.style.display = "block";
      return false;
    }
    if (value.length < 10 || value.length > 100) {
      element.innerHTML = "Độ dài phải từ 10 đến 100 ký tự.";
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
  checkType(value, errorId) {
    const element = document.getElementById(errorId);

    // Kiểm tra rỗng hoặc chưa chọn (giá trị mặc định là "")
    if (value.trim() === "" || value === "Chọn loại sản phẩm") {
      element.innerHTML = "Vui lòng chọn loại hợp lệ.";
      element.style.display = "block";
      return false;
    }

    // Xếp loại hợp lệ
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
}
