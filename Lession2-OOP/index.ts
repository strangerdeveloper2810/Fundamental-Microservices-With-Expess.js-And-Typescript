console.log("Hello typescript");

// Kiểu dữ liệu undefined (thường được dùng cho biến chưa được khởi tạo giá trị), rơi vào trường hợp kiểu dữ liệu không có(nghĩa là chưa khai báo hoặc kh tồn tại)
let myUndefined: undefined = undefined;

// Kiểu dữ liệu: null(có ý nghĩa là không có dữ liệu)
let myNull: null = null;

// Kiểu dữ liệu symbol (sử dụng cho các giá trị duy nhất)
let mySymbol: symbol = Symbol("laksjdklasj");

// Arrow function kh nên dc dùng làm method của class và object(vì arrow function kh có con trỏ this)

// Abstraction
// class Cat {
//   //   name?: string; // props name có thể là undefined
//   //   age!: number; // khẳng định là khi dùng age sẽ có dữ liệu

//   // cách 1
//   //   name: string;
//   //   age: number;

//   //   constructor(name: string, age: number) {
//   //     this.name = name;
//   //     this.age = age;
//   //   }

//   // Cách 2:
//   constructor(readonly name: string, readonly age: number) {}

//   eat(): void {
//     console.log(`${this.name} is eating`);
//   }
// }

// const moCat = new Cat("Mo", 2);

// moCat.eat();

// abstract class Animal {
//   constructor(readonly name: string) {}

//   abstract eat(): void;
// }

// class Dog extends Animal {
//   eat(): void {
//     console.log("pate");
//   }
// }

// const myDog: Animal = new Dog("sushi");
// myDog.eat();

//-------Framework----------//
abstract class MyElement {
  abstract render(): string;
}

function engine(nodes: MyElement[]): string[] {
  return nodes.map((node) => node.render());
}

//-------Client code----------//

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
  //over ride
  render(): string {
    return "hyper-text";
  }
}
const result = engine([new ImageElement(), new TextElement()]);

console.log(result);

// Encapsulation
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

myCarEngine.start();

//inheritance -> single inheritance

//polymorphism -> cho phép 1 đối tượng, phương thức hoặc class có nhiều hình thức khác nhau.

//Static and dymamic Polymorphism

/* Static Polymorphism (Đa hình tĩnh) 
Định nghĩa:
Xảy ra tại thời điểm biên dịch (compile time).
Thường được thực hiện thông qua method overloading (nạp chồng phương thức) hoặc operator overloading (nạp chồng toán tử).
*/

class MathOperations {
  // Overload signatures : Đây là các overload signatures. Chúng không có phần thân (implementation) và chỉ mô tả các kiểu đầu vào và đầu ra của phương thức add.

  add(a: number, b: number): number;
  add(a: string, b: string): string;

  // Method implementation
  add(a: any, b: any): any {
    return a + b;
  }
}

const math = new MathOperations();
console.log(math.add(5, 10)); // Kết quả: 15
console.log(math.add("Hello, ", "World!")); // Kết quả: "Hello, World!"

/**
 * Dynamic Polymorphism (Đa hình động)
 * Định nghĩa:
Xảy ra tại thời điểm chạy (runtime).
Thường được thực hiện thông qua method overriding (ghi đè phương thức).

 */
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

/**
 * TypeScript hỗ trợ Dynamic Polymorphism đầy đủ thông qua method overriding.
Static Polymorphism chỉ có thể giả lập bằng cách sử dụng overload signatures. Tuy nhiên, cách này có hạn chế và không mạnh mẽ như các ngôn ngữ OOP khác.
 */

// Static Polymorphism và Dynamic Polymorphism trong Java

/**
 * 
 * class Calculator {
    // Overloaded methods
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    String add(String a, String b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // Compiler quyết định phương thức nào sẽ được gọi dựa trên kiểu tham số
        System.out.println(calc.add(5, 10));          // Kết quả: 15
        System.out.println(calc.add(2.5, 3.5));      // Kết quả: 6.0
        System.out.println(calc.add("Hello, ", "World!")); // Kết quả: "Hello, World!"
    }
}
    Giải thích:
Method Overloading:
Các phương thức add có cùng tên nhưng khác kiểu tham số.
Compiler sẽ phân tích kiểu tham số của mỗi lời gọi và chọn phương thức phù hợp tại compile-time.
Không có sự thay đổi hành vi của phương thức add tại runtime.
Đây là lý do Static Polymorphism được gọi là Compile-Time Polymorphism.
 */

/**
 * 2. Dynamic Polymorphism (Run-Time Polymorphism)
 * Dynamic Polymorphism trong Java được thực hiện thông qua method overriding. Quyết định phương thức nào sẽ được gọi xảy ra tại thời điểm chạy (run-time), dựa trên kiểu thực tế của đối tượng.
 * 
 * class Animal {
    void speak() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();  // Biến kiểu Animal, nhưng đối tượng thực tế là Dog
        Animal myCat = new Cat();  // Biến kiểu Animal, nhưng đối tượng thực tế là Cat

        myDog.speak(); // Kết quả: Dog barks
        myCat.speak(); // Kết quả: Cat meows
    }
}
Giải thích:
Method Overriding:
Lớp Dog và Cat ghi đè phương thức speak của lớp cha Animal.
Quyết định phương thức nào sẽ được gọi phụ thuộc vào kiểu thực tế của đối tượng (Dog hoặc Cat) tại runtime.
Runtime Behavior:
Mặc dù biến myDog và myCat có kiểu compile-time là Animal, nhưng tại runtime, JVM kiểm tra kiểu thực tế (Dog hoặc Cat) để gọi phương thức tương ứng.
 */

//Recap OOP TS

/**
 * Encapsulation -> grouping/ hiding information(nhóm và giấu các thông tin của class)
 * Abstraction -> hiding information(che giấu các thông tin)
 * Inheritance -> share information(chia sẻ thông tin)
 * Poly morphism -> redefine information(tái định nghĩa thông tin)
 */
