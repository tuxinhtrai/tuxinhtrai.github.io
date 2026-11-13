# Code Pro Blog — GitHub Pages

Bản giao diện blog tĩnh lấy cảm hứng từ bố cục Code Pro Blog, được thiết kế lại hiện đại và tách riêng dữ liệu bài viết.

## Chạy thử
Mở `index.html` bằng trình duyệt. Để tránh hạn chế khi chạy local, có thể dùng VS Code Live Server.

## Đưa lên GitHub Pages
1. Tạo repository mới trên GitHub.
2. Upload toàn bộ nội dung thư mục này (không upload mỗi file ZIP).
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**, branch `main`, folder `/ (root)`, rồi Save.
5. Chờ GitHub cấp URL website.

## Thêm hoặc sửa bài viết
Mở `assets/js/data.js`, thêm một object vào mảng `POSTS`:

```js
{
  id: 13,
  title: "Tiêu đề bài viết",
  excerpt: "Mô tả ngắn cho bài viết.",
  category: "Code",
  date: "14/11/2026",
  read: "5 phút đọc",
  popular: false,
  image: "https://example.com/thumbnail.jpg",
  url: "https://example.com/bai-viet"
}
```

- `id`: mã duy nhất.
- `title`: tiêu đề.
- `excerpt`: mô tả.
- `category`: danh mục; dùng đúng tên để lọc chính xác.
- `image`: URL ảnh thumbnail.
- `url`: URL bài viết thật. Nếu để trống, trang sẽ mở trang chi tiết mẫu.

## Tùy chỉnh giao diện
- CSS: `assets/css/style.css`
- Hành vi, tìm kiếm, lọc, phân trang, dark mode: `assets/js/app.js`
- Nội dung bài viết: `assets/js/data.js`

## Lưu ý quan trọng
- Đây là website tĩnh. Không có CMS/admin đăng bài trực tiếp, cơ sở dữ liệu, tài khoản thành viên hoặc bình luận lưu máy chủ.
- Dữ liệu demo trong `data.js` là nội dung minh họa theo các chủ đề công khai trên trang tham khảo, không phải bản sao toàn bộ bài viết.
- Hãy thay logo, ảnh, nội dung và liên kết bằng tài sản bạn có quyền sử dụng. Không sao chép thương hiệu/tài nguyên độc quyền nếu chưa được phép.
- Để đăng bài không cần sửa code, cần kết nối CMS/API hoặc dùng Blogger làm nơi quản lý nội dung rồi đọc bài qua Blogger API.
