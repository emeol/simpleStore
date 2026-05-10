### Pre-coding: Mockup & Component Hierarchy

Before writing code, sketch the UI and draw boxes around every component:

```
┌─────────────────────────────────────────────────┐
│ Header: [Logo]  [Home] [Cart (count)]  [Login]  │
├─────────────────────────────────────────────────┤
│ HomePage                                        │
│  ┌──────────────────────────────────────┐       │
│  │ SearchBar: [ search input... ]       │       │
│  └──────────────────────────────────────┘       │
│  ┌────────────────────────────────────────┐     │
│  │ CategoryFilter: [All][Electronics]... │      │
│  └────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────┐   │
│  │ ProductList                               │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐  │  │
│  │  │ProductCard│ │ProductCard│ │ProductCard│ │  │
│  │  │ [image]  │ │ title    │ │ price    │  │  │
│  │  │[Add Cart]│ │[Add Cart]│ │[Add Cart]│  │  │
│  │  └──────────┘ └──────────┘ └──────────┘  │  │
│  └──────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────────┘

Other pages: ProductDetailPage, CartPage, LoginPage
```

**Component tree:** `App → Header, <Routes>(HomePage, ProductDetailPage, CartPage, LoginPage), Footer`

---

### Pre-coding: State Analysis (Teaching exercise)

Apply the **"Is it state?"** test:

| Data | Unchanged? | From props? | Computed? | **Verdict** |
|------|:---:|:---:|:---:|---|
| Products list | No | No | No | **STATE** |
| Search text | No | No | No | **STATE** |
| Selected category | No | No | No | **STATE** |
| Filtered products | — | — | Yes (products + search + category) | NOT state (derived) |
| Cart items | No | No | No | **STATE** (global) |
| Cart total | — | — | Yes (sum of items) | NOT state (derived) |
| Cart count | — | — | Yes (items.length) | NOT state (derived) |
| Auth token / user | No | No | No | **STATE** (global) |
| Loading / error | No | No | No | **STATE** |

**State ownership:** HomePage owns search/category (local). CartContext owns cart items (global). AuthContext owns token/user (global).

---

### Phase 1: JSX & Components (Static version — no state)

**Concepts:** JSX syntax, creating components, component composition, list rendering, `key` prop.

1. Create `src/types.ts` — define `Product` interface: `{ id, title, price, description, category, image }`
2. Create `src/data/products.ts` — hardcoded array of ~6 products (copied from fakestoreapi response) as temporary mock data
3. Build `src/components/Header.tsx` — static header with store name, placeholder nav links
4. Build `src/components/Footer.tsx` — simple footer
5. Build `src/components/ProductCard.tsx` — renders one product: image, title, price, "Add to Cart" button (non-functional)
6. Build `src/components/ProductList.tsx` — imports hardcoded data, maps over it, renders `ProductCard` for each
7. Update App.tsx — compose: `<Header />`, `<ProductList />`, `<Footer />`
8. Add basic CSS in App.css — grid layout, card styling
9. Delete the empty Product.tsx

**Verification:** App renders a static page with header, 6 product cards in a grid, and footer. No interactivity.

---

### Phase 2: Props

**Concepts:** Passing props, TypeScript interfaces for props, callback props, one-way data flow.

1. Refactor `ProductCard` to accept a `Product` as a prop (instead of importing data)
2. Refactor `ProductList` to accept `products: Product[]` as a prop
3. Pass hardcoded array from `App → ProductList → ProductCard`
4. Add `onAddToCart` callback prop to `ProductCard` — wire to button, `console.log` for now
5. Update `Header` to accept `storeName` and `cartCount` props (hardcode `cartCount={0}`)

**Verification:** Same visual result. `console.log` fires on "Add to Cart" click.

---

### Phase 3: State & Events

**Concepts:** `useState`, event handling, controlled inputs, lifting state, derived state, conditional rendering.

1. Build `src/components/SearchBar.tsx` — controlled text input with `useState`
2. Build `src/components/CategoryFilter.tsx` — row of category buttons, tracks `selectedCategory`
3. Create `src/pages/HomePage.tsx` — lift search and category state here; compute `filteredProducts` (derived, NOT state)
4. Pass `filteredProducts` to `ProductList`
5. Add cart state in `App`: `useState<Product[]>([])`, pass `addToCart` handler down, update `cartCount` in `Header`
6. Conditional rendering: "No products found" when list empty; cart badge only when count > 0

**Verification:** Search filters in real-time. Category buttons filter. "Add to Cart" increments badge.

---

### Phase 4: Effects & API Fetching

**Concepts:** `useEffect`, dependency arrays, cleanup, async fetching, loading/error states, custom hooks.

1. Delete `src/data/products.ts` (no more hardcoded data)
2. In `HomePage`, add `useEffect` to fetch from `GET https://fakestoreapi.com/products` on mount
3. Add `loading` and `error` states — show spinner while loading, error message on failure
4. Build `src/components/LoadingSpinner.tsx`
5. Extract reusable `src/hooks/useFetch.ts` — `useFetch<T>(url)` returning `{ data, loading, error }`
6. Refactor `HomePage` to use `useFetch`
7. Fetch categories from `GET https://fakestoreapi.com/products/categories`

**Verification:** Products load from real API. Spinner shows during fetch. Error shown on network failure. Categories are dynamic.

---

### Phase 5: React Router

**Concepts:** Client-side routing, `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`, `useParams`, `useNavigate`.

1. Install `react-router-dom`
2. Create `src/pages/ProductDetailPage.tsx`, `src/pages/CartPage.tsx`, `src/pages/NotFoundPage.tsx`
3. Wrap `<App />` with `<BrowserRouter>` in main.tsx
4. Set up routes in App.tsx: `/` → HomePage, `/product/:id` → ProductDetailPage, `/cart` → CartPage, `*` → NotFoundPage
5. Replace `<a>` tags with `<Link>` in Header
6. Make `ProductCard` title/image a `<Link to={/product/${id}}>`
7. `ProductDetailPage` — use `useParams()` to get `id`, fetch single product via `useFetch`
8. Build `src/components/CartItem.tsx` and `src/components/CartSummary.tsx` for the CartPage
9. Use `useNavigate()` for programmatic navigation (e.g. after add to cart)

**Verification:** Clicking product navigates to detail. Back works. Cart page shows items. Nav links work without reload. Invalid URLs show 404.

---

### Phase 6: State Management — Context + useReducer

**Concepts:** Prop drilling problem, Context, `useReducer`, `useContext`, provider pattern.

1. **Motivate:** trace how cart state passes through App → Header, App → HomePage → ProductCard, App → CartPage → CartItem (prop drilling pain)
2. Create `src/context/CartContext.tsx`:
   - Actions: `ADD_TO_CART`, `REMOVE_FROM_CART`, `UPDATE_QUANTITY`, `CLEAR_CART`
   - `cartReducer(state, action)` function
   - `CartProvider` component + `useCart()` custom hook
3. Wrap App with `<CartProvider>`
4. Refactor all components to use `useCart()` instead of prop-drilled state — `Header`, `ProductCard`, `ProductDetailPage`, `CartPage`, `CartItem`, `CartSummary`
5. Remove all cart-related props from App and intermediate components

**Verification:** Cart works identically but with zero cart props passed through intermediaries.

---

### Phase 7: Authentication

**Concepts:** Auth flow, protected routes, `localStorage` persistence, conditional rendering by auth state.

1. Create `src/context/AuthContext.tsx`:
   - State: `{ user, token, isAuthenticated }`
   - `login(username, password)` → `POST https://fakestoreapi.com/auth/login` → stores token in localStorage
   - `logout()` → clears token
   - On mount: check localStorage for existing token
   - Export `useAuth()` hook
2. Wrap App with `<AuthProvider>`
3. Build `src/pages/LoginPage.tsx` — form, calls `login()`, shows errors, redirects on success
4. Build `src/components/ProtectedRoute.tsx` — checks `isAuthenticated`, redirects to `/login` if not
5. Protect `/cart` route with `ProtectedRoute`
6. Update `Header` — "Login" link vs "username | Logout"
7. (Optional) Build `src/pages/CheckoutPage.tsx` as another protected route

**Test credentials:** `username: "mor_2314"`, `password: "83r5^_"`

**Verification:** Login works with test credentials. Token persists across refresh. Cart redirects to login when unauthenticated. Logout clears session.

---

### React Concepts Covered Per Phase

| Phase | Concepts |
|-------|----------|
| 1 | JSX, components, composition, list rendering, `key` prop |
| 2 | Props, prop types, callback props, one-way data flow |
| 3 | `useState`, events, controlled inputs, lifting state, derived state, conditional rendering |
| 4 | `useEffect`, dependency arrays, cleanup, async fetch, loading/error, custom hooks |
| 5 | React Router, `<Link>`, `useParams`, `useNavigate`, dynamic routes |
| 6 | Context, `useReducer`, `useContext`, provider pattern, prop drilling solution |
| 7 | Auth flow, protected routes, localStorage, token persistence |

### Only Dependency to Install
- **Phase 5:** `react-router-dom`

---

Each phase builds on the previous one and is independently verifiable. Let me know if you'd like to adjust anything — scope, ordering, depth, additional concepts, or if you're ready to start implementing.










	
