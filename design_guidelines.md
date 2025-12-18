# Design Guidelines: Laundry & Dry Cleaning Service Website

## Design Approach

**Hybrid Approach**: Drawing inspiration from successful service platforms (Handy, TaskRabbit, local service businesses) combined with Material Design principles for consistency and trust-building.

**Core Principles**:
- Professional cleanliness aesthetic that reinforces quality
- Trust-building through clarity and transparency
- Conversion-focused with prominent CTAs
- Mobile-first service booking experience

---

## Typography

**Font Selection**: Google Fonts
- **Primary**: Inter or DM Sans (clean, modern sans-serif)
- **Headings**: Same family, bold weights for consistency

**Hierarchy**:
- **Hero Headline**: text-5xl md:text-6xl, font-bold
- **Page Headlines**: text-4xl md:text-5xl, font-bold
- **Section Titles**: text-3xl md:text-4xl, font-semibold
- **Service Cards**: text-xl md:text-2xl, font-semibold
- **Body Text**: text-base md:text-lg, regular weight
- **Captions/Meta**: text-sm, medium weight

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24**
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24
- Card gaps: gap-6 md:gap-8
- Button padding: px-6 py-3 to px-8 py-4

**Container Strategy**:
- Full-width sections with inner max-w-7xl
- Content sections: max-w-6xl mx-auto
- Form sections: max-w-2xl mx-auto

**Grid Patterns**:
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Feature highlights: grid-cols-1 md:grid-cols-3
- Contact layout: grid-cols-1 lg:grid-cols-2

---

## Page-Specific Layouts

### Homepage

**Hero Section** (80vh minimum):
- Large hero image showing professional laundry service environment (clean facility, folded clothes, or service in action)
- Centered content overlay with business name, compelling tagline
- Dual CTA buttons with backdrop blur: "Book Now" (primary) + "View Services" (secondary)
- Trust indicators below CTAs: "Same-Day Service Available" • "100+ Happy Customers" • "Eco-Friendly Products"

**Service Highlights Grid** (py-20):
- 4-column grid (responsive to 2-col tablet, 1-col mobile)
- Icon + Title + Short description for each service
- Iconography: Heroicons (outline style for consistency)
- Each card links to Services page with subtle hover elevation

**Why Choose Us Section** (py-20):
- 3-column feature grid
- Benefits: Quality Guarantee, Fast Turnaround, Eco-Friendly, Convenient Pickup
- Icon + headline + 2-3 sentence description per benefit

**CTA Section** (py-24):
- Full-width, centered
- Headline: "Ready to Experience Premium Care?"
- Large primary button with supporting text
- Secondary text: Operating hours, service area info

### Services Page

**Header Section** (py-12):
- Page title + breadcrumb navigation
- Brief overview paragraph

**Service Cards** (py-16):
- Stacked layout with alternating image placement
- Each service includes:
  - Service image (professional photography of the specific service)
  - Service name (text-3xl)
  - Detailed description (3-4 sentences)
  - Pricing indicator or "Starting from" text
  - "Book This Service" CTA button
  - List of included items/benefits

**Services Offered**:
1. Laundry Services
2. Dry Cleaning
3. Ironing & Pressing
4. Stain Removal Specialist
5. Express/Same-Day Service

**Add-Ons Section**:
- Pickup & Delivery, Folding preferences, Special fabric care
- Checkbox-style presentation

### Booking Page

**Two-Column Layout** (desktop):
- Left: Service selection + Calendly embed widget
- Right: Booking summary card (sticky positioning)

**Service Selection** (before calendar):
- Radio button group for service type selection
- Each option shows service icon + name + brief detail
- Selected state clearly indicated

**Calendly Integration**:
- Full-width embed on mobile
- Seamless brand integration
- Pre-filled service type from selection

**Booking Summary Card**:
- Selected service display
- Estimated pricing/timeframe
- Contact information fields
- Special instructions textarea

### About Us Page

**Two-Column Split** (lg:grid-cols-2):
- Left: Team photo or facility image
- Right: Story content with mission, values, experience

**Stats Section**:
- 4-column grid showcasing: Years in Business, Customers Served, Items Cleaned, Rating
- Large numbers with labels

**Team Section** (if applicable):
- Photo + name + role for key team members
- 3-4 column grid

### Contact Page

**Two-Column Layout**:
- Left: Contact form (Name, Email, Phone, Service Interest, Message)
- Right: Contact information stack
  - Business hours with icon
  - Phone number with click-to-call
  - WhatsApp button (prominent, branded)
  - Physical address with map embed consideration
  - Email address

**Map Section** (py-16):
- Embedded map showing location
- Directions link

---

## Component Library

### Navigation
- Sticky header with logo left, menu center/right
- Mobile: Hamburger menu with slide-in drawer
- Desktop menu items: Home, Services, About, Contact, Book Now (highlighted)

### Buttons
- Primary: Large, rounded corners (rounded-lg), bold text, shadow-lg
- Secondary: Outlined style with hover fill
- CTA buttons on images: Backdrop blur (backdrop-blur-md bg-white/20)
- Icon buttons: Consistent sizing (h-12 w-12)

### Cards
- Service cards: Rounded corners (rounded-xl), subtle shadow, hover elevation
- Padding: p-6 to p-8
- Clear visual hierarchy with icon at top

### Forms
- Input fields: Full-width, clear labels above, placeholder text, border focus states
- Consistent spacing: mb-6 between fields
- Submit buttons: Full-width on mobile, auto-width desktop
- Required field indicators

### Icons
- Heroicons (outline style primary, solid for filled states)
- Consistent sizing: h-6 w-6 for inline, h-12 w-12 for feature icons
- Service icons: h-16 w-16 in highlight sections

### Footer
- Three-column grid (desktop): About snippet, Quick Links, Contact Info
- Newsletter signup field
- Social media icons
- Business hours
- Copyright notice
- Trust badges (if applicable): Secure Payment, Satisfaction Guarantee

---

## Images

**Required Images**:
1. **Hero Image**: Professional laundry facility or neatly organized clean clothes (full-width, high-quality)
2. **Service Images**: Individual images for each service type (laundry baskets, dry cleaning hangers, ironing board, stain treatment)
3. **About Us**: Team photo or facility interior
4. **Trust Building**: Clean, bright, organized aesthetic throughout

**Image Treatment**:
- High-quality, professional photography
- Consistent lighting and style
- Rounded corners for card images (rounded-lg)
- Subtle overlay on hero for text readability

---

## Responsive Behavior

**Mobile-First Breakpoints**:
- Base: Single column, stacked layout
- md (768px): 2-column grids where applicable
- lg (1024px): Full multi-column layouts, sticky elements

**Touch Targets**: Minimum 44px for all interactive elements

**Mobile Navigation**: Full-screen drawer with large touch targets

---

## Key Interactions

- Smooth scroll to booking section from CTAs
- Form validation with inline error messages
- Hover states: Subtle elevation on cards (shadow transition)
- Button states: Scale slightly on press for tactile feedback
- No complex animations—keep it clean and fast

---

**Final Note**: Every section should feel complete and purposeful. Generous whitespace creates a premium, uncluttered experience that reinforces the "cleanliness" brand promise.