# 🚀 Animated Dock Menu — راهنمای نصب

منوی Dock سبک مک‌اواس با افکت بزرگ‌نمایی تدریجی هنگام hover.

---

## 📁 فایل‌ها
```
dock-menu.css   ← تمام استایل‌ها
dock-menu.js    ← انیمیشن و منطق
index.html      ← دمو کامل (Dark + Light)
```

---

## 🚀 نصب (۳ قدم)

### قدم ۱ — فایل‌ها را آپلود کنید

### قدم ۲ — لینک دهید
```html
<!-- در <head> -->
<link rel="stylesheet" href="dock-menu.css">

<!-- قبل از </body> -->
<script src="dock-menu.js"></script>
```

### قدم ۳ — HTML را کپی کنید
```html
<div class="dock-wrap">

  <div class="dock-item is-active" data-label="خانه" data-color="blue">
    <div class="dock-icon">🏠</div>
  </div>

  <div class="dock-item" data-label="پیام‌ها" data-color="green">
    <div class="dock-icon">
      ✉️
      <span class="dock-badge">5</span>  <!-- اختیاری -->
    </div>
  </div>

  <div class="dock-separator"></div>  <!-- خط جداکننده، اختیاری -->

  <!-- ... -->
</div>
```

---

## 🎨 رنگ‌های آیکون (data-color)
| مقدار | رنگ |
|-------|-----|
| `blue` | آبی |
| `green` | سبز |
| `red` | قرمز |
| `yellow` | زرد |
| `purple` | بنفش |
| `pink` | صورتی |
| `orange` | نارنجی |
| `cyan` | فیروزه‌ای |

---

## ⚙️ تنظیمات CSS Variable
```css
:root {
  --dock-item-size: 52px;   /* اندازه پایه آیکون */
  --dock-item-max:  82px;   /* اندازه حداکثر هنگام hover */
  --dock-gap:       10px;   /* فاصله بین آیکون‌ها */
  --dock-blur:      20px;   /* شدت blur شیشه‌ای */
}
```

---

## 🌗 تم روشن
```html
<div class="dock-wrap dock-light">
```

---

## 📡 رویداد JavaScript
```javascript
document.addEventListener('dock:select', e => {
  console.log(e.detail.label);  // نام آیتم
  console.log(e.detail.item);   // المان DOM
});
```

---

## 🎯 وردپرس (functions.php)
```php
function enqueue_dock_menu() {
    wp_enqueue_style('dock-menu',  get_template_directory_uri() . '/dock-menu.css');
    wp_enqueue_script('dock-menu', get_template_directory_uri() . '/dock-menu.js', [], null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_dock_menu');
```
