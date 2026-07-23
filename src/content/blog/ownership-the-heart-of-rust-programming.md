---
author: Andrew
pubDatetime: 2024-09-07T20:31:00Z
modDatetime: 2024-12-04T18:00:47.400Z
title: Onwership - The Heart of Rust programming
description: ""
slug: onwership-the-heart-of-rust-programming
featured: true
draft: false
tags:
  - rust
  - onwership
---

What's up guy!!! I'm come back. Before we do that, i just want to talk that "Have everyone good a day" 😉.

Let's get started

### Quy Tắc Của Ownership
Rust quản lý bộ nhớ dựa trên ba quy tắc cơ bản về ownership:
1. Mỗi giá trị trong Rust đều có một biến sở hữu nó.
2. Một giá trị chỉ có thể có một chủ sở hữu tại một thời điểm.
3. Khi chủ sở hữu rời khỏi scope, giá trị đó sẽ dropped.

Ví dụ, với các primitive types như số nguyên, khi bạn gán giá trị cho một biến mới, Rust sẽ tạo một bản sao. Ngược lại, với các non-primitive types như string, Rust thực hiện cơ chế **move** để chuyển quyền sở hữu. Khi đó, biến ban đầu sẽ không còn hợp lệ.

> "Với các kiểu dữ liệu như số nguyên, Rust sẽ sao chép giá trị, tức là mỗi biến sẽ có vùng nhớ riêng. Nhưng với chuỗi, Rust sẽ chuyển quyền sở hữu từ biến ban đầu sang biến mới, đảm bảo chỉ một biến có thể sở hữu giá trị đó tại một thời điểm."

Dưới đây là mình sẽ tạo example sự khác biệt về ownership giữa các primitive types và string trong Rust:

### Ownership với Primitive Types

```rust
fn main() {
    let x = 20;       // x là một giá trị kiểu integer (primitive type)
    let y = x;       // Tạo một bản sao (copy) của giá trị x và gán cho y

    println!("x = {}, y = {}", x, y); // Cả x và y đều hợp lệ và có thể sử dụng
}
```

Vì ở đây x = 20 là một primitive type - i32 sẽ thực hiện cơ chế **copy**. Lúc này x, y đều có *vùng nhớ riêng biệt* cho nên x, y đều oki.

### Ownership với String

```rust
fn main() {
    let s1 = String::from("YH"); // s1 là 1 string
    let s2 = s1;                          // Ownership được chuyển từ s1 sang s2

    // println!("{}", s1); // Lỗi: s1 không còn hợp lệ sau khi ownership được chuyển
    println!("{}", s2);     // s2 hợp lệ và sở hữu chuỗi
}
```

Tại sao nhỉ? Vì ở đây thằng String không phải là primitive type (non-primitive type) cho nên cơ chế copy ở đây *không hoạt động* thay vào đó sẽ là cơ chế **move**

Fun 😎: Kiểu mình là chủ mảnh đất, sau một loạt quynh trình giấy tời, ký giấy bán đất, đóng giấu xác nhận cơ quan chức năng và nhận tiền. Thế là từ lúc đó mảnh đất không phải của mình nữa, mình không có quyền làm bất cứ điều gì nữa cả trên mảnh đất 💁


Ở ví dụ trên nếu chúng ta muốn giữ lại cả 2 biến s1 và s2 thì chúng ta sử dụng **clone()**

```rust
fn main() {
    let s1 = String::from("Hello, Rust!"); // s1 sở hữu chuỗi
    let s2 = s1.clone();                   // Tạo một bản sao độc lập của chuỗi

    println!("s1 = {}, s2 = {}", s1, s2);  // Cả s1 và s2 đều hợp lệ
}
```

Rất dễ hiểu phải không ạ :))

Tóm lại, cơ bản là ownership giúp Rust quản lý bộ nhớ trở nên an toàn và hiệu quả hơn mà không cần dùng đến *Garbage Collection* như trong Java.

Bài sau có thể mình sẽ lên bài về kết hợp cơ chế borrowing và references trong Rust.
Thank you for reading... <3
