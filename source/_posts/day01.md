---
title: '大模型开发学习Day01——大模型调用'
date: 2026-11-12 15:55:37
categories:
  - 技术
tags:
  - AI
  - 项目实践
---

示例使用的是中转站的 `gpt-5.6-luna`，模型名称以中转站实际支持的名称为准。

首先安装依赖
```bash
pip install langchain langchain-openai python-dotenv
```

创建一个 `.env` 文件，并与 Python 脚本放在同一个目录下
```ini
URL=""
API=""
MODEL_NAME="gpt-5.6-luna"
```
`URL` 和 `API` 请自行提供，分别填写中转站的 API 基础地址和 API 密钥。

接着先导入所需的包
```python
import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain_core.messages import HumanMessage
```

读取 `.env` 文件中的配置
```python
load_dotenv(Path(__file__).resolve().parent / ".env")

URL = os.getenv("URL")
API = os.getenv("API")
MODEL_NAME = os.getenv("MODEL_NAME")
```

`Path(__file__).resolve().parent` 获取当前 Python 脚本所在的目录，`/ ".env"` 将其与文件名拼接起来。

`load_dotenv()` 将文件中的配置加载到环境变量中，再通过 `os.getenv()` 读取。仅创建 `.env` 文件，并不会自动生成同名的 Python 变量。

创建实例对象
```python
MODEL = ChatOpenAI(
    model=MODEL_NAME,
    base_url=URL,
    api_key=API
)
```

`ChatOpenAI` 是用于调用模型的类，`MODEL` 是这个类的实例对象，保存了模型名称、接口地址和密钥等配置。

这里并没有把大模型加载到本地，也还没有让模型回答问题，而是准备好了调用远程模型的客户端。

接着设置系统提示词
```python
system_prompt = "你是一个智能分析助手，请从多方面解释用户问题"
```

系统提示词用于说明模型的角色和回答要求，后续用户输入则用于提出具体问题。

模型也可以直接回答问题
```
answer = model.invoke([
    ("system", system_prompt),
])
```
但是这只是一次无状态的推理，无法得知聊天的前后文内容，而agent是包含模型、工具和执行循环的程序

然后创建智能体
```python
agent = create_agent(
    model=MODEL,
    tools=[],
    system_prompt=system_prompt
)
```

`model` 指定智能体使用的模型，`tools` 指定可调用的工具，`system_prompt` 指定系统提示词。

这里的 `tools=[]` 表示没有配置工具，当前示例只进行模型问答。

让智能体回答问题
```python
user_input = input("请输入你的问题：")

result = agent.invoke(
    {"messages": [HumanMessage(content=user_input)]}
)
```

`input()` 获取用户在终端输入的文字，`HumanMessage` 将文字包装成一条用户消息，`messages` 则是传给智能体的消息列表。

`agent.invoke()` 执行一次智能体调用，等待处理完成后，将返回的状态保存到 `result` 中，其中包含消息列表。

打印回答结果
```python
answer = result["messages"][-1].content
print(answer)
```

`result["messages"]` 获取消息列表，`[-1]` 取出最后一条消息，`.content` 获取这条消息的内容。在这个简单示例中，最后一条消息就是模型的回答。

`.content` 不一定始终是字符串，也可能是内容块列表；本例按常见的纯文本回答展示。

将以上 Python 代码按顺序保存到 `main.py`，然后运行
```bash
python main.py
```