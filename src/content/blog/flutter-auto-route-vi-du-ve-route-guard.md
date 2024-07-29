---
author: tungdevpro
pubDatetime: 2024-07-20T07:30:00Z
modDatetime: 2024-07-01T05:00:47.400Z
title: Flutter - Ví dụ về AutoRouteGuard
slug: flutter-auto-route-vi-du-ve-route-guard
featured: true
draft: false
tags:
  - flutter, auto_route, AutoRouteGuard
description: ""
---

## Route Guards

Nó là gì, ở đây tác giả có viết "Think of route guards as middleware or interceptors, routes can not be added to the stack without going through their assigned guards. Guards are useful for restricting access to certain routes.". Nó như là một *middleware* hay *interceptor*.
Middleware trong API là một component nằm giữa layer của một ứng dụng, giúp xử lý các request và response cho client. Nó thực hiện các action trước và sau khi request đến server hoặc đáp ứng được ném lại cho phía client. Ở đây em anh có thể hiểu đơn giản là: À trước khi tao chọc ngoáy đến các phần sâu hơn thì trước tiên mày phải thông qua tao cái đã 🤓 ( cái ở đây chính là Middleware).
Thế thì Route Guard cũng thế: trước tao khi navigate đến màn nào nó thì mày thông qua tao, xem mày có thoả mãn tao không đã thì tao mới cho mày đi tiếp không thì nghỉ
Mình lấy ví dụ về User authentication
## Example
Trước khi vô, anh em đảm bảo với tôi đã setup auto_route & và generator.
Anh em tạo một class AuthGuard được kế thừa class AutoRouteGuard

```dart
import 'package:auto_route/auto_route.dart';

@injectable
class AuthGuard extends AutoRouteGuard {
  final IsLoggedInUseCase _isLoggedInUseCase;

  AuthGuard(this._isLoggedInUseCase);

  @override
  void onNavigation(NavigationResolver resolver, StackRouter router) async{
  final isLoggedIn = await _isLoggedInUseCase.execute();
    if (isLoggedIn) {
      resolver.next(true);
    } else {
      router.push(LoginRoute(onResult: (success) {
        if (success == true) {
          resolver.next(true);
        } else {
          resolver.next(false);
        }
      }));
    }
  }
}
```
Ở đây mình có dùng thêm get_it & injectable để hỗ trợ việc generate dependency injection

 `isLoggedIn` là một biến boolean khi nhận kết quả từ class `_isLoggedInUseCase` để kiểm tra xem người dùng đã đăng nhập hay chưa.
 Ở đây `isLoggedIn` nếu bằng true thì sẽ được tiếp tục navigate thông qua `resolver.next(true)` hoặc không sẽ navigate về màn Login thông qua method `router.push(LoginRoute....)`.
 Nếu `resolver.next(false)` thì sẽ huỷ bỏ navigate.

Để thêm, anh em vào app_router.dart (ở đây app_router là nơi anh em định nghĩa các route nhé, tuỳ vào cách anh em đặt filename là gì).

```dart
import 'package:auto_route/auto_route.dart';
import 'package:example/screens/home_screen.dart';
import 'package:example/screens/profile_screen.dart';
import 'package:example/screens/login_screen.dart';
import 'package:example/auth_guard.dart';

part 'app_router.gr.dart';

@AutoRouterConfig()
class AppRouter extends $AppRouter {
  @override
  List<AutoRoute> get routes => [
    AutoRoute(page: HomeRoute.page, initial: true),
    AutoRoute(page: LoginRoute.page),
    AutoRoute(page: ProfileRoute.page, guards: [AuthGuard]),
  ];
}
```
Mỗi là khi navigate đến ProfileRoute thì AuthGuard sẽ được thực thi xem có tiếp tục navigate được nữa hay không. Rất simple & easy-to-read phải không anh em 😁😁

Thankiu anh em đã bỏ thời gian ra đọc nhé! 😊😊😊