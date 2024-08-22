---
author: tungdevpro
pubDatetime: 2024-08-14T22:30:00Z
title: Flutter - How to use Future.wait
slug: flutter-how-to-use-future-wait
featured: true
draft: false
tags:
  - flutter
  - future
  - future-wait
  - async
description: ""
---

## Getting started

Hi there, today we will get familiar with **future.wait** and how to use it. Even though, we have used **future** and commbine **async/await** to handle task asynchronous.
In some cases, we encountered calling multiple API at time.
```dart
StopWatch watch = StopWatch();

Future<void> fetchData() async {
    watch.start();
    final news = await _getNewsUseCase.invoke(); // 1000ms
    final promotion = await _getPromotionUseCase.invoke(); // 2000ms
    final notifies = await _getNotificationUseCase.invoke(); // 1000ms
    watch.stop();
    print("All APIs completed in ${watch.elapsedMilliseconds}")
    // Here it gonna display 4000ms 
}
```

Above example, at **fetchData** we have 3 functions which call to API but those 3 APIs do not depend on each other. Every time **fetchData** is called, the program takes *4000ms*. That's what we don't want, so use **Future.wait()** to reduce program time.

## Use Future.wait

Actually, use it quite easy. We only move many APIs into **Future.wait** method:

```dart
StopWatch watch = StopWatch();

Future<void> fetchData() async {
    watch.start();
    final response = await Future.wait([
      _getNewsUseCase.invoke(),
      _getPromotionUseCase.invoke(),
      _getNotificationUseCase.invoke(),
    ]);
    watch.stop();
    print("All APIs completed in ${watch.elapsedMilliseconds}")
    // Here it gonna display 2000ms
}
```

The above program has greatly reduced the API loading time, we increase the user experience performance for the app.
You can observe that **Future.wait()** completes the task much more quickly compared to using await individually on each asynchronous function.


## Final

**Future.wait()** method is significantly more efficient for handling multiple independent asynchronous operations. By using Future.wait, developers can streamline their code and improve overall performance.

Thank u for reading <3