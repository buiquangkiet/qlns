function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function phoneIsValid(phone) {
    return /^[0-9]{10,}$/.test(phone);  // Chỉ cho phép các chữ số và tối thiểu 10 ký tự
}

let editIndex = -1; // Biến lưu chỉ mục sinh viên đang chỉnh sửa

function save() {
    let fullname = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';

    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    // Các kiểm tra như trước...

    if (fullname && email && phone && address && gender) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        if (editIndex === -1) {
            // Thêm sinh viên mới
            students.push({
                fullname: fullname,
                email: email,
                phone: phone,
                address: address,
                gender: gender
            });
        } else {
            // Cập nhật sinh viên
            students[editIndex] = {
                fullname: fullname,
                email: email,
                phone: phone,
                address: address,
                gender: gender
            };
            editIndex = -1; // Reset lại sau khi chỉnh sửa xong
        }

        localStorage.setItem('students', JSON.stringify(students));
        renderListStudent();
        clearForm(); // Xóa nội dung trong form sau khi lưu
    }
}

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }

    document.getElementById('list-student').style.display = 'block';

    let tableContent = `<tr>
        <td>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Giới tính</td>
        <td>Địa chỉ</td>
        <td>Hành động</td>
    </tr>`;

    students.forEach((student, index) => {
        let genderTable = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';

        tableContent += `<tr>
            <td>${index + 1}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderTable}</td>
            <td>${student.address}</td>
            <td>
                <a href='#' onclick="editStudent(${index})">Edit</a> | 
                <a href='#' onclick="deleteStudent(${index})">Delete</a>
            </td>
        </tr>`;
    });

    document.getElementById('grid-students').innerHTML = tableContent;
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));

    // Lấy thông tin sinh viên và hiển thị lại vào các ô nhập liệu
    document.getElementById('fullName').value = students[index].fullname;
    document.getElementById('email').value = students[index].email;
    document.getElementById('phone').value = students[index].phone;
    document.getElementById('address').value = students[index].address;
    if (students[index].gender === '1') {
        document.getElementById('male').checked = true;
    } else {
        document.getElementById('female').checked = true;
    }

    editIndex = index; // Gán chỉ mục của sinh viên đang chỉnh sửa
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1); // Xóa sinh viên tại chỉ mục index
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent(); // Cập nhật danh sách sau khi xóa
}

function clearForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    editIndex = -1; // Reset lại chỉ mục chỉnh sửa sau khi xóa nội dung form
}
