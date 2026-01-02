# CSS Changes Reference Guide

## Scrollbar Removal

### Before
```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #667eea, #764ba2);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #764ba2, #667eea);
}
```

### After
```css
/* Hide scrollbars completely */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

/* Firefox scrollbar hiding */
* {
  scrollbar-width: none;
}
```

## New Animation Keyframes

### Marquee Animation
```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.marquee {
  overflow: hidden;
  width: 100%;
}

.marquee-content {
  display: flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

.marquee-content:hover {
  animation-play-state: paused;
}

.marquee-content span {
  flex-shrink: 0;
  padding-right: 3rem;
}
```

### Parting Clouds Animation
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

.parting-clouds {
  position: relative;
  overflow: hidden;
}

.parting-clouds-element {
  animation: partingClouds 1.5s ease-out forwards;
}
```

## Theme Transition Enhancements

### Smooth Theme Switching
```css
@keyframes themeTransition {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}

html.dark,
html.light {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.theme-toggle {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Hidden Routes Styling

### Hidden Route Classes
```css
.hidden-route {
  display: none !important;
  visibility: hidden;
  pointer-events: none;
}

.hidden-route.active {
  display: block;
  visibility: visible;
  pointer-events: auto;
}
```

Usage:
```html
<!-- Hidden by default -->
<section id="portfolio" class="hidden-route py-20 px-6 relative z-10">
  Portfolio Content
</section>

<!-- Access via URL: #portfolio -->
```

## Key CSS Classes

### `.marquee`
- Container for animated scrolling text
- Uses overflow: hidden to clip content
- Background: gradient from blue to pink

### `.parting-clouds`
- Wrapper for scroll-triggered animation
- Uses IntersectionObserver for performance
- Position relative for animation container

### `.hidden-route`
- Hides sections from normal view
- Only visible when accessed via URL
- Can be activated with `.active` class

### `.glass`
- Glass morphism effect
- Updated backdrop blur styling
- Works in both light and dark modes

## Tailwind Config Animations

### Added to tailwind.config.ts
```javascript
animation: {
  marquee: "marquee 20s linear infinite",
},
keyframes: {
  marquee: {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(calc(-50% - 1rem))" },
  },
}
```

## Global CSS Updates

### Formatting
- Improved indentation consistency
- Better organization of related styles
- Added comments for clarity

### Removed Styles
- Custom scrollbar styling (all variations)
- Unused animation rules

### Added Styles
- Marquee keyframes and classes
- Parting clouds keyframes and classes
- Theme transition animations
- Hidden route styling

## Using Animations in Components

### Marquee Component
```tsx
<Marquee 
  items={["React", "Next.js", "TypeScript"]} 
  speed={50}
  direction="left"
/>
```

Customization:
- `speed`: Duration of complete scroll (in seconds)
- `direction`: "left" or "right"
- `items`: Array of strings to display

### Parting Clouds Component
```tsx
<PartingClouds triggerOffset={0.3}>
  {/* Content that animates when scrolled into view */}
</PartingClouds>
```

Parameters:
- `triggerOffset`: 0-1, how much of element must be visible (0.3 = 30%)
- `children`: Any React content to animate

## Performance Considerations

### Optimizations Made
1. **CSS Animations**: Use GPU-accelerated transforms
   - No custom scrollbar rendering overhead
   - Smooth 60fps animations

2. **Intersection Observer**: Better than scroll listeners
   - Efficient viewport detection
   - Automatic cleanup on unmount
   - No continuous event firing

3. **Reduced Repaints**: Hidden scrollbars mean less DOM reflow
   - Cleaner HTML structure
   - Better memory usage

4. **Prefers Reduced Motion**: Consider adding for accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Browser Compatibility

### Scrollbar Hiding
- Chrome/Edge: `::-webkit-scrollbar` ✅
- Firefox: `scrollbar-width` ✅
- Safari: `::-webkit-scrollbar` ✅

### Clip-Path (Parting Clouds)
- Chrome/Edge: ✅ (full support)
- Firefox: ✅ (full support)
- Safari: ✅ (full support, with -webkit- prefix)

### Animations
- All modern browsers ✅
- Fallback: Elements display without animation

## Testing Checklist

- [ ] Scrollbars hidden on all pages
- [ ] Marquee scrolls smoothly
- [ ] Marquee pauses on hover
- [ ] Parting clouds animation triggers on scroll
- [ ] Hidden routes accessible via URL (#portfolio, #personal)
- [ ] Dark mode transitions smoothly
- [ ] Light mode transitions smoothly
- [ ] Mobile responsive (no horizontal scroll)
- [ ] All animations 60fps without jank
- [ ] Accessibility features working

## Customization Examples

### Change Marquee Speed
```tsx
<Marquee items={items} speed={80} /> {/* Slower */}
<Marquee items={items} speed={20} /> {/* Faster */}
```

### Change Parting Clouds Trigger
```tsx
<PartingClouds triggerOffset={0.1}> {/* Triggers earlier */}
<PartingClouds triggerOffset={0.7}> {/* Triggers later */}
```

### Add More Hidden Routes
```tsx
<section id="secret" className="hidden-route py-20">
  Only accessible via #secret
</section>
```

### Customize Animation Speed
Edit in `global.css`:
```css
.parting-clouds-element {
  animation: partingClouds 2s ease-out forwards; /* Change 1.5s to desired duration */
}
```

Or in `tailwind.config.ts`:
```javascript
marquee: "marquee 30s linear infinite", /* Change 20s to desired duration */
```
