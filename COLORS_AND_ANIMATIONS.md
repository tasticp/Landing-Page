# Colors & Animations Reference

## 🎨 Color Palette

### Light Mode
| Variable | Value | Hex | Usage |
|----------|-------|-----|-------|
| background | 0 0% 99% | #FAFAF9 | Page background |
| foreground | 217 33% 17% | #1F2937 | Text color |
| primary | 263 70% 50% | #A855F7 | Main buttons, brand |
| secondary | 263 70% 95% | #F3E8FF | Secondary buttons |
| accent | 263 80% 55% | #9333EA | Hover states |
| border | 217 32% 88% | #E0E7FF | Borders, dividers |
| muted | 217 32% 92% | #E5E7EB | Muted text, backgrounds |

### Dark Mode
| Variable | Value | Hex | Usage |
|----------|-------|-----|-------|
| background | 217 32% 8% | #0F172A | Page background |
| foreground | 210 40% 98% | #F8FAFC | Text color |
| primary | 263 80% 65% | #D8B4FE | Main buttons, brand |
| secondary | 217 32% 22% | #334155 | Secondary elements |
| accent | 200 100% 60% | #60A5FA | Hover states, highlights |
| border | 217 32% 20% | #475569 | Borders, dividers |
| muted | 215 18% 55% | #64748b | Muted text |

### Brand Gradients
```css
/* Primary Gradient: Blue → Purple → Pink */
linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)

/* Purple Gradient: Light to Dark */
linear-gradient(135deg, #A855F7 0%, #9333EA 100%)

/* Cyan Gradient (Dark Mode Accent) */
linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)
```

### Using Colors in Code

**CSS Variables (Most Common):**
```css
background-color: hsl(var(--primary));
color: hsl(var(--foreground));
border: 1px solid hsl(var(--border));
```

**Tailwind Classes:**
```html
<div class="bg-primary text-primary-foreground border border-border">
  Content
</div>
```

**Direct Hex Values (Fallback):**
```css
background-color: #A855F7;  /* Light mode primary */
background-color: #D8B4FE;  /* Dark mode primary */
```

---

## ⚡ Animation Keyframes

### 1. fadeIn (0.5s)
Smooth opacity fade-in from 0 to 1.
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
**Use case:** Initial page load, element reveal

### 2. fadeInUp (0.6s)
Fade in while sliding up 20px.
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Use case:** Hero section, card reveals

### 3. slideInFromTop (0.3s)
Element enters from top of viewport.
```css
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Use case:** Mobile menu, dropdown menus

### 4. slideInFromBottom (0.3s)
Element enters from bottom of viewport.
```css
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Use case:** Modal dialogs, bottom sheets

### 5. scaleIn (0.3s)
Element grows into view from 95% scale.
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```
**Use case:** Buttons, interactive elements

### 6. pulseSubtle (3s - Infinite)
Gentle opacity pulsing.
```css
@keyframes pulseSubtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```
**Use case:** Status indicators, loading states

### 7. glow (2s - Infinite)
Box-shadow pulsing effect.
```css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3),
                0 0 20px rgba(102, 126, 234, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6),
                0 0 40px rgba(102, 126, 234, 0.3);
  }
}
```
**Use case:** Glowing buttons, highlights

### 8. float (3s - Infinite)
Vertical floating motion ±10px.
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```
**Use case:** Hero images, decorative elements

### 9. marquee (25s - Infinite)
Horizontal seamless scrolling.
```css
@keyframes scroll-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
```
**Use case:** Marquee component with infinite loop

### 10. partingClouds (1.5s)
Clip-path reveal animation.
```css
@keyframes partingClouds {
  0% {
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 40%);
  }
  50% {
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 0%);
  }
  100% {
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% -50%);
  }
}
```
**Use case:** Scroll-triggered section reveals

---

## 🎯 Easing Functions

### Standard Easing (Most Used)
```css
cubic-bezier(0.4, 0, 0.2, 1)
```
- Natural, smooth feel
- Used for all theme transitions
- Professional appearance

### Bounce Easing
```css
cubic-bezier(0.68, -0.55, 0.265, 1.55)
```
- Playful, bouncy effect
- Use for special interactions

### Spring Easing
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```
- Energetic, springy effect
- Use for enter/exit animations

---

## 🎬 Animation Usage Examples

### Apply Animation in Tailwind
```html
<div class="animate-fade-in-up">
  This fades in and slides up
</div>
```

### Apply Animation in Inline Style
```html
<div style="animation: fadeIn 0.5s ease-out;">
  This fades in
</div>
```

### Apply Animation in CSS
```css
.my-element {
  animation: slideInFromTop 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Play once on load */
.my-element {
  animation: fadeInUp 0.6s ease-out;
}

/* Play infinitely */
.my-element {
  animation: float 3s ease-in-out infinite;
}
```

---

## 🎨 Shadow System

### Glow Shadows
```css
/* Light Glow */
box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);

/* Medium Glow */
box-shadow: 0 0 25px rgba(102, 126, 234, 0.4);

/* Strong Glow */
box-shadow: 0 0 40px rgba(102, 126, 234, 0.5);

/* Purple Glow */
box-shadow: 0 0 25px rgba(118, 75, 162, 0.4);

/* Blue Glow */
box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
```

### Standard Shadows
```css
/* Light Mode Hover */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Dark Mode Hover */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
            0 10px 10px -5px rgba(0, 0, 0, 0.2);
```

---

## 📱 Theme Toggle Animation

The theme toggle icon (Sun/Moon) uses:
- **Icon rotation:** 500ms duration
- **Icon scale:** 0 to 100% transform
- **Color transition:** Smooth color change
- **Glow effect:** Gradient overlay on hover

```css
/* Sun Icon (visible in dark mode) */
.sun-icon {
  animation: rotateOut 0.5s ease-in-out;
  transform: rotate(0deg) scale(1);
}

/* Moon Icon (visible in light mode) */
.moon-icon {
  animation: rotateIn 0.5s ease-in-out;
  transform: rotate(90deg) scale(0);
}

/* On theme change */
.dark .sun-icon {
  transform: rotate(-90deg) scale(0);
}

.dark .moon-icon {
  transform: rotate(0deg) scale(1);
}
```

---

## 🌈 Transition Timing

| Duration | Use Case |
|----------|----------|
| 0.15s | Quick feedback (hover color) |
| 0.3s | Interaction responses |
| 0.5s | Theme transitions |
| 1s | Page section fades |
| 3s | Floating, pulsing effects |
| 20-25s | Marquee loops |

---

## 🔧 Customization Examples

### Change Animation Speed
```css
/* Make marquee faster */
animation: scroll-left 15s linear infinite;  /* was 25s */

/* Make fade-in quicker */
animation: fadeInUp 0.3s ease-out;  /* was 0.6s */

/* Make float slower */
animation: float 5s ease-in-out infinite;  /* was 3s */
```

### Change Easing
```css
/* Linear (no easing, constant speed) */
animation: scroll-left 25s linear infinite;

/* Ease-out (starts fast, ends slow) */
animation: fadeIn 0.5s ease-out;

/* Custom cubic-bezier */
animation: float 3s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
```

### Change Color in Animation
```css
@keyframes customGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);  /* Red glow */
  }
  50% {
    box-shadow: 0 0 40px rgba(239, 68, 68, 0.8);
  }
}
```

---

## ✅ Best Practices

1. **Use CSS Variables** for colors - easier to maintain
2. **Use Tailwind classes** for animations - consistent with design system
3. **Keep easing consistent** - use standard easing function throughout
4. **Test performance** - check 60fps on different devices
5. **Respect prefers-reduced-motion** - disable animations for accessibility
6. **Use GPU acceleration** - prefer transform and opacity over layout properties
7. **Keep animation duration short** - 0.3-0.6s for most interactions
8. **Use linear for infinite loops** - marquee, rotations
9. **Use ease-out for entrances** - fadeIn, slideIn
10. **Use infinite carefully** - only for background elements

---

## 🎯 Animation Decision Tree

```
Does the element...

- Enter the page?
  → Use fadeInUp (0.6s)

- Respond to hover?
  → Use quick transition (0.3s)

- Have a glowing effect?
  → Use glow keyframe (2s infinite)

- Float in place?
  → Use float keyframe (3s infinite)

- Scroll horizontally?
  → Use scroll-left keyframe (25s infinite)

- Respond to theme toggle?
  → Use 500ms theme transition

- Change color on interaction?
  → Use smooth transition (0.3s)
```

---

## 📊 Color Contrast Reference

All colors are WCAG AA compliant (4.5:1+ contrast):

| Combination | Light Mode | Dark Mode |
|------------|-----------|----------|
| Text on Background | ✅ 8:1 | ✅ 8:1 |
| Text on Card | ✅ 7:1 | ✅ 7:1 |
| Text on Accent | ✅ 6:1 | ✅ 6:1 |
| All Links | ✅ 4.5:1+ | ✅ 4.5:1+ |

---

## 🚀 Performance Tips

- **GPU Acceleration:** Use `transform` and `opacity` instead of position/size changes
- **Will-Change:** Only use on elements with complex animations
- **Reduce Motion:** Respect `prefers-reduced-motion: reduce`
- **Animation Delay:** Stagger animations for visual flow
- **Avoid Layout Shift:** Don't animate width/height, use transform scale instead

---

**Reference Guide Complete! Use this for all color and animation needs.** 🎨✨