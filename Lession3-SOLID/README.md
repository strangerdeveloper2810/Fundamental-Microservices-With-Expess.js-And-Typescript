# SOLID Principles and Encapsulation in TypeScript

## Before Applying SOLID

The `ItemBeforeSolid` class below violates the **Single Responsibility Principle (SRP)** because it handles multiple responsibilities:

- Managing price and quantity
- Comparing item specifications
- Encoding and serializing item information
- Handling database operations

This creates tight coupling and makes the class difficult to maintain.

```typescript
class ItemBeforeSolid {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly type: string,
    readonly color: string,
    readonly imgUrl: string,
    public price: number,
    public quantity: number
  ) {}

  setPrice(newPrice: number): boolean {
    if (newPrice <= 0) return false;
    this.price = newPrice;
    return true;
  }

  increaseQuantity(amount: number): boolean {
    if (amount <= 0) return false;
    this.quantity += amount;
    return true;
  }

  decreaseQuantity(amount: number): boolean {
    if (amount <= 0 || this.quantity - amount < 0) return false;
    return true;
  }

  compare(itemBeforeSolid: ItemBeforeSolid): boolean {
    return (
      this.name === itemBeforeSolid.name &&
      this.type === itemBeforeSolid.type &&
      this.color === itemBeforeSolid.color
    );
  }

  encodeToString(): string {
    return `${this.id}-${this.type}-${this.color}`;
  }

  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      type: this.type,
      color: this.color,
      imgUrl: this.imgUrl,
      price: this.price,
      quantity: this.quantity,
    });
  }

  saveToDB(db: any): boolean {
    console.log("saving to db...");
    return true;
  }

  removeFromDB(db: any): boolean {
    console.log("removing from db...");
    return true;
  }
}
```

---

## After Applying SOLID

By applying SOLID principles, we refactor the code as follows:

### **Class `ItemSpec`**

- Responsible for managing the **specifications** (name, type, color) of the item.
- Adheres to **SRP (Single Responsibility Principle)**.

```typescript
class ItemSpec {
  constructor(
    readonly name: string,
    readonly type: string,
    readonly color: string
  ) {}

  compare(itemSpecSolid: ItemSpec): boolean {
    return (
      this.name === itemSpecSolid.name &&
      this.type === itemSpecSolid.type &&
      this.color === itemSpecSolid.color
    );
  }
}
```

### **Class `ItemApplySolid`**

- Manages price, quantity, and behaviors related to the item.
- Uses **encapsulation** to protect `price` and `quantity` properties through getters and setters.
- Delegates specification comparison to the `ItemSpec` class.

```typescript
class ItemApplySolid {
  constructor(
    readonly id: number,
    readonly spec: ItemSpec,
    readonly imgUrl: string,
    private _price: number,
    private _quantity: number
  ) {}

  get price(): number {
    return this._price;
  }

  set price(newPrice: number) {
    if (newPrice <= 0) throw new Error("Price must be greater than 0");
    this._price = newPrice;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(newQuantity: number) {
    if (newQuantity < 0) throw new Error("Quantity cannot be negative");
    this._quantity = newQuantity;
  }

  increaseQuantity(amount: number): boolean {
    if (amount <= 0) return false;
    this._quantity += amount;
    return true;
  }

  decreaseQuantity(amount: number): boolean {
    if (amount <= 0 || this._quantity - amount < 0) return false;
    this._quantity -= amount;
    return true;
  }

  compare(spec: ItemSpec): boolean {
    return this.spec.compare(spec);
  }

  encodeToString(): string {
    return `${this.id}-${this.spec.name}-${this.spec.type}-${this.spec.color}`;
  }

  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      name: this.spec.name,
      type: this.spec.type,
      color: this.spec.color,
      imgUrl: this.imgUrl,
      price: this._price,
      quantity: this._quantity,
    });
  }
}
```

---

## Explanation of SOLID Principles

1. **SRP (Single Responsibility Principle)**:

   - Each class has one responsibility:
     - `ItemSpec`: Manages item specifications.
     - `ItemApplySolid`: Manages item pricing, quantity, and behaviors.

2. **OCP (Open/Closed Principle)**:

   - Classes are open for extension but closed for modification. For example, adding methods like `applyDiscount()` doesn't require changing existing logic.

3. **LSP (Liskov Substitution Principle)**:

   - Objects of `ItemSpec` or `ItemApplySolid` can be replaced with instances of derived classes without altering correctness.

4. **ISP (Interface Segregation Principle)**:

   - Classes only implement methods relevant to their responsibility, avoiding unnecessary dependencies.

5. **DIP (Dependency Inversion Principle)**:
   - High-level modules (e.g., `ItemApplySolid`) depend on abstractions (`ItemSpec`) rather than concrete implementations.

---

## Encapsulation

**Encapsulation** is the practice of restricting access to the internal state of an object and only exposing necessary behavior through public methods or properties.  
In this example:

- `_price` and `_quantity` are private.
- Access is controlled via getter/setter methods.
- This ensures:
  - Validation is enforced (e.g., price > 0, quantity >= 0).
  - The internal state remains consistent and protected.

Encapsulation provides flexibility for future changes while maintaining a clear and secure API.
