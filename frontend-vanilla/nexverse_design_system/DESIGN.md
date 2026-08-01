---
name: NexVerse Design System
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is engineered for an elite developer-centric marketplace, prioritizing functional density and sophisticated utility over decorative fluff. The aesthetic is rooted in **Minimalism** with a **Corporate/Modern** edge, drawing inspiration from high-end engineering tools.

The brand personality is authoritative, precise, and premium. It targets high-level developers and enterprise buyers who value efficiency and performance. The UI evokes a sense of "quiet power"—it is understated, allowing the agents and their capabilities to remain the focal point. Expect expansive whitespace (luxury margins), razor-sharp borders, and a deep, monochromatic palette that feels architectural.

## Colors
The system utilizes a high-contrast dark mode foundation to emphasize premium quality and reduce eye strain during deep work. 

- **Background & Surfaces:** A tiered grayscale system. `#09090B` serves as the canvas, while `#111113` and `#18181B` provide depth for cards and interactive containers.
- **Accents:** Electric Blue (`#3B82F6`) is used surgically. It is reserved for primary actions, active states, and critical highlights to maintain a professional, restrained atmosphere.
- **Typography:** Primary text is near-white for maximum legibility. Secondary and muted tokens provide a clear information hierarchy, guiding the eye through complex data sets.

## Typography
This design system utilizes **Geist** for its technical precision and modern geometric rhythm. The hierarchy is designed for high-density information environments.

- **Headlines:** Use tight letter-spacing and substantial weights to create a sense of structural integrity.
- **Body:** Generous line-heights (1.5–1.6) ensure long-form technical descriptions remain readable.
- **Labels:** Small, uppercase labels with slight tracking provide a sophisticated "meta-data" look for tags and categories.
- **Code:** Geist Mono should be used for all terminal outputs, API keys, and parameter configurations.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain the "App Store" feel, transitioning to a fluid model for mobile.

- **Desktop:** 12-column grid with a 1280px max-width. Use 24px gutters.
- **Padding:** Rely on "Expensive Whitespace"—specifically 40px–64px between major sections to prevent the high-density UI from feeling cluttered.
- **Mobile:** Single column with 16px safe-area margins.
- **Rhythm:** All spacing must be multiples of 4px to maintain mathematical harmony.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Subtle Shadows**, avoiding heavy blurs.

- **Level 0 (Base):** `#09090B`. The foundational canvas.
- **Level 1 (Cards):** `#111113`. 1px border of `#27272A`. This is the standard surface for agent listings.
- **Level 2 (Popovers/Modals):** `#18181B`. Features a subtle soft shadow: `0px 10px 30px rgba(0, 0, 0, 0.5)`. 
- **Hover States:** Interactive elements should utilize a subtle lift (1.01x scale) and a soft glow effect—a low-opacity blue outer shadow for primary buttons.

## Shapes
The shape language is consistent and approachable yet structural. 

- **Primary Radius:** 16px (`rounded-xl` context) for main cards and containers.
- **Component Radius:** 8px (`rounded-md` context) for buttons, input fields, and tags.
- **Borders:** Every container must have a consistent 1px solid border using the `#27272A` token. High-contrast borders are a hallmark of this professional aesthetic.

## Components
Consistent component styling reinforces the "Elite" brand.

- **Buttons:**
    - **Primary:** Background `#3B82F6`, Text `#FAFAFA`. On hover: subtle outer glow and 0.98x scale on click.
    - **Secondary:** Background transparent, 1px border `#27272A`. On hover: Background `#18181B`.
- **Cards:** Use a 1.01x scale transition on hover with a 200ms ease-out. Ensure 24px internal padding.
- **Command Palette:** A center-screen modal (`#18181B`) with a blurred backdrop. Use `#FAFAFA` for search text and Geist Mono for keyboard shortcuts (e.g., `⌘K`).
- **Input Fields:** Background `#09090B`, 1px border `#27272A`. Focus state: Border becomes `#3B82F6` with a 2px soft glow.
- **Chips/Tags:** Small (`label-md` type), background `#18181B`, border `#27272A`. Use for "New," "Trending," or category markers.
- **Charts:** Use thin, 1.5px lines for data visualization. Primary data line in Electric Blue, grid lines in `#18181B`.