---
author: tungdevpro
pubDatetime: 2023-10-07T15:22:00Z
modDatetime: 2023-10-07T09:12:47.400Z
title: Golang - bản thân hiểu thế nào về PubSub 
slug: golang-hieu-the-nao-ve-pubsub
featured: true
draft: false
tags:
  - golang, pubsub
description: ""
lang: vi
---


Tháng mười trong cái tiết trời oi ả, à quên mát mẻ quá thích hợp cho một ly cafe đen đá
Vậy thôi chứ mình uống cafe muối :))

XamXam vậy thôi chứ, vào chủ đề chính nhé.


### Vấn đề

Đang chill vọc vạch thằng Gin để viết REST API. Thì mình occur problems là: từ **module A** được invoke sang **module B**, xong lại module B được invoke sang **module C** và trong **module C** lại call tới function của **module A** để handle.
(Các bạn đọc xong có lú không, chứ mình viết mà cũng thấy lú 😂😂)

Mình đang implement Clean Architecture theo một bài viết bên 200lab. Nếu đã sử dụng Clean Architecture, mà còn import lẫn lộn các module với nhau thì vi phạm cơ chế của Clean Architecture

#### Trường hợp cụ thể

Mình có một module **shop** và một module **shop_like**. 

```
+-- moduleA
|   +-- handler.go
+-- moduleB
|   +-- handler.go
```

Module **shop** có cấu trúc simple struct sẽ là như thế này

```go
type Shop struct {
  Id int `json:"id"`
  Name string `json:"name"`
  LikedCount int `json:"liked_count"`
}
```

Và có functional lấy ra danh sách shop và update liked_count

```go
func GetListShop() ([]entity.Shop, error) {
  items, err := db.GetListShop()
  if err != nil {
    return []entity.Shop{}, nil
  }

  return items, nil
}

func IncrementLikeCount() error {
	if err := db.UpdateLikeCount().Error; err != nil {
		return err
	}

	return nil
}

```

Field **LikedCount** sẽ là *tổng số* người yêu thích shop.

Còn module **shop_like** là là nơi lưu trữ các record người thích shop và cũng có cấu trúc struct như sau:

```go
type ShopLike struct {
  ShopId int `json:"shop_id"`
  UserId string `json:"user_id"`
  CreatedAt *time.Time `json:"created_at"`
}
```

Module **shop_like** sẽ có các functional như handle *like/unlike*.

```go
func CreateUserLike(ctx context.Context, userId, shopId int) (string, error) {
	db := impl.appCtx.GetDB()

	data := entity.ShopLike{
		ShopId: shopId,
		UserId: userId,
	}

	if err := db.Create(&data).Error; err != nil {
		return "", err
	}

        // Inject module shop_để update liked_count
        _ := impl.shopRepo.IncrementLikeCount(ctx, data.ShopId)

	return fmt.Sprintf("%d", data.ShopId), nil
}
```

Khi người dùng like một shop thì phải handle like để thêm mới record vô table **shop_like** trong database. Và để update tổng số liked_count của shop đó thì phải inject tính năng update like count của module **shop** vào module **shop_like**. Thì nó lại quay lại cái issue module A, B mình viết lú lú lúc nãy =)). Nếu giả sử scale lên, tách service riêng thì phải xử lý mệt 😕

Thì lúc này mình sẽ sử dụng tới **[Publish-subscibe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)** (PubSub). Về mặt lí thuyết sẽ hơi khó hiểu một xíu (mình sẽ có 1 bài viết chi tiết riêng về nó ở phần sau nhé).

Quay lại code, trước mắt mình cứ remove đoạn inject update total liked_count ở module **shop_like**. Và mình apply khai báo một đoạn code như sau trong function *CreateUserLike*:

```go
func CreateUserLike(ctx context.Context, userId, shopId int) (string, error) {
	db := impl.appCtx.GetDB()

	data := entity.ShopLike{
		ShopId: shopId,
		UserId: userId,
	}

	if err := db.Create(&data).Error; err != nil {
		return "", err
	}
        // _ := impl.shopRepo.IncrementLikeCount(ctx, data.ShopId) // Bỏ dòng này
        pubsub.Publish(ctx, "TopicUserLikeShop", pubsub.NewMessage(data))  // Và thêm dòng này

	return fmt.Sprintf("%d", data.ShopId), nil
}
```

Ở đây mình sẽ publish một topic có tên là **TopicUserLikeShop** cũng với message có data.

Ở ngoài file **main.go** mình chỉ cần khởi tạo mới một *pubsub* và subscribe với tên topic là **TopicUserLikeShop**. Chú ý tên **TopicUserLikeShop** phải giống với tên topic mà bạn pushlish thì khi chạy những thằng nào subscribe nó sẽ được handle.

```go
var pb pubsub.Pubsub = pblocal.NewPubSub()
sub, _ := pb.Subscribe(ctx, "TopicUserLikeShop")
go func() {
	for {
		msg := <-sub
		data := msg.Data().(*entity.ShopLike)
		err := impl.IncrementLikeCount(ctx, data.ShopId)
	}
}()
```

Đoạn code trên mình có sử dụng 1 goroutine và bên trong nó mình có một loop. Ở đây loop như một hàm streaming luôn luôn listen xem khi nào thằng **sub** được rút ra (Kiến thức về channel trong Go). Và cái message nhận được có data thì chính là data mình gửi từ bên publish qua.


### Kết

Mình cũng đang cải thiện viết văn cũng như giao tiếp, nên bài viết sẽ lủng cũng khá nhiều nhưng mình sẽ cố gắng khác phục nhanh nhất có thể... 🥳 Cám ơn mọi người đã bỏ chút thời gian đọc.


### References:
1. Ứng dụng Clean Architecture: [200lab.io/blog/ung-dung-clean-architecture-service-golang-rest-api](https://200lab.io/blog/ung-dung-clean-architecture-service-golang-rest-api/)