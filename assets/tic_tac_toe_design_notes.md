# Tic Tac Toe App - Design Notes

## 1. Overall Layout & Structure

- **Canvas**: Portrait mobile layout, single-column flow, vertically centered main content.
- **Background**: Vertical gradient from deep indigo (#28204C, top) to navy (#23244C, bottom).

### Major Regions:
- **Header Bar:** Contains navigation (left/back arrow, right/refresh), current level indicator, and game stats.
- **Game Status/Stats:** Shows current player icons ('X', 'O'), match score, and timer.
- **Game board:** 3x3 grid occupying central portion of the page.
- **Result Status:** Victory text (e.g., “X Win”) near the bottom.

---

## 2. Key Elements & Styles

### Header / Top Bar
- **Height:** ~56px (est.)
- **Elements:**
  - Left arrow icon (circle button, white, 24px)
  - Level indicator (centered, rounded rectangle, neon green text on dark green background)
    - Text: “LEVEL:- 0/10”
    - Background: #174833, border-radius:12px, padding: 2px 12px
    - Font: Sans-serif, Medium, 16px, color: #93FF96
  - Right circular refresh icon (mirror image of left, white, 24px)
- **Padding:** 12px horizontal from each edge.

### Score & Game Status Row
- **Arrangement:** Horizontal, spaced evenly.
  - X icon (left), orange/yellow gradient; size ~28px
  - Score ("4 - 2"), centered, numbers in red (#FE8366), dash in white
  - O icon (right), cyan gradient; size ~28px
- **Vertical gap below Header:** 18px
- **Icons Style:** Drop-shadow or slight glow.

### Timer Row
- **Text:** Large font numeric timer (e.g., "0:26")
  - Font: Sans-serif, Bold, 28px, white
  - Centered, top margin:12px below the score row

### Game Board (Grid)
- **Size:** Fills width with margin, height: ~50% of viewport height
- **Spacing From Timer:** 22px
- **Grid:** 3x3, thick white grid lines (3px, #FFF), square ratio
- **Tiles:** Each cell is slightly padded. Some tiles (active/winning?) have translucent grey background boxes (#464b6e, 60% opacity, border-radius:12px)
    - Grid lines extend edge-to-edge per cell.
    - Inner grid margin: 12px all sides.
- **Markers:** "X" (orange-yellow gradient), "O" (cyan gradient)
  - Size: 38-44px
  - X: Gradient from #FEBC66 (light) to #FE8366 (darker orange)
  - O: Gradient from #29E4FA (bright cyan) to #3CB5E8
  - Center-aligned in each cell.

### Result Banner (Bottom Text)
- **Text Example:** "X Win"
  - Color: Neon lime green (#CCFF44)
  - Font: Sans-serif, Bold, 28px, uppercase
  - Centered horizontally
  - Top Margin: 32px from bottom of game board.

---

## 3. Typography

| Region        | Font Family              | Weight   | Size (px) | Color          | Transform          |
|---------------|-------------------------|----------|-----------|----------------|--------------------|
| Header Level  | Helvetica Neue, Arial   | Medium   | 16        | #93FF96        | UPPER             |
| Stat Numbers  | Helvetica Neue, Arial   | Bold     | 22        | #FE8366 (nums) |                   |
| Timer         | Helvetica Neue, Arial   | Bold     | 28        | #FFF           |                   |
| Grid Letters  | Helvetica Neue, Arial   | ExtraBold| 38-44     | see Gradients  | Upper             |
| Result Banner | Helvetica Neue, Arial   | Black    | 28        | #CCFF44        | UPPER             |

---

## 4. Color Palette

```css
:root {
  --bg-gradient-top: #28204C;
  --bg-gradient-bottom: #23244C;
  --header-green-bg: #174833;
  --header-green-text: #93FF96;
  --score-red: #FE8366;
  --score-dash: #FFFFFF;
  --x-gradient-from: #FEBC66;
  --x-gradient-to: #FE8366;
  --o-gradient-from: #29E4FA;
  --o-gradient-to: #3CB5E8;
  --grid-line: #FFF;
  --tile-active-bg: #464b6e99; /* 60% opacity */
  --timer-text: #FFF;
  --result-banner: #CCFF44;
  --icon-button: #FFF;
}
```

---

## 5. Spacing and Sizing

- **Global padding (outer to inner content):** 12px left/right
- **Vertical gap between major sections:** 12-32px (increases for board/result areas)
- **Game grid cell size:** Equal height/width, grid fits container max width with 12px margin
- **Header/button radius:** 24px for round icons, 12px for pill shapes

---

## 6. Navigation & Interactive Elements

- **Back Button:** Circle, icon only, no label, top-left
- **Refresh Button:** Circle, icon only, top-right
- **Grid Interactivity:** Board cells respond to clicks/taps, visually highlight (using translucent background) as active or recently played
- **No hover states in screenshot, but recommend light glow on tap/active

---

## 7. Responsive/Adaptive

- Designed for mobile (portrait). For larger screens, center major elements and maintain proportional grid sizing and gutter spacing.

---

## 8. Icons & Media

- **All icons** (arrows, refresh, X, O): SVG or icon font, sharp with gradient fills corresponding to their color types.
- X and O: Large, gradient fills, occupy ~70-80% of cell.

---

## 9. Summary

This UI is clean, modern, with neon/gradient accents on a dark, soft-gradient background, using simple rounded elements, plentiful padding, and clear typographic hierarchy.

---

**For implementation, use flexbox for all layout groups and CSS grid for the tic tac toe board, using provided spacing, gradients, and colors for high visual fidelity.**  
