---
title: '大模型开发学习Day4——跨对话记忆'
date: 2026-11-14 16:27:11
categories:
  - 技术
tags:
  - AI
  - 项目实践
---

大模型开发学习Day4——跨对话记忆

```
from langgraph.store.memory import InMemoryStore

store = InMemoryStore()
```
Store 用来保存选择的用户信息，这里同样是内存版，重启后会消失
```
namespace = ("users", "user-1", "preferences")
key = "like"

store.put(namespace, key, {"value": "fish"})
```
namespace指明用户名称，key指明偏好类别，put表示执行写入

```
item = store.get(namespace, key)
if item is not None:
	print(item.value["value"])
```
`get(...)` 返回一个存储项对象，没找到则返回 `None`。所以先检查，再通过 `.value` 取得保存的字典。这样就可以提取出偏好

更新并获取
```
store.put(namespace, key, {"value": "beef"})
item = store.get(namespace, key)
preference = item.value["value"] if item is not None else "未记录"
```

应用
```
answer = model.invoke(
	[
		("system", f"已记录用户的爱好，喜欢吃{preference}。回答时参考这个信息。"),
		("human", "你知道我喜欢吃什么吗？")
	]
)
print(answer.content)
```