---
title: SOLID - Open Close Principle
date: 2024/4/23
description: 
tag: SOLID, OCP
author: tungdevpro
---

Chữ "O" trong nguyên lý SOLID đề cập đến "Open/Closed Principle" (Nguyên lý mở đóng). Nguyên lý này được định nghĩa bởi Bertrand Meyer vào năm 1988 và đóng một vai trò quan trọng trong việc thiết kế phần mềm linh hoạt và dễ bảo trì.

Nguyên lý Open/Closed nói rằng một class hoặc module phải mở để mở rộng (tức là, bạn có thể mở rộng các tính năng của nó) nhưng đóng lại để sửa đổi (không thể thay đổi mã nguồn của nó). Điều này có nghĩa là khi bạn muốn thay đổi hành vi của một hệ thống, bạn nên mở rộng bằng cách thêm mới, chứ không phải sửa đổi mã nguồn đã tồn tại.

Ví dụ, hãy xem xét một ứng dụng đơn giản quản lý hình học với các hình vuông và hình tròn. Đầu tiên, chúng ta có một interface `Employee`

```dart
abstract class Employee {
  double calculateSalary();
}
```

Tiếp theo, các lớp cụ thể cho mỗi loại nhân viên (ở đây chúng ta có 2 loại là nhân viên fulltime và parttime):

```dart
class FullTimeEmployee implements Employee {
  double monthlySalary;

  FullTimeEmployee(this.monthlySalary);

  @override
  double calculateSalary() {
    return monthlySalary;
  }
}

class PartTimeEmployee implements Employee {
  double hourlyRate;
  int hoursWorked;

  PartTimeEmployee(this.hourlyRate, this.hoursWorked);

  @override
  double calculateSalary() {
    return hourlyRate * hoursWorked;
  }
}
```

Khi bạn cần thêm một loại nhân viên mới, bạn có thể triển khai `Employee` mà không cần sửa đổi các lớp đã tồn tại. Ví dụ ở đây mình thêm ông nhân viên theo kiểu hợp đồng:

```dart
class ContractEmployee implements Employee {
  double contractAmount;

  ContractEmployee(this.contractAmount);

  @override
  double calculateSalary() {
    return contractAmount;
  }
}
```

Túm lại, bạn thêm hàng trăm hàng nghìn nhân viên theo kiểu khác thì bạn cũng không làm ảnh tưởng tới mã nguồn đã tồn tại :D

Thank for reading...