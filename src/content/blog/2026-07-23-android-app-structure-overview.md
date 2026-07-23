---
author: Andrew Do
pubDatetime: 2026-07-20T15:30:00Z
title: "Android App Structure: An Overview"
slug: android-app-structure-overview
featured: true
draft: false
tags:
  - android
description: ""
---

Before building an application with Jetpack Compose, we need to understand some key concepts about Android and developement in general.
As you are a mobile developer, probably you know Android which is structured as software stack. Every layer of stack, along with everything inside it, it carefully designed to work together perfectly.
It includes an OS, a runtime environment, middleware, services and libraries.

So you can see this image below at here:

![android_stack](https://developer.android.com/static/guide/platform/images/android-stack_2x.png)


## Linux Kernel

The Linux kernel is the foundation of Android. It provides the lowlevel bridge between device hardware and the rest of Android software stack. The layer manages core responsiblities like memories, processes,
networking, power and hardware drivers.

![Linux Kerne](/assets/blog/linux-kernel.png)

Some important of the Linux kernel include:

- **Process management**: controls how apps and system services run
- **Memory management**: decides how memory is allocated and released
- **Power management**: helps Android save battery and manage device sleep states
- **Security**: provides low level permission
- **Device drivers**: allow Android communicate with hardware such as camera, screen, audio, wifi, bluetooth and sensors.

As mobile developers, we usually dont work with the Linux kernel. Butm it still affects the behavior of our apps such as app startup, background work, memory usage, battery, file access and hardware features
all depend on service provided by this layer
So when we build Android apps, especially apps that care about performance or battery life, it's helpful to remember that everything eventually replies on this foundation.

## Hardware Abstraction Layer (HAL):

Above the Linux kernel, Android provides the Hardware Abstraction Layer. This layer defines standard interfaces that allow Android framework to communicate  with device hardware.
The important idea is that Android devices can have different hardware from different manufactures (*Google Pixel, Xiaomi, Samsung, Huawei v.v.v*), 
but Android framwork still need a consistent way to use those features

![Hardware abstraction layer](/assets/blog/hal.png)

Similar to the Linux kernel, we dont interact with Hardware Abstract layer directly. Instead, we use Android framwork APIs such as `CameraX`, `LocationManager`, `SensorManager` or `Bluetooth APIs`, Android use lowlevel
layers to access to the real device hardware.

Okay, to understand Hardware abstraction layer help us see why the same Android APIs can work across many different phones, even when the hardware inside those devices isnt same