# When to Mock

## Rule

Mock only at **system boundary**:

- External APIs (payment, email, etc.).
- Time and randomness.
- File system access when real files are not appropriate.
- Databases (prefer test database).

Do not mock:

- Internal modules.
- Internal collaborators.
- Domain logic.
- Code controlled by the application.

Prefer the real dependency when it is deterministic, isolated, and practical to use in tests.

## Boundary Design

### 1. Use dependency injection

Pass external dependencies into the function that uses them.

```typescript
interface PaymentClient {
   charge(amount: number): Promise<void>
}

// Easy to mock
function processPayment(paymentClient: PaymentClient, order: Order): Promise<void> {
   return paymentClient.charge(order.total)
}
```

Do not construct the external dependency inside the function.

```typescript
// Hard to mock
function processPayment(order: Order): Promise<void> {
   const client = new StripeClient(process.env.STRIPE_KEY)
   return client.charge(order.total)
}
```

### 2. Use operation-specific interfaces

Expose one typed operation per external capability.

```typescript
interface UserApi {
   getUser(id: string): Promise<User>
   getOrders(userId: string): Promise<Order[]>
   createOrder(input: CreateOrderInput): Promise<Order>
}
```

Avoid generic boundary interfaces that require test mocks to branch on arguments.

```typescript
interface ApiClient {
   fetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}
```

## Validation

Before introducing a mock, verify:

- [ ] The dependency is a system boundary.
- [ ] Using the real dependency is impractical, nondeterministic, unsafe, or unavailable.
- [ ] The mock replaces the boundary, not internal application code.
- [ ] The boundary is injected.
- [ ] The mocked interface represents a specific external capability.
- [ ] The mock does not require branching on arguments to simulate multiple operations.
