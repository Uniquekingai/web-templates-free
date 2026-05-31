# 🌀 Oval Menu Widget — راهنمای نصب

یک منوی ستونی بیضی‌شکل با نوار رنگی متحرک هنگام hover.

---

## 📁 فایل‌ها
```
oval-menu.css   ← استایل‌ها
oval-menu.js    ← انیمیشن و منطق
index.html      ← دمو و نمونه استفاده
```

---

## 🚀 نصب (۳ قدم)

### قدم ۱ — فایل‌ها را آپلود کنید
فایل‌های `oval-menu.css` و `oval-menu.js` را به پوشه تم یا پلاگین وردپرس خود آپلود کنید.

### قدم ۲ — لینک دهید
در `<head>` سایت:
```html
<link rel="stylesheet" href="oval-menu.css">
```

قبل از `</body>`:
```html
<script src="oval-menu.js"></script>
```

### قدم ۳ — HTML منو را جای‌گذاری کنید
```html
<nav class="om-sidebar">

  <div class="om-item is-active" data-page="خانه" data-palette="0">
    <div class="om-pill">
      <canvas></canvas>
      <span class="om-icon">🏠</span>
      <span class="om-label">خانه</span>
      <span class="om-dot"></span>
    </div>
  </div>

  <!-- بقیه آیتم‌ها... -->

</nav>
```

---

## 🎨 تغییر رنگ
هر آیتم یک `data-palette` دارد (0 تا 7):

| شماره | رنگ‌ها |
|-------|--------|
| 0 | قرمز / نارنجی / طلایی / سبز |
| 1 | آبی روشن / آبی / بنفش / صورتی |
| 2 | نارنجی / زرد / قرمز / فوشیا |
| 3 | سیانو / آبی / بنفش / صورتی |
| 4 | سبز / فیروزه / آبی |
| 5 | صورتی / زرد / نارنجی |
| 6 | بنفش / رز / صورتی |
| 7 | زرد-سبز / سبز / آبی |

---

## ⚙️ تنظیمات CSS
```css
:root {
  --om-pill-w:   230px;   /* عرض بیضی */
  --om-pill-h:   54px;    /* ارتفاع بیضی */
  --om-gap:      12px;    /* فاصله بین آیتم‌ها */
  --om-speed:    0.03;    /* سرعت چرخش (عدد بیشتر = سریع‌تر) */
  --om-border-w: 2.5px;   /* ضخامت نوار رنگی */
}
```

---

## 🔔 Badge (اعلان)
برای نشان دادن تعداد یا برچسب:
```html
<span class="om-badge">۵</span>
<span class="om-badge">New</span>
```

---

## 📡 رویداد JavaScript
وقتی آیتمی کلیک می‌شود، رویداد `om:select` فایر می‌شه:
```javascript
document.querySelector('.om-sidebar').addEventListener('om:select', e => {
  console.log(e.detail.page);  // نام صفحه
  console.log(e.detail.item);  // المان DOM
});
```

---

## 🎯 وردپرس
در `functions.php` تم:
```php
function enqueue_oval_menu() {
    wp_enqueue_style('oval-menu', get_template_directory_uri() . '/oval-menu.css');
    wp_enqueue_script('oval-menu', get_template_directory_uri() . '/oval-menu.js', [], null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_oval_menu');
```
