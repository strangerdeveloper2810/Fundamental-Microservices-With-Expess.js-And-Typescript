// =====================================
// Trước khi áp dụng SOLID
// =====================================
// Class ItemBeforeSolid quản lý nhiều trách nhiệm khác nhau:
// 1. Thay đổi giá và số lượng
// 2. So sánh đặc điểm của item
// 3. Encode thông tin
// 4. Xử lý lưu/xóa dữ liệu database
// => Điều này vi phạm SRP (Single Responsibility Principle - Nguyên lý trách nhiệm đơn),
// vì class này chịu trách nhiệm quá nhiều, khiến việc mở rộng, bảo trì khó khăn.
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

  // Các phương thức dưới đây không nên nằm chung trong một class.

  // Thay đổi giá
  setPrice(newPrice: number): boolean {
    if (newPrice <= 0) return false;
    this.price = newPrice;
    return true;
  }

  // Tăng số lượng
  increaseQuantity(amount: number): boolean {
    if (amount <= 0) return false;
    this.quantity += amount;
    return true;
  }

  // Giảm số lượng
  decreaseQuantity(amount: number): boolean {
    if (amount <= 0 || this.quantity - amount < 0) return false;
    return true;
  }

  // So sánh đặc điểm của item
  compare(itemBeforeSolid: ItemBeforeSolid): boolean {
    return (
      this.name === itemBeforeSolid.name &&
      this.type === itemBeforeSolid.type &&
      this.color === itemBeforeSolid.color
    );
  }

  // Encode thông tin thành chuỗi
  encodeToString(): string {
    return `${this.id}-${this.name}-${this.type}-${this.color}`;
  }

  // Chuyển thông tin sang định dạng JSON
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

  // Lưu vào database (quản lý dữ liệu không phải trách nhiệm của Item)
  saveToDB(db: any): boolean {
    console.log("saving to db...");
    return true;
  }

  // Xóa khỏi database
  removeFromDB(db: any): boolean {
    console.log("removing from db...");
    return true;
  }
}

// =====================================
// Sau khi áp dụng SOLID
// =====================================
// Tách logic thành các class nhỏ hơn, mỗi class có một trách nhiệm duy nhất
// và tuân thủ nguyên lý đóng gói (encapsulation).

// Class ItemSpec chịu trách nhiệm quản lý đặc điểm (name, type, color) của item.
// => Áp dụng SRP (Single Responsibility Principle)
class ItemSpec {
  constructor(
    readonly name: string,
    readonly type: string,
    readonly color: string
  ) {}

  // So sánh đặc điểm của item
  compare(itemSpecSolid: ItemSpec): boolean {
    return (
      this.name === itemSpecSolid.name &&
      this.type === itemSpecSolid.type &&
      this.color === itemSpecSolid.color
    );
  }
}

// Class ItemApplySolid chịu trách nhiệm quản lý giá, số lượng và các hành vi khác của item.
// => Áp dụng SRP: Class chỉ chịu trách nhiệm quản lý logic liên quan đến item
// => Áp dụng Encapsulation: Các dữ liệu nhạy cảm như price, quantity được quản lý chặt chẽ qua getter/setter.
class ItemApplySolid {
  constructor(
    readonly id: number,
    readonly spec: ItemSpec, // Đặc điểm được truyền vào từ class ItemSpec
    readonly imgUrl: string,
    private _price: number,
    private _quantity: number
  ) {}

  // Getter và Setter cho price
  get price(): number {
    return this._price;
  }

  set price(newPrice: number) {
    if (newPrice <= 0) throw new Error("Price must be greater than 0");
    this._price = newPrice;
  }

  // Getter và Setter cho quantity
  get quantity(): number {
    return this._quantity;
  }

  set quantity(newQuantity: number) {
    if (newQuantity < 0) throw new Error("Quantity cannot be negative");
    this._quantity = newQuantity;
  }

  // Tăng số lượng
  increaseQuantity(amount: number): boolean {
    if (amount <= 0) return false;
    this._quantity += amount;
    return true;
  }

  // Giảm số lượng
  decreaseQuantity(amount: number): boolean {
    if (amount <= 0 || this._quantity - amount < 0) return false;
    this._quantity -= amount;
    return true;
  }

  // So sánh đặc điểm với một ItemSpec khác
  compare(spec: ItemSpec): boolean {
    return this.spec.compare(spec);
  }

  // Encode thông tin thành chuỗi
  encodeToString(): string {
    return `${this.id}-${this.spec.name}-${this.spec.type}-${this.spec.color}`;
  }

  // Chuyển thông tin sang định dạng JSON
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

// =====================================
// Giải thích các nguyên lý SOLID
// =====================================

// 1. SRP (Single Responsibility Principle - Nguyên lý trách nhiệm đơn)
//    Mỗi class chỉ có một trách nhiệm duy nhất:
//    - ItemSpec: Quản lý đặc điểm của item.
//    - ItemApplySolid: Quản lý logic liên quan đến giá, số lượng, và hành vi của item.

// 2. OCP (Open/Closed Principle - Nguyên lý đóng/mở)
//    Class có thể mở rộng bằng cách thêm các method mới (như addDiscount() trong tương lai),
//    mà không cần chỉnh sửa logic hiện tại.

// 3. LSP (Liskov Substitution Principle - Nguyên lý thay thế Liskov)
//    Các class con hoặc đối tượng liên quan có thể thay thế nhau mà không phá vỡ logic hiện tại.

// 4. ISP (Interface Segregation Principle - Nguyên lý phân tách giao diện)
//    Không bắt buộc mọi class phải implement toàn bộ method.
//    Chỉ cần triển khai các method phù hợp với trách nhiệm của chúng.

// 5. DIP (Dependency Inversion Principle - Nguyên lý đảo ngược phụ thuộc)
//    Các class cao cấp (ItemApplySolid) không phụ thuộc trực tiếp vào chi tiết (ItemSpec).
//    Việc so sánh đặc điểm được giao cho ItemSpec, giúp tách biệt trách nhiệm rõ ràng hơn.

// =====================================
// Giải thích kỹ thuật Encapsulation (Đóng gói)
// =====================================

// Encapsulation là việc bảo vệ dữ liệu bên trong object và chỉ cho phép thao tác qua các method public.
// Trong ví dụ này:
// - Các thuộc tính `price` và `quantity` được đặt là `private`.
// - Sử dụng getter/setter để kiểm soát việc truy cập và thay đổi dữ liệu.
// - Điều này đảm bảo rằng dữ liệu luôn hợp lệ và không bị chỉnh sửa trực tiếp ngoài class.
