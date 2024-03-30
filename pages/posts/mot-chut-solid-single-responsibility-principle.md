---
title: Nói về Single Responsibility Principle (SRP)
date: 2024/2/16
description: View examples of all possible Markdown options.
tag: SOLID
author: tungdevpro
---

# Nói về Single Responsibility Principle (SRP)

Đươc Robert C. Martin (hay còn đươợc gọi là Uncle Bob) giới thiệu vào năm 2003. Single Responsibility Principle viết tắt là **SRP**. Trong nguyên lý này thì một class chỉ nên có một reason (lí do) để thay đổi hay còn được hiểu là mỗi class chỉ nên có duy nhất một nhiệm vụ.

Dưới đây là một ví dụ:
```dart
class User {
  final String? id;
  final String? name;
  final String? phone;

  User(this.id, this.name, this.phone);
  
  Future<void> register() async {}
  
  Future<void> sendNotfication() async {}

  Future<void> saveUser() async {}
}
```
Ở đây **User** chỉ nên có nhiệm vụ là lưu giữ thông tin của nguời dùng nhưng lại có các hàm xử lý **register**, **sendNotfication** và **saveUser** đã vi phạm nguyên tắc

Ở đây việc xử lý tạo tài khoản hay gửi thông báo thì chúng ta nên viết vào trong **AuthRepository** sẽ là:
```dart
class AuthRepository {
  Future<void> register() async {
    // Handle register
  }
  Future<void> sendNotfication() async {
    // Handle send notify 
  } 
}
```
còn lưu tài khoản thì sẽ đặt ở class **UserRepository**:
```dart
class UserRepository {
  Future<void> saveUser() async {
    // Handle save user
  }
}
```
Dưới đây và ví dụ khi thực thi flow:
```dart
class AuthRepository {
  final userRepo = UserRepository();

  Future<void> register() async {
    final result = await userRepo.saveUser();
    if(result.isFailure()) {
      // Handle error
      return;
    }
    sendNotfication();
  }

  Future<void> sendNotfication() async {
    // Handle send notify 
  } 
```

### Kết
Ở trên mỗi class có một nhiệm vụ riêng, khiến source trở nên *easy-to-read* (dễ đọc) và *easy-to-maintain* (dễ bảo trì) và unit test trở nên dễ dàng hơn.
Nếu bài viết còn nhiều thiếu sót thì hãy ping mình qua mail hay fb để mình khắc phục nhé.

Cám ơn mọi người đã đọc.
