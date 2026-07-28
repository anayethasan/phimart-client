# PhiMart

PhiMart is a full-stack e-commerce platform with a **React** frontend and a **Django REST Framework** backend. It supports product browsing, cart & checkout, order tracking, an online **payment gateway**, customer reviews, and a role-based admin dashboard for managing products, categories, orders, reviews, and users.

---

## Features

### Customer
- Browse products with search, category filter, price range filter, and sorting
- Product detail page with image gallery
- Add to cart / Buy Now (requires login)
- Checkout with **online payment gateway** integration
- Track order status (Not Paid, Ready to Ship, Shipped, Delivered, Canceled)
- Cancel an order (only while it's still cancellable)
- Leave, edit, and delete product reviews (star rating + comment)
- View personal order history and review history

### Admin (`is_staff` only)
- Dashboard overview
- Product management — create, edit, delete, upload/remove product images
- Category management — create, edit, delete
- Order management — view all orders, update order status, delete orders
- Review moderation — view and delete any user's review
- User list (read-only)

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- React Hook Form
- Axios (with a separate authenticated client for protected routes)
- Tailwind CSS + daisyUI
- React Icons

**Backend**
- Django & Django REST Framework
- JWT-based authentication
- Cloudinary for image storage
- Payment gateway integration (server-initiated, redirect-based checkout)
- drf-yasg for interactive API docs (Swagger)

---

## Project Structure (frontend)

```
src/
├── assets/            # Static images (e.g. default product image)
├── hook/              # Custom hooks (useFetchProduct, useFetchCategories, useAuthContext, ...)
├── services/          # Axios clients (api_services.js, auth-api-client.js)
├── pages/
│   ├── dashboard/      # Admin-only pages (products, categories, orders, users, reviews)
│   └── shop/           # Customer-facing shop pages
└── components/         # Shared, reusable UI pieces
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A running instance of the PhiMart backend API

### Installation

```bash
git clone <your-repo-url>
cd phimart-client
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-backend-url/api/v1
```

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

---

## API Overview

The frontend talks to a Django REST Framework backend. Key endpoints include:

| Resource | Endpoint |
|---|---|
| Products | `/products/` |
| Product Images | `/products/{product_pk}/images/` |
| Categories | `/categories/` |
| Reviews | `/products/{product_pk}/reviews/` |
| Orders | `/orders/` |
| Order Status Update | `/orders/{id}/update_status/` |
| Payment | `/payment/initiate/` |
| Users (admin) | `/auth/users/` |

Two API clients are used on the frontend:
- **`apiClient`** — for public, unauthenticated GET requests (browsing products, categories, reviews).
- **`authApiClient`** — attaches the logged-in user's JWT and is used for anything that creates, updates, or deletes data.

---

## Payment Gateway Integration

Checkout uses a **redirect-based payment flow**:

1. When the customer clicks **Pay Now** on an order, the frontend calls:
   ```
   POST /payment/initiate/
   { "amount": <order total>, "orderId": <order id>, "numItems": <item count> }
   ```
2. The backend creates a payment session with the payment provider and returns a `payment_url`.
3. The browser is redirected to `payment_url`, where the customer completes payment on the provider's hosted page.
4. On success, the provider redirects back to the app's success route (`/dashboard/payment/success`), and the order status updates accordingly (e.g. from **Not Paid** to **Ready to Ship**).

> Replace *"payment provider"* above with the actual gateway you're using (e.g. SSLCommerz, Stripe, etc.) so anyone reading this README knows exactly which service is integrated and what backend credentials/config are required.

---

## Authentication & Roles

- Authentication is JWT-based; the logged-in user's info (including `is_staff`) is available via the `useAuthContext()` hook.
- Regular users can only manage their own orders and reviews.
- Users with `is_staff: true` get full access to the admin dashboard and can manage all products, categories, orders, and reviews.

---

## License

This project is for educational/personal use. Add a license here if you plan to open-source it.