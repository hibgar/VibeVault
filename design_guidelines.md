# Design Guidelines: Vibe Media Tracker

## Design Approach

**Selected Approach:** Reference-Based with Media App Inspiration

Drawing from leading media platforms that excel at visual content organization and discovery:
- **Spotify:** Card-based layouts, mood/vibe selection interface, clean content organization
- **Letterboxd:** Media card displays with metadata, personal library feel
- **Netflix:** Content discovery patterns, thumbnail-focused design
- **Notion:** Clean data organization, tag systems, intuitive input flows

**Key Design Principles:**
1. Visual-first media presentation with cover art prominence
2. Intuitive vibe/mood mapping with clear visual feedback
3. Quick-action focused for rapid media entry
4. Mobile-optimized touch targets and gestures
5. Balance between browsing and discovering

---

## Core Design Elements

### A. Typography

**Font Families:**
- Primary: Inter (via Google Fonts CDN) - clean, modern, excellent readability
- Accent: Manrope (via Google Fonts CDN) - friendly rounded letterforms for tags and labels

**Type Scale:**
- Display/Hero: text-4xl (36px) - font-bold
- Page Titles: text-2xl (24px) - font-semibold
- Section Headers: text-xl (20px) - font-semibold
- Card Titles: text-base (16px) - font-medium
- Body Text: text-sm (14px) - font-normal
- Labels/Tags: text-xs (12px) - font-medium uppercase tracking-wide
- Metadata: text-xs (12px) - font-normal

**Line Heights:**
- Headlines: leading-tight (1.25)
- Body: leading-normal (1.5)
- Tags: leading-none (1)

---

### B. Layout System

**Spacing Primitives:**
Core spacing units using Tailwind: **2, 3, 4, 6, 8, 12, 16**

**Application:**
- Micro spacing (tags, icons): p-2, gap-2
- Component padding: p-4, p-6
- Section spacing: py-8, py-12
- Page margins: px-4, px-6
- Card spacing: gap-4, gap-6
- Large gaps: gap-8, mt-12, mb-16

**Grid System:**
- Mobile (base): Single column, full-width cards
- Tablet (md): 2-column grid for media cards
- Desktop view: 3-column grid maximum

**Container Widths:**
- Mobile: full-width with px-4 padding
- Max content width: max-w-6xl for larger screens

---

### C. Component Library

#### Navigation & Header

**Main Navigation (Bottom Tab Bar):**
- Fixed bottom navigation (iOS/Android pattern)
- 4 primary tabs: Library, Add Media, Vibe Finder, Profile
- Icon + label combination
- Active state with visual indicator (underline or filled icon)
- Safe area padding for notched devices
- Height: h-16 with proper touch targets (min 44px)

**Top Bar:**
- Fixed top bar with page title
- Optional search icon (right side) for Library view
- Optional filter icon for category switching
- Height: h-14
- Drop shadow on scroll

#### Media Cards

**Card Structure:**
- Aspect ratio 2:3 for cover art (poster format)
- Rounded corners: rounded-lg
- Drop shadow: shadow-md on default, shadow-lg on hover/active
- Card padding: p-3
- Image container: overflow-hidden rounded-md

**Card Content:**
- Cover image (prominent, fills top 60% of card)
- Title: text-base font-medium, 2-line truncate
- Metadata row: text-xs (type badge + year)
- Vibe tags: horizontal scroll, pill-shaped tags
- Quick action button (floating on image, top-right)

**Grid Layout:**
- Gap between cards: gap-4
- Responsive: 2 columns on mobile (grid-cols-2), 3 on tablet (md:grid-cols-3)

#### Input & Forms

**Add Media Input:**
- Large search input field
- Height: h-12
- Full-width on mobile
- Placeholder with icon (search/plus icon using Heroicons)
- Autocomplete dropdown appears below input
- Dropdown items: p-3, with thumbnail + title

**Autocomplete Results:**
- Full-width dropdown
- Max height: max-h-96 with scroll
- Each result: flex row with thumbnail (w-12 h-16) + text
- Hover/active state with subtle background
- Padding: p-3, gap-3

**Tag Input System:**
- Chip/pill display for existing tags
- Inline tag input ("+Add vibe" button)
- Tag pills: px-3 py-1.5, rounded-full, text-xs
- Remove icon on each tag (x button, w-4 h-4)

#### Vibe Finder Interface

**Mood Selection:**
- Prominent heading: "What's your vibe right now?"
- Grid of mood cards: 2 columns on mobile, 3 on tablet
- Each mood card:
  - Square aspect ratio
  - Icon centered (from Heroicons, size w-8 h-8)
  - Label below icon (text-sm font-medium)
  - Padding: p-6
  - Rounded: rounded-xl
  - Tap to select (visual state change)

**Mood Options (8-12 options):**
Cozy, Intense, Lighthearted, Thoughtful, Thrilling, Relaxing, Inspiring, Escapist, Emotional, Adventurous, Mysterious, Uplifting

**Results Display:**
- Scrollable media card list
- "Based on your vibe..." header
- Same card format as library
- Swipe gestures for quick save/dismiss

#### Library Views

**Category Tabs:**
- Horizontal scroll tabs below top bar
- Options: All, Shows, Movies, Books
- Active tab indicator (underline + bold text)
- Padding: px-4 py-3
- Gap: gap-6

**Empty States:**
- Centered icon (w-16 h-16)
- Headline: text-lg font-semibold
- Description: text-sm
- CTA button: "Add your first [media type]"
- Vertical spacing: gap-4

**Media Details Modal:**
- Slide-up modal (full-screen on mobile)
- Rounded top corners: rounded-t-2xl
- Cover art at top (larger, w-full, aspect-ratio-2/3 max-h-96)
- Content padding: p-6
- Sections: Title, Metadata, Synopsis, Vibe Tags, Actions
- Section spacing: space-y-6
- Dismissible with swipe down gesture

#### Buttons & CTAs

**Primary Button:**
- Height: h-12
- Padding: px-6
- Rounded: rounded-lg
- Font: text-base font-semibold
- Full-width on mobile contexts
- Min-width: min-w-32 for inline buttons

**Secondary Button:**
- Same dimensions as primary
- Different visual treatment (outline style)

**Icon Buttons:**
- Square: w-10 h-10
- Rounded: rounded-lg
- Icon size: w-5 h-5
- Used for: Remove, Edit, Share, More actions

**Floating Action Button (FAB):**
- Quick add button (when not on Add page)
- Fixed position: bottom-right, mb-20 mr-4 (above nav bar)
- Size: w-14 h-14
- Rounded: rounded-full
- Icon: Plus (w-6 h-6)
- Shadow: shadow-xl

#### Tags & Badges

**Vibe Tags:**
- Pill shape: rounded-full
- Padding: px-3 py-1.5
- Font: text-xs font-medium
- Horizontal scroll container when overflow
- Gap: gap-2

**Category Badges:**
- Small rounded rectangles: rounded
- Padding: px-2 py-1
- Font: text-xs font-semibold uppercase
- Examples: "TV Show", "Movie", "Book"

#### Lists & Data Display

**Media List Item (Alternative to Cards):**
- Horizontal flex layout
- Thumbnail left (w-16 h-24)
- Content area with gap-1
- Title, metadata, tags stacked
- Chevron/arrow right for navigation
- Padding: p-3
- Border bottom: border-b

#### Loading & Feedback

**Loading States:**
- Skeleton cards matching final card dimensions
- Shimmer animation (optional, subtle)
- Spinner for search: centered, w-6 h-6

**Toast Notifications:**
- Slide in from top
- Padding: p-4
- Rounded: rounded-lg
- Icon + message: gap-3
- Auto-dismiss after 3s

---

### D. Animations

**Minimal, Purposeful Motion:**

1. **Page Transitions:** Simple fade or slide (200ms)
2. **Card Interactions:** Subtle scale on tap (scale-[0.98])
3. **Modal Entry:** Slide-up from bottom (300ms ease-out)
4. **Tag Additions:** Quick fade-in (150ms)

**No Animations:**
- Avoid scroll-triggered animations
- No parallax effects
- No elaborate micro-interactions
- Keep transitions instant and responsive

---

## Images

**Hero Section:** Not applicable (mobile app focused on content)

**Cover Art Images:**
- Primary content images throughout the app
- Location: Top of media cards, media detail modal, search results
- Source: Fetch from external APIs (TMDB for movies/shows, Open Library for books)
- Fallback: Placeholder with media type icon if image unavailable
- Treatment: Slight rounded corners (rounded-md), maintain aspect ratio

**Empty State Illustrations:**
- Simple iconography from Heroicons (outline style)
- Center-aligned on empty library states
- No custom illustrations needed

---

## Icon System

**Icon Library:** Heroicons (via CDN)
- Style: Mix of outline (navigation, actions) and solid (selected states)
- Sizes: w-5 h-5 (default), w-6 h-6 (prominent), w-4 h-4 (inline)

**Common Icons:**
- Plus: Add media
- Film, TV, Book-open: Category indicators
- Sparkles: Vibe finder/AI features
- Search: Search functionality
- X-mark: Close/remove actions
- Heart: Favorites
- User: Profile