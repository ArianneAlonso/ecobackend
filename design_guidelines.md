# EcoResiduos Design Guidelines

## Design Approach

**Selected Framework:** Material Design with Environmental Focus
- **Rationale:** Government/municipal portals require clarity, trustworthiness, and efficient data presentation. Material Design provides robust patterns for dashboards, data visualization, and complex information hierarchies while maintaining accessibility.
- **Environmental Adaptation:** Apply organic, nature-inspired touches to Material's structure—rounded corners, gentle shadows, and growth-oriented metaphors for progress indicators.

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - Clean, highly legible for data and UI elements
- Secondary: Poppins (via Google Fonts) - Friendly, rounded for headings and CTAs
- Monospace: JetBrains Mono - For data tables, codes, and technical information

**Type Scale:**
- H1 (Page Titles): text-4xl md:text-5xl, font-bold, Poppins
- H2 (Section Headers): text-3xl md:text-4xl, font-semibold, Poppins
- H3 (Card Titles): text-2xl, font-semibold, Inter
- H4 (Subsections): text-xl, font-medium, Inter
- Body Large: text-lg, font-normal, Inter (dashboard metrics, important info)
- Body Regular: text-base, font-normal, Inter (primary content)
- Body Small: text-sm, Inter (captions, helper text)
- Caption: text-xs, Inter (timestamps, metadata)

## Layout System

**Spacing Primitives:**
Core spacing units: **2, 4, 6, 8, 12, 16** (Tailwind units)
- Micro spacing (within components): p-2, gap-2, m-1
- Standard spacing (between elements): p-4, gap-4, mb-6
- Section spacing (major divisions): p-8, py-12, gap-8
- Page padding: px-6 md:px-8 lg:px-12

**Grid Structure:**
- Dashboard: 12-column grid with gap-6
- Metric cards: 4-column on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Content areas: 8-column main + 4-column sidebar pattern where applicable
- Maps/visualizations: Full-width containers with max-w-7xl centering

**Container Hierarchy:**
- Page wrapper: min-h-screen with sidebar navigation
- Content area: flex-1 p-6 md:p-8
- Cards/panels: rounded-xl with shadow-md elevation
- Modal overlays: max-w-2xl for forms, max-w-6xl for complex dialogs

## Component Library

### Navigation
**Sidebar Navigation (Municipal Portal):**
- Fixed left sidebar, w-64, with organization logo at top
- Vertical nav items with icons (Heroicons) and labels
- Active state: slightly elevated background, accent indicator
- Collapsible on mobile (hamburger menu)
- Logout and user profile at bottom

**Top Bar (Commerce Portal):**
- Horizontal navigation, h-16
- Logo left, primary nav center, user menu right
- Sticky positioning (sticky top-0)
- Breadcrumbs below top bar for deep navigation

### Dashboard Components
**Metric Cards:**
- Compact height (h-32), full card structure
- Icon in top-left corner (environmental icons: leaf, recycle, location)
- Large metric number: text-3xl font-bold
- Label below: text-sm text-gray-600
- Trend indicator (arrow + percentage): text-xs
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6

**Chart Containers:**
- White background panels with rounded-xl
- Padding: p-6
- Header with title (text-xl font-semibold) and time selector dropdown
- Chart area: h-80 for line/bar charts, h-96 for maps
- Legend positioned below or to right of chart

**Data Tables:**
- Striped rows for readability (alternate row backgrounds)
- Sticky header row
- Column headers: text-sm font-semibold uppercase tracking-wide
- Cell padding: px-4 py-3
- Action buttons (icon-only) in rightmost column
- Pagination at bottom: centered, showing items per page

### Forms & Inputs
**Form Layout:**
- Single column for simple forms (max-w-2xl)
- Two-column grid for complex forms (grid-cols-1 md:grid-cols-2 gap-6)
- Field groups with label above input
- Labels: text-sm font-medium mb-2
- Inputs: h-12, px-4, rounded-lg, border
- Focus states: ring-2 with focus-visible
- Error states: border-red-500, error text below in text-sm text-red-600

**Buttons:**
- Primary CTA: h-12, px-8, rounded-lg, font-semibold, text-base
- Secondary: h-10, px-6, outline or ghost style
- Icon buttons: w-10 h-10, rounded-lg, icon-only
- Button groups: flex gap-3
- Disabled state: opacity-50 cursor-not-allowed

### Interactive Maps
**Map Container:**
- Full-width section or card
- Minimum height: h-[500px] md:h-[600px]
- Legend overlay: absolute positioning, top-4 right-4
- Control panel (filters): absolute, bottom-4 left-4, bg-white rounded-lg shadow-lg p-4
- Marker clusters for high-density areas
- Custom markers: leaf icon for eco-points, bin icon for containers

### QR Code Display
**QR Generation Card:**
- Centered layout with QR code prominent
- QR size: w-64 h-64
- Code details below: benefit name, points required, expiration
- Download/print button below QR
- Share functionality icons

### Event Calendar
**Calendar View:**
- Full calendar grid using react-big-calendar patterns
- Event cards: rounded-lg with event type badge
- Color coding by event category (workshop, collection day, eco-point)
- Detail panel on right (or modal) when event selected
- Month/week/day view toggles

### Commerce Benefits Section
**Benefit Cards:**
- Image at top (16:9 aspect ratio) or placeholder
- Content padding: p-6
- Benefit title: text-xl font-semibold mb-2
- Description: text-sm mb-4, line-clamp-3
- Points badge: absolute top-4 right-4, rounded-full px-3 py-1
- Action button at bottom: full-width
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## Navigation Patterns

**Multi-Level Navigation:**
- Primary nav in sidebar (municipalities) or top bar (commerce)
- Secondary tabs for section switching (e.g., "Active Events" / "Past Events")
- Breadcrumbs for location awareness
- Action buttons (primary actions) in top-right of content area

**State Indicators:**
- Active page: visual accent on nav item
- Loading states: skeleton screens for data tables and charts
- Empty states: illustration + helpful message + CTA to add first item
- Success confirmations: toast notifications, top-right, auto-dismiss

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - stacked layouts, hamburger menu, single column
- Tablet: 768px - 1024px - 2-column grids, visible sidebar
- Desktop: > 1024px - full multi-column layouts, expanded data views

**Mobile Optimizations:**
- Collapsible sidebar becomes slide-out drawer
- Metric cards stack (grid-cols-1)
- Data tables: horizontal scroll or card transformation
- Charts: reduce height (h-64 on mobile)
- Forms remain single column

## Accessibility Standards

**Consistent Implementation:**
- All interactive elements: min-h-12 (44px minimum touch target)
- Form inputs: aria-labels, associated labels with htmlFor
- Keyboard navigation: focus-visible states on all interactive elements
- Screen reader support: semantic HTML (nav, main, section, article)
- ARIA labels for icon-only buttons
- Skip navigation link for keyboard users
- Color contrast: WCAG AA minimum (4.5:1 for text)

## Animations & Transitions

**Subtle, Purposeful Motion:**
- Page transitions: minimal, focus on content loading states
- Hover states: transition-colors duration-200 on buttons, cards
- Modal entry: fade-in with scale (scale-95 to scale-100)
- Toast notifications: slide-in-right with bounce
- Chart animations: progressive reveal on load (built into recharts)
- NO decorative scroll animations or parallax effects

## Icons

**Library:** Heroicons (via CDN)
**Usage:**
- Navigation: outline icons at w-6 h-6
- Buttons: outline icons at w-5 h-5
- Metric cards: solid icons at w-8 h-8 with environmental theme
- Table actions: outline icons at w-5 h-5
- Status indicators: solid icons at w-4 h-4

**Environmental Icons:**
- Dashboard: leaf, globe, recycle-symbol, map-pin, calendar, truck
- Actions: plus-circle, pencil, trash, check-circle, x-circle
- Navigation: home, chart-bar, map, calendar-days, gift, cog

## Images

**Strategic Image Usage:**

**Municipal Dashboard:**
- Optional: Small header banner (h-48) with aerial city/nature photo, overlaid with page title - use blur backdrop for text readability

**Commerce Portal:**
- Hero section: Full-width h-64 background image of local businesses/recycling in action, with welcome message overlay using backdrop-blur
- Benefit cards: 16:9 product/promotion images at card tops
- Placeholder pattern: subtle eco-pattern background when no image available

**Event Management:**
- Event thumbnails in calendar cards
- Location photos in event detail views

**Image Treatment:**
- Rounded corners: rounded-lg for contained images, rounded-t-lg for card-top images
- Aspect ratio containers to prevent layout shift
- Lazy loading for performance

## Design Principles

**Clarity First:** Information hierarchy through size, weight, and spacing—not decoration
**Trust Through Consistency:** Repeated patterns build user confidence in municipal systems
**Environmental Resonance:** Organic shapes, growth metaphors, and natural flow without sacrificing professionalism
**Data Transparency:** Charts and metrics prominently displayed, easy to interpret at a glance
**Accessible by Default:** Design choices prioritize usability for diverse audiences including children and adults