# TypeScript OOP Concepts and Examples

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
