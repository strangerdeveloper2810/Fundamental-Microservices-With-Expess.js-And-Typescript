# TypeScript OOP Concepts, SOLID, Microservices With Express.js and Examples

This repository demonstrates key Object-Oriented Programming (OOP) concepts in TypeScript, including primitive data types, abstraction, encapsulation, inheritance, and polymorphism (both static and dynamic). The examples showcase how to implement these concepts using TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Primitive Data Types](#primitive-data-types)
- [Abstraction](#abstraction)
- [Encapsulation](#encapsulation)
- [Inheritance and Polymorphism](#inheritance-and-polymorphism)
  - [Static Polymorphism](#static-polymorphism)
  - [Dynamic Polymorphism](#dynamic-polymorphism)
- [Usage](#usage)
- [OOP Recap](#oop-recap)

## Introduction

This repository provides examples of fundamental OOP principles in TypeScript, demonstrating how to use classes, inheritance, abstraction, and polymorphism to structure your code in a more maintainable and reusable way.

## Primitive Data Types

TypeScript has several primitive data types that can be used to define the type of a variable. These include:

### `undefined`

Used when a variable is declared but not yet assigned a value.

```typescript
let myUndefined: undefined = undefined;
```

### `null`

Represents the absence of any value.

```typescript
let myNull: null = null;
```

### `symbol`

Represents the absence of any value.

```typescript
let myNull: null = null;
```

### `Abstraction`

Abstraction is achieved using classes and abstract classes in TypeScript. An abstract class cannot be instantiated directly and is meant to be extended by other classes.

```typescript
abstract class Animal {
  constructor(readonly name: string) {}

  abstract eat(): void;
}

class Dog extends Animal {
  eat(): void {
    console.log("Dog eats pate");
  }
}

const myDog: Animal = new Dog("Sushi");
myDog.eat(); // Output: Dog eats pate
```

### `Framework Example with Abstraction`

```typescript
abstract class MyElement {
  abstract render(): string;
}

function engine(nodes: MyElement[]): string[] {
  return nodes.map((node) => node.render());
}

class ImageElement extends MyElement {
  render(): string {
    return "image";
  }
}

class TextElement extends MyElement {
  render(): string {
    return "text";
  }
}

class HyperText extends MyElement {
  render(): string {
    return "hyper-text";
  }
}

const result = engine([new ImageElement(), new TextElement()]);
console.log(result); // Output: ["image", "text"]
```

### `Encapsulation`

Encapsulation is the practice of bundling the data (variables) and the methods that operate on the data into a single unit called a class. In the example below, we encapsulate the methods for starting the car engine.

```typescript
class CarEngine {
  public start() {
    this.step1();
    this.step2();
    this.step3();
  }

  private step1() {}
  private step2() {}
  private step3() {}
}

const myCarEngine = new CarEngine();
myCarEngine.start(); // The car engine starts with encapsulated methods
```

### `Inheritance and Polymorphism`

### `Static Polymorphism (Compile-Time Polymorphism)`

Static polymorphism is achieved through method overloading, where multiple methods with the same name are defined with different parameter types. The correct method is chosen at compile time.

```typescript
class MathOperations {
  add(a: number, b: number): number;
  add(a: string, b: string): string;

  add(a: any, b: any): any {
    return a + b;
  }
}

const math = new MathOperations();
console.log(math.add(5, 10)); // Output: 15
console.log(math.add("Hello, ", "World!")); // Output: "Hello, World!"
```

### `Dynamic Polymorphism (Run-Time Polymorphism)`

Dynamic polymorphism occurs at runtime and is implemented using method overriding, where a method is redefined in subclasses. The method called is determined at runtime based on the actual object type.

```typescript
class Animal {
  speak(): void {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak(): void {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak(): void {
    console.log("Cat meows");
  }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach((animal) => animal.speak());
// Output: Dog barks
// Output: Cat meows
```

### `OOP Recap`

Encapsulation: Grouping and hiding class information.
Abstraction: Hiding details and exposing only necessary functionalities.
Inheritance: Sharing information between classes.
Polymorphism: Redefining information (either statically or dynamically).

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

---

### `Usage`

1. Clone the repository:

```bash
git clone https://github.com/strangerdeveloper2810/Fundamental-Microservices-With-Expess.js-And-Typescript.git
```

2. Navigate to the project directory:

```bash
cd Lession2-OOP
```

3. Install the dependencies:

```bash
npm install
```

4. Compile the TypeScript code(install ts-node and typescript global):

```bash
npm run dev
```
