# Optimisation des Images Responsive - Bahizi Café & Restaurant

## 📱 Stratégie Responsive

### Breakpoints
- **Mobile** : 320px - 767px
- **Tablet** : 768px - 1023px
- **Desktop** : 1024px+

### Images Actuelles

#### 1. Hero Coffee (hero-coffee.jpg)
- **Résolution originale** : 2560x1440px
- **Taille** : ~500KB

**Variantes nécessaires** :
```
Mobile (320px)   : 640x360px   (~80KB)  - 50% de la largeur
Tablet (768px)   : 1024x576px  (~150KB) - 100% de la largeur
Desktop (1024px) : 2560x1440px (~500KB) - Full resolution
```

#### 2. Product Espresso (product-espresso.jpg)
- **Résolution originale** : 1920x1920px
- **Taille** : ~300KB

**Variantes nécessaires** :
```
Mobile (320px)   : 320x320px   (~40KB)
Tablet (768px)   : 768x768px   (~120KB)
Desktop (1024px) : 1920x1920px (~300KB)
```

#### 3. Product Cappuccino (product-cappuccino.jpg)
- **Résolution originale** : 1920x1920px
- **Taille** : ~300KB

**Variantes nécessaires** :
```
Mobile (320px)   : 320x320px   (~40KB)
Tablet (768px)   : 768x768px   (~120KB)
Desktop (1024px) : 1920x1920px (~300KB)
```

#### 4. Team Barista (team-barista.jpg)
- **Résolution originale** : 1920x1920px
- **Taille** : ~350KB

**Variantes nécessaires** :
```
Mobile (320px)   : 320x320px   (~45KB)
Tablet (768px)   : 768x768px   (~140KB)
Desktop (1024px) : 1920x1920px (~350KB)
```

#### 5. Reservation Ambiance (reservation-ambiance.jpg)
- **Résolution originale** : 2560x1440px
- **Taille** : ~450KB

**Variantes nécessaires** :
```
Mobile (320px)   : 640x360px   (~70KB)
Tablet (768px)   : 1024x576px  (~140KB)
Desktop (1024px) : 2560x1440px (~450KB)
```

## 🛠️ Implémentation HTML

### Utiliser `<picture>` avec `srcset`

```html
<!-- Hero Image Example -->
<picture>
  <source media="(min-width: 1024px)" srcset="assets/hero-coffee-desktop.jpg">
  <source media="(min-width: 768px)" srcset="assets/hero-coffee-tablet.jpg">
  <img src="assets/hero-coffee-mobile.jpg" alt="Bahizi Café Interior" loading="lazy">
</picture>
```

### Ou utiliser `srcset` simple

```html
<img 
  src="assets/hero-coffee-mobile.jpg"
  srcset="
    assets/hero-coffee-mobile.jpg 640w,
    assets/hero-coffee-tablet.jpg 1024w,
    assets/hero-coffee-desktop.jpg 2560w
  "
  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 100vw"
  alt="Bahizi Café Interior"
  loading="lazy"
>
```

## 📊 Optimisation WebP

Créer des versions WebP pour une compression supplémentaire :

```html
<picture>
  <source media="(min-width: 1024px)" type="image/webp" srcset="assets/hero-coffee-desktop.webp">
  <source media="(min-width: 1024px)" srcset="assets/hero-coffee-desktop.jpg">
  <source media="(min-width: 768px)" type="image/webp" srcset="assets/hero-coffee-tablet.webp">
  <source media="(min-width: 768px)" srcset="assets/hero-coffee-tablet.jpg">
  <source type="image/webp" srcset="assets/hero-coffee-mobile.webp">
  <img src="assets/hero-coffee-mobile.jpg" alt="Bahizi Café Interior" loading="lazy">
</picture>
```

## ⚡ Lazy Loading

Ajouter `loading="lazy"` à toutes les images :

```html
<img src="..." alt="..." loading="lazy">
```

## 📈 Performance Targets

- **Mobile** : < 100KB total image size
- **Tablet** : < 250KB total image size
- **Desktop** : < 500KB total image size
- **Cumulative** : < 1.5MB for all images

## 🔄 CSS Media Queries

```css
/* Mobile First */
.hero-image {
  width: 100%;
  height: auto;
}

/* Tablet */
@media (min-width: 768px) {
  .hero-image {
    width: 100%;
    height: auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-image {
    width: 100%;
    height: auto;
  }
}
```

## ✅ Checklist

- [ ] Créer variantes mobile pour toutes les images
- [ ] Créer variantes tablet pour toutes les images
- [ ] Créer variantes desktop pour toutes les images
- [ ] Générer versions WebP
- [ ] Mettre à jour HTML avec `<picture>` et `srcset`
- [ ] Ajouter `loading="lazy"` à toutes les images
- [ ] Tester sur mobile (Chrome DevTools)
- [ ] Tester sur tablet
- [ ] Tester sur desktop
- [ ] Mesurer performance (Lighthouse)
- [ ] Optimiser CSS pour images
- [ ] Documenter dans README

## 📚 Ressources

- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Google: Image Optimization](https://developers.google.com/speed/docs/insights/OptimizeImages)
- [WebP Format](https://developers.google.com/speed/webp)
- [Lighthouse Performance](https://developers.google.com/web/tools/lighthouse)
