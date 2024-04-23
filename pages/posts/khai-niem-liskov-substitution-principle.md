---
title: SOLID - Liskov Substitution Principle
date: 2024/4/24
description: 
tag: SOLID, LSP
author: tungdevpro
---

Chữ "L" trong nguyên lý SOLID đề cập đến "Liskov Substitution Principle"

Nguyên lý này nói rằng các đối tượng của một lớp con có thể thay thế hoàn toàn các đối tượng của lớp cơ sở mà không làm thay đổi tính đúng đắn của chương trình. Nó đặt ra một tiêu chuẩn cho các lớp kế thừa: chúng không nên thay đổi hành vi của lớp cha.

Một cách đơn giản để hiểu nguyên lý này là: "Một đối tượng có thể thay thế bằng một thể hiện của một lớp con mà không làm thay đổi tính đúng đắn của chương trình".

Nguyên lý này hơi khó hiểu, để mình lấy ví dụ cho dễ hiểu:

```dart
abstract class Animal {
  String speak();
}
```

Tiếp theo, chúng ta triển khai lớp con `Dog` từ `Animal`:

```dart
class Dog implements Animal {
  @override
  String speak() {
    return "Gâu gâu, ẳng ẳng exciter 150";
  }
}
```

Và một lớp con khác là `Cat`:

```dart
class Cat implements Animal {
  @override
  String speak() {
    return "Mèo méo meo mèo meo";
  }
}
```

Bây giờ, theo nguyên lý **Liskov**, chúng ta có thể sử dụng đối tượng `Dog` hoặc `Cat` trong mọi nơi mà chúng ta sử dụng `Animal` mà không cần thay đổi logic hoặc hành vi của chương trình. Ví dụ:

```dart
void makeAnimalSpeak(Animal animal) {
  print(animal.speak());
}

void main() {
  final Animal dog = Dog();
  final Animal cat = Cat();

  makeAnimalSpeak(dog); // In ra "Gâu gâu, ẳng ẳng exciter 150"
  makeAnimalSpeak(cat); // In ra "Mèo méo meo mèo meo"
}
```