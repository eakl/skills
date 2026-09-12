# Good and Bad Tests

## Good Tests

Test observable behavior through the public interface, not through mocks of internal behavior.

A test is good if it satisfies those conditions:

- Exercises a public interface.
- Verifies behavior a caller can observe.
- Does not inspect internal state or private implementation.
- Does not depend on internal call structure.
- Remains valid when implementation changes without changing behavior.
- Tests one behavior. Multiple assertions are allowed when they verify that same behavior.
- Uses expected values derived independently from the implementation.

```typescript
// GOOD: Tests observable behavior
test('user can checkout with valid cart', async () => {
   const cart = createCart()
   cart.add(product)
   const result = await checkout(cart, paymentMethod)
   expect(result.status).toBe('confirmed')
})
```

When persisted state must be verified, read it through a public interface.

```typescript
test('created user can be retrieved', async () => {
   const user = await createUser({ name: 'Alice' })
   const retrieved = await getUser(user.id)
   expect(retrieved.name).toBe('Alice')
})
```

## Bad Tests

Reject a test if it does not satisfies those conditions:

- Mocks an internal collaborator.
- Tests a private method.
- Inspects internal state or storage directly when a public interface can verify the behavior.
- Asserts internal call count, order, arguments, or implementation path.
- Breaks when implementation changes without changing observable behavior.
- Describes implementation mechanics instead of behavior.
- Computes the expected result using the same logic as the implementation.

**It tests implementation details or internal structure**:

```typescript
// BAD: Tests implementation details
test('checkout calls paymentService.process', async () => {
   const mockPayment = vi.mock(paymentService)
   await checkout(cart, mockPayment)
   expect(mockPayment.process).toHaveBeenCalledWith(cart.total)
})
```

**It bypasses the interface**:

```typescript
// BAD: Bypasses interface to verify
test('createUser saves to database', async () => {
   await createUser({ name: 'Alice' })
   const row = await db.query('SELECT * FROM users WHERE name = ?', ['Alice'])
   expect(row).toBeDefined()
})

// GOOD: Verifies through interface
test('createUser makes user retrievable', async () => {
   const user = await createUser({ name: 'Alice' })
   const retrieved = await getUser(user.id)
   expect(retrieved.name).toBe('Alice')
})
```

**The expected value restates the implementation**:

```typescript
// BAD: Expected value is recomputed the way the code computes it
test('calculateTotal sums line items', () => {
   const items = [{ price: 10 }, { price: 5 }]
   const expected = items.reduce((sum, i) => sum + i.price, 0)
   expect(calculateTotal(items)).toBe(expected)
})

// GOOD: Expected value is an independent, known literal
test('calculateTotal sums line items', () => {
   expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15)
})
```

## Validation

Before keeping a test, verify:

- [ ] It exercises a public interface.
- [ ] It verifies observable behavior.
- [ ] It does not verify implementation details.
- [ ] It tests one behavior.
- [ ] Its expected result is independent of the implementation.
