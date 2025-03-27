---
author: tungdevpro
pubDatetime: 2025-03-26T21:45:00Z
modDatetime: 2025-03-26T21:45:00Z
title: "Mastering State Management in Flutter: A BLoC Pattern Guide"
slug: mastering-state-management-in-flutter-a-bloc-pattern-guide
featured: true
draft: false
tags:
  - flutter
  - bloc
  - flutter_bloc
description: ""
---

As a mobile developer, not a single day that goes by without working with **state mangement**. You know, sometimes we have arguments about it, like:
- BLoC vs GetX which is better
- Is Riverpod better with BLoC
- ...

Nahhh. the whole state mangement is also a tool which makes it easy for developers to develop their applications for simply.
In my perpective, I have also worked mostly with **state management** like **BLoC**, **GetX** and **Provider**.
Everything has its good point and bad point, but over time, the one i like the most is **BLoC**. it's just because, i like the style and the objectives it strives to accomplish.

Before diving into how to implement BLoC, let's take a look at fundamental principles of the BLoC pattern

## Fundamental Principles of the BLoC pattern
- Events: These are triggered by user actions or external changes. BLoC listens to them and responds accordingly.
- States: These represent different UI conditions, changing based on events.
- Streams: A stream lets data flow asynchronously. BLoC listens for events and updates the UI by emitting new states.

## Configuring BLoC in Your Flutter App

note: in this post, i'm currently using **flutter 3.24.3** and **dart 3.5.3**

1. Adding dependencies
```yaml
dependencies:
  flutter_bloc: ^8.1.4
```
To install the package let's run:
```bash
flutter pub get
```
for example your directory structure like this:
```
📦 example_app
├─ android
├─ ios
├─ ...
└─ lib
   └─ main.dart
```
let's create like this:
```
📦 example_app
├─ android
├─ ios
├─ ...
└─ lib
   ├─ ui
   │  └─ home
   │     ├─ bloc
   │     │  ├─ home_bloc.dart
   │     │  ├─ home_state.dart
   │     │  └─ home_event.dart
   │     └─ home_page.dart
   └─ main.dart
```

2. Event
In *home_bloc.dart* file, please add the code below:
```dart
abstract class HomeEvent {}
class IncrementEvent extends HomeEvent {}
class DecrementEvent extends HomeEvent {}
```
3. State
In *home_state.dart* file, please add the code below:
```dart
class HomeState {
  final int count;
  
  HomeState(this.count);
}
```
4. Create the BLoC that handles the logic
```dart
import 'package:flutter_bloc/flutter_bloc.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  HomeBloc() : super(HomeState(0)) {
    on<IncrementEvent>((event, emit) {
      emit(HomeState(state.count + 1));
    });

    on<IncrementEvent>((event, emit) {
      emit(HomeState(state.count - 1));
    });
  }
}
```
5. Use the BLoC in UI
let's move on to *main.dart* file
```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BlocProvider(
        create: (context) => HomeBloc(),
        child: HomePage(),
      ),
    );
  }
}
```
6. Home Page
Use BlocBuilder to listen to state changes and update the UI.
```dart
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final bloc = BlocProvider.of<HomeBloc>(context);

    return Scaffold(
      body: Center(
        child: BlocBuilder<HomeBloc, HomeState>(
          builder: (context, state) {
            return Text(
              "Data: ${state.count}",
              style: TextStyle(fontSize: 24),
            );
          },
        ),
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          FloatingActionButton(
            onPressed: () => bloc.add(IncrementEvent()),
            child: Icon(Icons.add),
          ),
          FloatingActionButton(
            onPressed: () => bloc.add(DecrementEvent()),
            child: Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}
```

### How It Works
HomeBloc manages the counter state.
- IncrementEvent and DecrementEvent events trigger state changes.

- BlocProvider makes the CounterBloc available throughout the widget tree.

- BlocBuilder rebuilds the UI when the state updates.

### In short
**flutter_bloc** is a powerful choice for mobile developers who need clear, scalable, and testable state management. While it may be more complex than some other state management solutions like **Provider** or **GetX**, it provides significant benefits when working on large-scale applications with complex logic.

#### It's just like that, it's quite confusing for newbie

That's it. Thank you for reading ❤️