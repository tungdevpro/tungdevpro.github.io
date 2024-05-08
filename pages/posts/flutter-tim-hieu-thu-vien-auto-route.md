---
title: Flutter - Tìm hiểu về thư viện auto_route
date: 2024/5/08
description: 
tag: flutter, auto_route
author: tungdevpro
---

Hello anh em, đợt tới mình có join một project về education và impl dựa trên một bộ base do anh Lead bên mình dựng, trong đó có sử dụng plugin là `auto_route`. Và nay chúng ta sẽ tìm hiểu về nó

### Mở bát
`auto_route` là gì: 

Là một thư viện trong Flutter được sử dụng để quản lý điều hướng trong ứng dụng của bạn. Nó cho phép bạn xác định các tuyến đường của ứng dụng một cách dễ dàng và an toàn, đồng thời tự động sinh mã để tạo ra các hàm điều hướng và các lớp tương ứng.
Anh em hiểu đơn giản là chỉ để điều hướng (navigation)

Các features chính của `auto_route` bao gồm:

- **Annotation-driven routing**: Bạn có thể xác định các tuyến đường thông qua các chú thích trên các lớp màn hình của bạn, giúp giảm thiểu lỗi và tăng tính tự động hóa.
- **Type-safe routing**: sử dụng kiểu an toàn cho điều hướng, điều này có nghĩa là các tuyến đường được kiểm tra tại thời điểm biên dịch, giúp phát hiện lỗi sớm hơn.
- **Code generation**: Thư viện tự động sinh mã để tạo ra các lớp điều hướng và các phương thức liên quan, giúp bạn tránh việc phải viết mã điều hướng thủ công và giảm bớt lỗi (Chỉ có điều lúc generate file thì hơi lâu :D).
- **Customizable navigation transitions**: Bạn có thể dễ dàng tùy chỉnh các hiệu ứng chuyển đổi khi điều hướng giữa các màn hình.
- **Nested navigation**: hỗ trợ điều hướng lồng nhau, giúp bạn tổ chức ứng dụng của mình một cách hiệu quả (Đơn giản anh em có thể navigate đến các screen mà vẫn giữ được **Navigation Bottom Bar**).
- **Deep linking**: Mở đến screen bằng link

Trên đây là lý thuyết về `auto_route`, phần sau bắt đầu mình làm example cho features

Thank for reading... <3