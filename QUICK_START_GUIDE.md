# Quick Start & Troubleshooting Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Visit
Open `http://localhost:3000` in your browser

---

## ✨ What You'll See

- **Modern Navigation** at the top with your logo
- **Theme Toggle** (sun/moon icon) in the top-right
- **Infinite Marquee** showing your hobbies (Art, Music, Stories, Coding, Gaming)
- **Smooth transitions** when you toggle between light and dark modes
- **Mobile hamburger menu** on smaller screens

---

## 🎨 Quick Customization

### Change Colors
Edit `src/app/global.css`:
```css
--primary: 263 70% 50%;  /* Change this line */
```

### Change Marquee Items
Edit `src/components/Marquee.tsx`:
```javascript
const items = ["🎨 Art", "🎵 Music", ...];  // Modify this array
```

### Change Default Theme
Edit `src/app/layout.tsx`:
```tsx
defaultTheme="light"  // "dark" or "light"
```

### Change Marquee Speed
Edit `src/components/Marquee.tsx` CSS:
```css
animation: scroll-left 25s linear infinite;  /* Change 25s */
```

---

## 🐛 Common Issues & Fixes

### "Cannot find module" errors
**Solution:** Run `npm install` first
```bash
npm install
npm run dev
```

### Theme toggle not working
**Solution:** 
1. Clear browser cache (`Ctrl+Shift+Delete`)
2. Check DevTools → Application → LocalStorage
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Marquee not looping smoothly
**Solution:**
1. Open DevTools Console (F12)
2. Check for JavaScript errors
3. Verify both `marquee-content` divs are rendering in HTML

### Colors look wrong
**Solution:**
1. Check DevTools → Styles tab → verify CSS loaded
2. Clear cache and refresh
3. Verify HSL values are correct (format: `hue saturation% lightness%`)

### Mobile menu not opening
**Solution:**
1. Check DevTools mobile view is enabled
2. Click hamburger icon (≡ symbol)
3. Verify viewport width < 768px

### Page flashing between themes
**Solution:** This should NOT happen - report if it does. Theme applies before page renders.

---

## 📋 Common Commands

```bash
npm install        # Install dependencies (run first)
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Check code quality
npm run type-check # Check TypeScript errors
```

---

## 🎯 File You'll Edit Most Often

### For Colors
**File:** `src/app/global.css`
- Lines 5-35: Light mode colors (`:root`)
- Lines 37-61: Dark mode colors (`.dark`)

### For Navigation
**File:** `src/componets/ModernNav.tsx`
- Logo and branding
- Navigation links
- Social media links
- CV button

### For Marquee
**File:** `src/components/Marquee.tsx`
- Hobbies/items list
- Animation speed
- Styling

### For Main Content
**File:** `src/app/page.tsx`
- Education info
- Skills sections
- Experience
- Projects

---

## 🌓 Light vs Dark Mode

| Aspect | Light | Dark |
|--------|-------|------|
| Background | Off-white | Deep Navy |
| Text | Dark Slate | Clean White |
| Primary | Purple | Light Purple |
| Accent | Deep Purple | Cyan Blue |
| Best For | Daytime | Evening |

Both modes are fully accessible (WCAG AA compliant).

---

## 📱 Responsive Breakpoints

| Screen Size | Layout |
|------------|--------|
| < 768px | Mobile (hamburger menu) |
| 768px - 1024px | Tablet (split layout) |
| > 1024px | Desktop (full nav) |

---

## ✅ Deployment Checklist

- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts successfully
- [ ] Visit localhost:3000 works
- [ ] Theme toggle works
- [ ] Marquee scrolls infinitely
- [ ] Mobile menu works
- [ ] No console errors (F12)
- [ ] Colors look right in both modes
- [ ] Run `npm run build` successfully
- [ ] Ready to deploy!

---

## 🚀 Deploy Your Site

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Upload the .next folder or use Netlify CLI
```

### Option 3: Traditional Hosting
```bash
npm run build
npm start
# Keep running on your server
```

---

## 💡 Pro Tips

1. **Hot Reload:** Changes auto-save while dev server runs
2. **Mobile Testing:** Use DevTools → Toggle device toolbar (Ctrl+Shift+M)
3. **Dark Mode Testing:** Click theme toggle or use OS dark mode
4. **Console Check:** Always open DevTools (F12) to catch errors
5. **CSS Variables:** All colors use CSS variables for easy maintenance

---

## 🎓 Learn More

- **Colors & Animations:** See `COLORS_AND_ANIMATIONS.md`
- **Complete Setup:** See `THEME_README.md`
- **Color Preview:** Open `THEME_COLORS_REFERENCE.html` in browser

---

## 📞 Still Stuck?

1. Check DevTools Console (F12) for errors
2. Verify `npm install` completed
3. Try clearing cache (`Ctrl+Shift+Delete`)
4. Restart dev server (`Ctrl+C` then `npm run dev`)
5. Check file paths match exactly (case-sensitive on Mac/Linux)

---

## 🎉 You're All Set!

Your modern landing page is ready to customize and deploy.

**Next steps:**
1. Make sure dependencies are installed
2. Run the dev server
3. Test the theme toggle
4. Customize colors and content
5. Deploy when ready!

---

**Happy coding! 🚀**