# Góc nhỏ — Personal Blog

Blog cá nhân dạng static, chạy trực tiếp trên GitHub Pages. Không cần backend, database hay bước build.

## Tính năng

- Responsive, giao diện tối giản.
- Chỉnh sửa tiêu đề, giới thiệu, nội dung các vùng trực tiếp trên trang.
- Kéo thả các khối Hero / About / Posts / Gallery / Social để đổi thứ tự.
- Thêm, sửa, xóa bài viết bằng giao diện quản trị cục bộ.
- Nội dung bài viết viết bằng Markdown; hỗ trợ code block và syntax highlighting.
- Lưu dữ liệu trong `localStorage`; xuất/nhập JSON để sao lưu và chuyển trình duyệt.
- Bài viết có URL dạng `#/post/ten-bai-viet`, phù hợp với GitHub Pages.

## Chạy thử

Cách nhanh: mở `index.html` bằng trình duyệt. Nếu trình duyệt hạn chế một số tài nguyên khi mở file trực tiếp, chạy local server:

```bash
# Python (nếu đã cài)
python -m http.server 8000
```

Sau đó truy cập http://localhost:8000.

## Chỉnh sửa nội dung

1. Bấm **Chỉnh sửa** ở góc trên.
2. Bấm vào các dòng có viền nét đứt để sửa trực tiếp.
3. Kéo thả từng khối để sắp xếp lại.
4. Bấm **+ Thêm bài viết** để tạo bài mới. Nội dung hỗ trợ Markdown.
5. Bấm **Xuất dữ liệu** để tải `personal-blog-data.json` về sao lưu.
6. Muốn khôi phục trên máy khác, bật Chỉnh sửa → **Nhập dữ liệu** → chọn file JSON.

**Lưu ý quan trọng:** dữ liệu chỉnh sửa chỉ nằm trong localStorage của trình duyệt đang dùng. Người khác truy cập website sẽ thấy nội dung mặc định trong mã nguồn, không tự động thấy các chỉnh sửa của bạn. GitHub Pages là hosting tĩnh, không có chức năng ghi ngược nội dung lên repository. Muốn công khai nội dung mới, bạn cần cập nhật `defaultData` trong `app.js` hoặc dùng một quy trình xuất JSON rồi đồng bộ JSON vào mã nguồn. Không nhập dữ liệu từ nguồn không đáng tin cậy.

## Đưa lên GitHub Pages

1. Đăng nhập GitHub, tạo repository mới, ví dụ `personal-blog`.
2. Giải nén dự án và tải toàn bộ nội dung thư mục lên repository. `index.html` phải nằm ở thư mục gốc (root).
3. Mở repository → **Settings** → **Pages**.
4. Trong **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn branch `main`, folder `/ (root)`, sau đó bấm **Save**.
6. Đợi GitHub triển khai. Địa chỉ thường có dạng `https://TEN-USER.github.io/personal-blog/`.
7. Mỗi lần cập nhật file và push lên branch `main`, GitHub Pages sẽ tự triển khai lại.

Nếu dùng repository có tên `TEN-USER.github.io`, URL sẽ là `https://TEN-USER.github.io/`.

## Cấu trúc

```text
personal-blog/
├── index.html
├── styles.css
├── app.js
├── README.md
└── posts/
    └── sample.md
```

Các bài mẫu hiện được nhúng trong `defaultData.posts` của `app.js` để website chạy ngay, không cần fetch file Markdown. Thư mục `posts/` là nơi bạn có thể lưu bản Markdown gốc để quản lý bằng Git; nếu muốn website tự đọc các file trong thư mục này, cần thêm danh sách bài viết hoặc một bước build tạo JSON.

## Ghi chú kỹ thuật

- Tailwind CSS dùng CDN để đơn giản hóa việc triển khai; với dự án lớn hoặc cần tối ưu tải trang, nên build Tailwind trước khi deploy.
- Marked và Highlight.js được tải từ CDN. Website cần internet để tải các thư viện và font ngoài.
- Ảnh demo dùng Unsplash URL; thay bằng ảnh của bạn hoặc lưu ảnh trong repository để chủ động hơn.
