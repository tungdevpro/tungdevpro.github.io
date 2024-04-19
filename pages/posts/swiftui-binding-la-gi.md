---
title: SwiftUI - Binding là cái gì
date: 2024/4/19
description: 
tag: SwiftUi, binding
author: tungdevpro
---

Trong SwiftUI, `@Binding` được sử dụng để tạo một liên kết hai chiều giữa các dữ liệu. Điều này cho phép bạn truy cập và chỉnh sửa dữ liệu từ nhiều nơi mà không cần truyền dữ liệu qua lại giữa chúng.

Khi bạn khai báo một thuộc tính với `@Binding`, nó sẽ tạo ra một kết nối đến một giá trị được lưu trữ ở một nơi khác. Khi giá trị của thuộc tính được thay đổi, thì giá trị của biến khác cũng được cập nhật theo và ngược lại.

Ở đây mình sẽ lấy ví dụ đơn giản:

```swift
struct ContentView: View {
    @State private var isDark: Bool = false
    
    var body: some View {
        ZStack {
        	BackgroundView(isDark: isDark)
        	Button {
        		self.handleToggle()
        	} label {
        		Text("Toggle")
        	}
        }
    }

    func handleToggle() {
		self.isDark.toggle()
    }
}

struct BackgroundView: View {
    var isDark: Bool
    
    var body: some View {
        LinearGradient(gradient: Gradient(colors: [isDark ? .black : .blue, isDark ? .gray : .white]),
         startPoint: .topLeading, endPoint: .bottomTrailing)
         .edgesIgnoringSafeArea(.all)
    }
}

```

Khi mà bấm button toggle thì vẫn run bình thường. Nhưng trường hợp xảy ra như thế này. Bây giờ button toggle lại nằm trong view con  **BackgroundView** thì lúc này chúng ta phải khai báo parameter là một function:


```swift
struct ContentView: View {
    @State private var isDark: Bool = false
    
    var body: some View {
        ZStack {
        	BackgroundView(isDark: isDark, doSomething: self.handleToggle())
        }
    }

    func handleToggle() {
		self.isDark.toggle()
    }
}

struct BackgroundView: View {
	var doSomething : () -> ()
    var isDark: Bool
    
    var body: some View {
        LinearGradient(gradient: Gradient(colors: [isDark ? .black : .blue, isDark ? .gray : .white]),
         startPoint: .topLeading, endPoint: .bottomTrailing)
         .edgesIgnoringSafeArea(.all)
     	Button {
    		self.doSomething()
    	} label {
    		Text("Toggle")
    	}
    }
}
```

Nhìn thấy đoạn code trên trở nên rất phức tạp, thế nên SwiftUI cung cấp cho chúng ta khái niệm `@Binding` mà mình đã đề cập ở trên thì đoạn code sẽ easy-to-read đi rất nhiều:

```swift
struct ContentView: View {
    @State private var isDark: Bool = false
    
    var body: some View {
        ZStack {
        	BackgroundView(isDark: isDark)
        }
    }
}

struct BackgroundView: View {
	// var doSomething : () -> () // bỏ dòng này
    @Binding var isDark: Bool // và thêm @Binding
    
    var body: some View {
        LinearGradient(gradient: Gradient(colors: [isDark ? .black : .blue, isDark ? .gray : .white]),
         startPoint: .topLeading, endPoint: .bottomTrailing)
         .edgesIgnoringSafeArea(.all)
     	Button {
    		// self.doSomething() // Bỏ dòng này
    		isDark.toggle()
    	} label {
    		Text("Toggle")
    	}
    }
}
```

Và từ view con **BackgroundView** thì mình có thể vừa đọc vừa ghi được giá trị cho biến **isDark** ngoài view cha.

Túm lại `@Binding` thường được sử dụng khi bạn muốn chia sẻ dữ liệu giữa các thành phần khác nhau của giao diện người dùng trong SwiftUI.

Thank u for reading... :D



