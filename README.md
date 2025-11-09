# 🌊 Orbis ICT - Product Showcase Website

![Orbis ICT](https://img.shields.io/badge/Orbis-ICT-00bcd4?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Website trưng bày sản phẩm hiện đại với thiết kế đẹp mắt, màu sắc xanh nước biển và trắng, tích hợp nhiều hiệu ứng chuyển động mượt mà.

## 📋 Mục lục
- [Tính năng](#-tính-năng)
- [Demo](#-demo)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cấu hình](#-cấu-hình)
- [Sử dụng](#-sử-dụng)
- [Công nghệ](#-công-nghệ)
- [Tùy chỉnh](#-tùy-chỉnh)
- [Browser Support](#-browser-support)
- [Liên hệ](#-liên-hệ)

## ✨ Tính năng

### 🎨 Giao diện & Thiết kế
- ✅ Màu sắc chủ đạo: Trắng (#ffffff) và Xanh nước biển (#00bcd4, #0288d1)
- ✅ Gradient động chạy liên tục
- ✅ Đổ bóng (box-shadow) mềm mại
- ✅ Hiệu ứng sóng biển ở footer
- ✅ Responsive design (Mobile, Tablet, Desktop)

### 🎬 Hiệu ứng chuyển động
- ✅ Fade in animations
- ✅ Slide animations
- ✅ Hover effects trên products
- ✅ Pulse animation cho cart badge
- ✅ Float animation
- ✅ Gradient animation
- ✅ Icon rotate 360°
- ✅ Image zoom on hover

### 📱 Chức năng

#### 🏠 Trang Home
- Slider tự động với các banner/poster khuyến mãi
- Nút điều khiển slider (prev/next/pause)
- Hiển thị sản phẩm nổi bật
- Bộ lọc và sắp xếp sản phẩm
- Phân trang linh hoạt

#### 📂 Trang Menu
- Hiển thị toàn bộ sản phẩm
- Lọc theo danh mục và loại sản phẩm
- Tìm kiếm sản phẩm
- Sắp xếp theo giá, tên
- Chọn số lượng sản phẩm hiển thị (6, 12, 24)

#### 🛒 Trang Cart
- Hiển thị sản phẩm đã thêm
- Quản lý số lượng
- Tính tổng giá tự động
- Xóa sản phẩm
- Lưu trữ giỏ hàng trong localStorage

#### 📞 Trang Contact
- Hiển thị thông tin liên hệ công ty
- Email, Website, Địa chỉ
- Các kênh mạng xã hội (Facebook, TikTok, Zalo, Instagram, Telegram, Threads)

#### 📄 Trang Chi tiết sản phẩm
- Hình ảnh sản phẩm
- Giá gốc và giá khuyến mãi
- Mô tả chi tiết
- Thông tin công ty
- Link xem preview
- Sản phẩm cùng loại

### 🔔 Thông báo
- Toast notifications với Toastify
- Thông báo khi thêm/xóa sản phẩm
- Thông báo khi tìm kiếm

## 📁 Cấu trúc thư mục
```
orbis-ict-website/
│
├── index.html              # File HTML chính
│
├── assets/                # Thư mục chứa assets
│   ├── images/            # Hình ảnh
│   ├── css/               # Chứa các file CSS với tất cả styles
│   ├── data/              # Chứa các file JSON với dữ liệu mẫu
│   └── js/                # Chứa các file JavaScript
│
└── README.md              # File hướng dẫn
```

## ⚙️ Cấu hình

### 1. Cấu hình sản phẩm (`product.json`)

```json
[
  {
    "id": "SP1",
    "name": "Tên sản phẩm",
    "description": "Mô tả sản phẩm",
    "price": 1000,
    "sale-price": 500,
    "unit": "₫",
    "link": "https://link-preview.com",
    "image": "https://link-to-image.jpg",
    "category": {
      "name": "Website",
      "sub": "Portfolio/Workfolio"
    },
    "company": "Orbis ICT"
  }
]
```

### 2. Cấu hình danh mục (`category.json`)

```json
[
  {
    "name": "Website",
    "sub": [
      {"name": "Portfolio/Workfolio"},
      {"name": "QC"},
      {"name": "Trưng bày sản phẩm"}
    ]
  }
]
```

### 3. Cấu hình thông tin công ty (`company-info.json`)

```json
[
  {
    "name": "Orbis ICT",
    "slogan": "Bạn cần gì chúng tôi có đó !",
    "address": "Ho Chi Minh City",
    "email": "orbisict@gmail.com",
    "website": "https://orbisict.id.vn",
    "social-media": {
      "facebook-group": "https://www.facebook.com/orbisict",
      "fanpage": "https://twitter.com/orbisict",
      "instagram": "https://www.instagram.com/orbisict",
      "telegram": "https://t.me/orbisict",
      "tiktok": "https://www.tiktok.com/orbisict",
      "threads": "https://www.threads.net/orbisict",
      "zalo": "https://zalo.me/orbisict"
    },
    "logo-url": "https://orbisict.id.vn/logo.png"
  }
]
```

### 4. Cấu hình slider/banner (`media.json`)

```json
[
  {
    "image": "https://link-to-banner-1.jpg",
    "link": "https://orbisict.id.vn"
  },
  {
    "image": "https://link-to-banner-2.jpg",
    "link": "https://orbisict.id.vn"
  }
]
```

## 📖 Sử dụng

### Thêm sản phẩm mới

1. Mở file `product.json`
2. Thêm object sản phẩm mới theo format:

```json
{
  "id": "SP_NEW",
  "name": "Sản phẩm mới",
  "description": "Mô tả",
  "price": 2000,
  "sale-price": 1500,
  "unit": "₫",
  "link": "https://preview-link.com",
  "image": "https://image-link.jpg",
  "category": {
    "name": "Danh mục",
    "sub": "Loại"
  },
  "company": "Orbis ICT"
}
```

### Thêm danh mục mới

1. Mở file `category.json`
2. Thêm danh mục mới:

```json
{
  "name": "Danh mục mới",
  "sub": [
    {"name": "Loại 1"},
    {"name": "Loại 2"}
  ]
}
```

### Thêm banner/slider

1. Mở file `media.json`
2. Thêm banner mới:

```json
{
  "image": "https://new-banner.jpg",
  "link": "https://destination-link.com"
}
```

### Cập nhật thông tin công ty

1. Mở file `company-info.json`
2. Chỉnh sửa các thông tin cần thiết
3. Lưu file và refresh trang

## 🛠️ Công nghệ

### Frontend
- **HTML5** - Cấu trúc trang web
- **CSS3** - Styling và animations
- **JavaScript (ES6+)** - Logic và tương tác

### Libraries
- **Font Awesome 6.4.0** - Icons
- **Toastify JS 1.12.0** - Toast notifications

### Features
- **Fetch API** - Load dữ liệu JSON
- **LocalStorage** - Lưu trữ giỏ hàng
- **CSS Animations** - Hiệu ứng chuyển động
- **CSS Grid & Flexbox** - Layout responsive

## 🎨 Tùy chỉnh

### Thay đổi màu sắc

Mở file `style.css` và chỉnh sửa CSS variables:

```css
:root {
    --primary-color: #00bcd4;        /* Màu chính */
    --primary-dark: #0097a7;         /* Màu tối */
    --primary-light: #b2ebf2;        /* Màu sáng */
    --secondary-color: #0288d1;      /* Màu phụ */
    --accent-color: #26c6da;         /* Màu nhấn */
    --text-dark: #263238;            /* Màu chữ tối */
    --text-light: #546e7a;           /* Màu chữ sáng */
    --bg-light: #ffffff;             /* Nền sáng */
    --bg-gray: #f5f9fa;              /* Nền xám */
}
```

### Thay đổi tốc độ animation

```css
:root {
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Thay đổi thời gian slider

Mở file `main.js` và tìm dòng:

```javascript
function startSlider() {
    sliderInterval = setInterval(() => {
        if (!sliderPaused) {
            currentSlide = (currentSlide + 1) % mediaData.length;
            goToSlide(currentSlide);
        }
    }, 5000); // Đổi 5000 thành giá trị mong muốn (milliseconds)
}
```

### Thay đổi số sản phẩm mặc định

Mở file `main.js`:

```javascript
let itemsPerPage = { home: 6, menu: 12 }; // Thay đổi số này
```

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ ✅ |
| Firefox | 88+ ✅ |
| Safari | 14+ ✅ |
| Edge | 90+ ✅ |
| Opera | 76+ ✅ |

## 📱 Responsive Breakpoints

| Device | Breakpoint |
|--------|-----------|
| Mobile | < 768px |
| Tablet | 768px - 1024px |
| Desktop | > 1024px |

## 🚀 Performance

### Tối ưu hóa
- ✅ Lazy loading cho images
- ✅ CSS animations sử dụng GPU acceleration
- ✅ Minified CSS và JS (khi deploy)
- ✅ Optimized images
- ✅ LocalStorage caching

### Best Practices
- ✅ Semantic HTML
- ✅ Accessible (ARIA labels)
- ✅ SEO friendly
- ✅ Clean code structure
- ✅ Commented code

## 🐛 Troubleshooting

### Không load được dữ liệu JSON
**Giải pháp:**
- Kiểm tra đường dẫn file JSON
- Sử dụng local server thay vì mở trực tiếp file
- Kiểm tra console để xem error message

### Slider không chạy
**Giải pháp:**
- Kiểm tra file `media.json` có đúng format
- Đảm bảo có ít nhất 2 images
- Kiểm tra console log

### Giỏ hàng bị mất
**Giải pháp:**
- Giỏ hàng được lưu trong localStorage
- Không xóa browser data/cache
- Kiểm tra localStorage trong DevTools

### CSS không load
**Giải pháp:**
- Kiểm tra đường dẫn `<link>` trong HTML
- Clear browser cache
- Đảm bảo file `style.css` cùng thư mục với `index.html`

## 📝 Changelog

### Version 1.0.0 (2024-11-10)
- ✅ Initial release
- ✅ Full responsive design
- ✅ Product showcase with filtering
- ✅ Shopping cart functionality
- ✅ Slider with controls
- ✅ Contact page
- ✅ Product detail page
- ✅ Toast notifications

## 🤝 Contributing

Contributions, issues và feature requests đều được hoan nghênh!

1. Fork project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 Orbis ICT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Orbis ICT - IT Team**

- Website: [https://orbisict.id.vn](https://orbisict.id.vn)
- Email: orbisict@gmail.com
- Facebook: [@orbisict](https://www.facebook.com/orbisict)
- TikTok: [@orbisict](https://www.tiktok.com/orbisict)

## 📞 Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:

- 📧 Email: orbisict@gmail.com
- 🌐 Website: https://orbisict.id.vn
- 💬 Zalo: https://zalo.me/orbisict
- 📱 Facebook: https://www.facebook.com/orbisict

## 🌟 Support

Nếu project này hữu ích, hãy cho chúng tôi một ⭐️ trên GitHub!

---

Made with ❤️ by [Orbis ICT](https://orbisict.id.vn)

**Slogan:** *Where Technology Unites the World.* 🚀