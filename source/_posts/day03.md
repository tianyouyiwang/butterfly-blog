---
title: '大模型开发学习Day3——短期记忆'
date: 2026-11-14 16:11:04
categories:
  - 技术
tags:
  - AI
  - 项目实践
---
大模型开发学习Day3——短期记忆
短期记忆让 Agent 在**同一条对话**中接上前文。例如第一轮告诉它“我喜欢吃鱼”，第二轮问“我喜欢什么”，它可以参考第一轮的消息回答。LangChain 使用 Checkpointer 保存对话状态，并通过 `thread_id` 区分不同对话。

导入包
```
from langchain.agents import create_agent
# 保存对话状态的包
from langgraph.checkpoint.memory import InMemorySaver
```

创建检查点保存器，并配置给智能体
```
checkpointer = InMemorySaver()
agent = create_agent(
	model=MODEL,
	tools=[],
	checkpointer=checkpointer,
)
```
这里只是创建对象，还未向模型发送请求，checkpointer的作用是让agent运行后保存这条对话的状态，其中包含消息历史；后续调用可以恢复同一条对话的状态

```
config = {"configurable": {"thread_id": "chat-1"}}
agent.invoke(
	{"messages": [{"role": "user", "content": "我喜欢吃鱼"}]},
	 config=config,
)
```
`thread_id="chat-1"` 相当于这条对话的编号；本轮消息会保存在它名下

```
result = agent.invoke(
	{"messages":[{"role": "user", "content":"我喜欢什么？"}]},
	config=config,
)
print(result["messages"][-1].content)
```
第二次调用使用相同的 `thread_id`，并继续使用同一个检查点保存器，因此智能体会读取之前的消息历史，再加入这次的问题交给模型。我们只需要传入本轮的新消息，不需要手动重复传入之前的对话

```
config2 = {
    "configurable": {"thread_id": "chat-2"}
}

result = agent.invoke(
    {"messages": [{"role": "user", "content": "我喜欢吃什么？"}]},
    config=config2,
)

print(result["messages"][-1].content)
```
如果把第二次的 `thread_id` 改成此前没有使用过的 `"chat-2"`，就会开启另一条对话，不会自动带上 `"chat-1"` 的消息历史
