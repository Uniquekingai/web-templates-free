<div dir="rtl">

# ناوبار شیشه‌ای مایع | Glass Style Navbar

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![UniqueKingAI](https://img.shields.io/badge/by-UniqueKingAI-ff6b9d?style=flat-square)](https://uniquekingai.com)

</div>

---

## 🇮🇷 فارسی

یک کامپوننت **ناوبار شیشه‌ای (Glassmorphism)** زیبا و انیمیشن‌دار، ساخته‌شده با HTML خالص، CSS و JavaScript — بدون نیاز به هیچ فریم‌ورک یا کتابخانه خارجی.

### ✨ ویژگی‌ها

- 🌊 **افکت شیشه مایع** — پس‌زمینه مات (Backdrop Blur) با حاشیه شفاف
- 💊 **پیل متحرک** — انیمیشن روان با اسپرینگ cubic-bezier
- ✨ **درخشش گلر** — افکت براق‌شدن تکرارشونده روی ناوبار
- 🌈 **پس‌زمینه Mesh Gradient** — سه blob رنگی با انیمیشن شناور
- 🌙 **حالت تاریک / روشن** — تغییر تم با یک کلیک
- 💬 **تولتیپ** — راهنمای متنی برای هر آیتم ناوبار
- 📱 **ریسپانسیو** — سازگار با تمام اندازه‌های صفحه
- ⚡ **صفر وابستگی** — فقط یک فایل HTML

### 🚀 نحوه استفاده

```bash
git clone https://github.com/uniquekingai/glass-navbar.git
cd glass-navbar
# فایل index.html را مستقیماً در مرورگر باز کنید
open index.html
```

### 🎨 شخصی‌سازی

متغیرهای CSS در بالای فایل برای تغییر آسان رنگ‌ها و استایل‌ها:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.18);   /* پس‌زمینه شیشه */
  --glass-border: rgba(255, 255, 255, 0.35); /* حاشیه */
  --pill-bg: rgba(255, 255, 255, 0.85);    /* پیل فعال */
  --accent: #ff6b9d;                        /* رنگ تأکید */
}
```

برای اضافه کردن آیتم جدید:

```html
<div class="nav-item" data-tooltip="توضیح آیتم" data-index="4">
  <!-- آیکون SVG -->
  متن آیتم
</div>
```

---

## 🇬🇧 English

A beautiful, animated **Glassmorphism Navbar** built with pure HTML, CSS, and JavaScript — zero frameworks, zero dependencies.

### ✨ Features

- 🌊 **Liquid Glass Effect** — Backdrop blur with translucent border
- 💊 **Animated Active Pill** — Smooth spring animation with cubic-bezier easing
- ✨ **Glare Shimmer** — Repeating light-sweep animation across the nav
- 🌈 **Mesh Gradient Background** — Three floating color blobs with drift animation
- 🌙 **Dark / Light Mode** — One-click theme toggle
- 💬 **Tooltips** — Contextual hint for each nav item
- 📱 **Responsive** — Works on all screen sizes
- ⚡ **Zero Dependencies** — Single HTML file

### 🚀 Getting Started

```bash
git clone https://github.com/uniquekingai/glass-navbar.git
cd glass-navbar
open index.html   # or just double-click the file
```

### 📁 Project Structure

```
glass-navbar/
├── index.html      # Main component (HTML + CSS + JS in one file)
└── README.md       # This file
```

### 🎨 Customization

Edit CSS variables at the top of the file:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.18);    /* Glass background */
  --glass-border: rgba(255, 255, 255, 0.35); /* Border opacity */
  --pill-bg: rgba(255, 255, 255, 0.85);     /* Active pill */
  --accent: #ff6b9d;                         /* Accent color */
}
```

To add a new nav item:

```html
<div class="nav-item" data-tooltip="My Item" data-index="4">
  <!-- SVG icon here -->
  Label
</div>
```

### 🛠 How It Works

| Technique | Implementation |
|-----------|----------------|
| Glass blur | `backdrop-filter: blur(24px) saturate(180%)` |
| Pill tracking | JavaScript `getBoundingClientRect()` |
| Spring bounce | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Glare sweep | CSS `@keyframes` + `skewX` transform |
| Blob drift | CSS `@keyframes drift` with translate + scale |

### 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 76+ | ✅ Full |
| Firefox 103+ | ✅ Full |
| Safari 14+ | ✅ Full (with -webkit-) |
| Edge 79+ | ✅ Full |

---

## 📄 License

MIT © [UniqueKingAI](https://uniquekingai.com)

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://uniquekingai.com">UniqueKingAI</a></sub>
</div>
