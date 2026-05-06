# Numina Security Specification

## 1. Data Invariants
- **Products**: Only admins can create/update/delete. Anyone can read active products.
- **Orders**: Authenticated users can create orders. Users can only read their own orders. Admins can read all orders. Status can only be changed by admins.
- **Customers**: Users can read/write their own profile. Admins can read all. Users cannot modify their `tier` or `loyaltyPoints` directly.
- **Journal**: Only admins can write. Anyone can read published posts.
- **QuizResults**: Anyone can create. Only admins can read/list.
- **Admins**: Read-only for authenticated users to check roles. Write-only by existing owners (or service account).

## 2. The "Dirty Dozen" Payloads (Deny Cases)
1. **Spoofed Owner**: Create an order with `customerId` of another user.
2. **Shadow Field**: Update a product with `isFeatured: true` when not whitelisted.
3. **Privilege Escalation**: Update customer profile to set `tier: "Platinum"`.
4. **State Shortcut**: Update order status from `pending` to `delivered` directly as a user.
5. **ID Poisoning**: Create a product with a 2KB string as ID.
6. **Immutable Breach**: Change `createdAt` on an existing order.
7. **PII Leak**: Read another user's customer profile.
8. **Unverified Write**: Create an order without a verified email (if required).
9. **Junk Data**: Create a product with `price: "free"` (wrong type).
10. **System Field Injection**: Manually set `loyaltyPoints` during order creation.
11. **Admin Spoof**: Create a document in `/admins/` as a regular user.
12. **Blanket Read**: Query all orders without a `where` clause for `customerId`.

## 3. Test Runner (Draft Logic)
- `testOrderPrivacy`: `get(/orders/otherUserOrder)` -> Deny.
- `testProductReadOnly`: `update(/products/p1)` -> Deny for non-admin.
- `testLoyaltyLock`: `update(/customers/myId)` with `loyaltyPoints: 9999` -> Deny.
