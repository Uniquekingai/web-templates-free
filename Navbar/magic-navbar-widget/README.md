# ✨ Magic Navigation Bar — Widget

A floating animated navigation bar inspired by the macOS / Magic Nav style.
Active item floats up, label pill appears, particles orbit, glowing indicator slides above the bar.

---

یک منوی ناوبری متحرک با افکت بالا‌آمدن آیکون فعال، برچسب متحرک، ذرات و نقطه درخشان.

---

## 📁 Files / فایل‌ها

```
magic-navbar.css   ← All styles / تمام استایل‌ها
magic-navbar.js    ← Animation logic / منطق انیمیشن
index.html         ← Full demo (3 themes) / دمو کامل با ۳ تم
```

---

## 🚀 Installation / نصب

### Step 1 — Upload files / آپلود فایل‌ها
Upload `magic-navbar.css` and `magic-navbar.js` to your theme or plugin folder.

### Step 2 — Link them / لینک دادن

```html
<!-- In <head> / در <head> -->
<link rel="stylesheet" href="magic-navbar.css">

<!-- Before </body> / قبل از </body> -->
<script src="magic-navbar.js"></script>
```

### Step 3 — Add the HTML / اضافه کردن HTML

```html
<nav class="mnb-wrap">

  <div class="mnb-item is-active" data-label="HOME">
    <div class="mnb-icon">🏠</div>
  </div>

  <div class="mnb-item" data-label="PROFILE">
    <div class="mnb-icon">👤</div>
  </div>

  <div class="mnb-item" data-label="SETTINGS">
    <div class="mnb-icon">⚙️</div>
  </div>

</nav>
```

---

## 🎨 Color Themes / تم‌های رنگی

Add `data-theme` to `mnb-wrap`:

| Value | Color / رنگ |
|-------|-------------|
| *(none)* | Green / سبز (default) |
| `blue` | Blue / آبی |
| `purple` | Purple / بنفش |
| `pink` | Pink / صورتی |
| `orange` | Orange / نارنجی |
| `white` | Light mode / تم روشن |

```html
<nav class="mnb-wrap" data-theme="blue">
```

---

## ⚙️ CSS Variables / متغیرهای CSS

```css
:root {
  --mnb-width:         420px;   /* navbar width / عرض منو */
  --mnb-height:        72px;    /* navbar height / ارتفاع */
  --mnb-float-y:       -14px;   /* float distance up / ارتفاع بالا‌آمدن */
  --mnb-active-color:  #00e676; /* accent color / رنگ اکسنت */
  --mnb-bg:            #1e1e2e; /* background / پس‌زمینه */
}
```

---

## 📡 JavaScript Event / رویداد JS

Fires when an item is clicked:

```javascript
document.addEventListener('mnb:select', e => {
  console.log(e.detail.label); // item label / نام آیتم
  console.log(e.detail.item);  // DOM element / المان
});
```

---

## 🎯 WordPress Integration / وردپرس

In your theme's `functions.php`:

```php
function enqueue_magic_navbar() {
    wp_enqueue_style(
        'magic-navbar',
        get_template_directory_uri() . '/magic-navbar.css'
    );
    wp_enqueue_script(
        'magic-navbar',
        get_template_directory_uri() . '/magic-navbar.js',
        [], null, true
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_magic_navbar' );
```

---

## 🧩 Item Attributes / ویژگی‌های آیتم

| Attribute | Purpose |
|-----------|---------|
| `data-label="HOME"` | Text shown in label pill / متن برچسب |
| `class="is-active"` | Set default active item / آیتم پیش‌فرض |

---

## 📐 Responsive Tip / نکته ریسپانسیو

```css
@media (max-width: 480px) {
  .mnb-wrap {
    --mnb-width:      100%;
    --mnb-height:     64px;
    --mnb-float-y:    -12px;
    border-radius:    0;
  }
}
```
