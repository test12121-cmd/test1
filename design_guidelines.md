# Design Guidelines: Pharmacy Management Dashboard (Farmacia ZZ)

## Design Approach
**System-Based Approach** - Modern SaaS dashboard inspired by Linear, Notion, and enterprise admin panels. Focus on clarity, efficiency, and data-dense interfaces with healthcare professionalism.

## Core Design Principles
1. **Clarity First**: Clean data presentation with clear visual hierarchy
2. **Efficiency**: Streamlined workflows for frequent pharmacy operations
3. **Professional Medical Aesthetic**: Trust-building, clean, clinical feel
4. **Dense Information Display**: Maximize useful data without clutter

---

## Typography System

**Primary Font**: Inter (Google Fonts)
**Secondary Font**: JetBrains Mono (for IDs, codes, numeric data)

**Hierarchy:**
- Dashboard Title/Section Headers: `text-2xl font-semibold`
- Card/Module Titles: `text-lg font-semibold`
- Table Headers: `text-sm font-medium uppercase tracking-wide`
- Body/Form Labels: `text-sm font-medium`
- Data/Input Fields: `text-base`
- Helper Text: `text-sm`
- Metadata/Timestamps: `text-xs`

---

## Layout System

**Spacing Scale**: Use Tailwind units of **2, 3, 4, 6, 8, 12, 16** consistently
- Component padding: `p-6` or `p-8`
- Card gaps: `gap-6`
- Form field spacing: `space-y-4`
- Section margins: `mb-8` or `mb-12`

**Dashboard Structure:**
- **Sidebar**: Fixed width `w-64`, full height, left-aligned
- **Main Content Area**: `ml-64` offset, full remaining width with `max-w-7xl mx-auto px-8`
- **Top Bar**: Height `h-16`, spans full width above main content

---

## Component Library

### Navigation Sidebar
- **Structure**: Logo at top, navigation menu, user profile at bottom
- **Menu Items**: Icon + label, `px-4 py-3` spacing
- **Active State**: Subtle background, medium font weight
- **Sections**: Dashboard, Clientes, Medicamentos, Empleados, Proveedores, Ventas

### Dashboard Home (Statistics Cards)
- **Grid Layout**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- **Card Structure**: 
  - Icon area top-left
  - Large number/metric: `text-3xl font-bold`
  - Label below: `text-sm`
  - Optional trend indicator (↑/↓)
- **Key Metrics**: Total Medicamentos, Ventas Hoy, Stock Bajo, Clientes Activos

### Forms (All Modules)
- **Layout**: Single column for simplicity, max-width `max-w-2xl`
- **Field Groups**: `space-y-6` between groups, `space-y-4` within groups
- **Input Fields**: 
  - Full width with `w-full`
  - Height `h-12` for text inputs
  - Border radius `rounded-lg`
  - Padding `px-4`
- **Labels**: Above inputs, `mb-2`, medium weight
- **Required Indicators**: Asterisk in label
- **Buttons**: 
  - Primary action: `px-6 py-3 rounded-lg font-medium`
  - Secondary/Cancel: Same size, different treatment
  - Button group spacing: `gap-3`

### Data Tables
- **Container**: `rounded-xl border overflow-hidden`
- **Header Row**: Medium weight, uppercase, letter spacing
- **Cell Padding**: `px-6 py-4`
- **Row Hover**: Subtle background change
- **Actions Column**: Right-aligned, icon buttons for edit/delete
- **Pagination**: Bottom of table, centered
- **Search/Filter Bar**: Above table with `mb-4`

### Modal/Overlay Forms
- **Background**: Semi-transparent overlay
- **Modal Card**: Centered, `max-w-lg`, `rounded-2xl`, padding `p-8`
- **Close Button**: Top-right corner
- **Form Layout**: Same as standard forms

### Status Badges
- **Stock Alerts**: Rounded pill badges
  - Stock Bajo: Warning treatment
  - Stock OK: Success treatment
  - Agotado: Critical treatment
- **Vencimiento**: Date-based warnings (próximo a vencer, vencido)
- **Size**: `px-3 py-1 rounded-full text-xs font-medium`

### Statistics Cards (Dashboard)
- **Card**: `rounded-xl border p-6`
- **Icon**: `w-12 h-12` with circular background, `rounded-full`
- **Layout**: Flex row with icon left, content right

---

## Module-Specific Components

### Ventas Module (Point of Sale)
- **Three-Column Layout**: 
  - Left: Product search/selector (`w-2/5`)
  - Center: Shopping cart/items list (`w-2/5`)
  - Right: Summary/totals (`w-1/5`)
- **Cart Items**: List with quantity controls, price, remove button
- **Total Calculation**: Large, prominent display
- **Quick Actions**: Fast client/employee selection dropdowns

### Medicamentos Module
- **List View**: Table with stock level indicators
- **Detail View**: Two-column grid for product info
- **Alert System**: Visual warnings for:
  - Stock bajo (< 10 unidades)
  - Próximo a vencer (< 30 días)
  - Vencido (past date)

---

## Icons
**Library**: Heroicons (via CDN)
- Navigation: outline icons
- Actions: outline for default, solid for active
- Status indicators: solid icons
- Size: `w-5 h-5` for navigation, `w-6 h-6` for cards

---

## Animations
**Minimal Approach:**
- Smooth transitions for hover states: `transition-colors duration-200`
- Modal entry: Subtle fade-in
- Loading states: Simple spinner for data fetch
- NO scroll animations, NO complex transitions

---

## Images
**No hero images** - This is a utility dashboard, not a marketing site.

**Icon Usage Only:**
- Sidebar logo/branding area: Simple pharmacy icon or text logo
- Empty states: Simple illustrative icons for "No data" states
- Dashboard stat cards: Medical/pharmacy related icons (pill, prescription, users, chart)

---

## Accessibility
- All form inputs with proper labels and ARIA attributes
- Keyboard navigation throughout sidebar and tables
- Focus indicators on all interactive elements: `focus:ring-2 focus:ring-offset-2`
- Color contrast ratios meeting WCAG AA standards
- Screen reader friendly table structures with proper headers