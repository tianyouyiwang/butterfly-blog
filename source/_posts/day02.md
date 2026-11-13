---
title: '大模型开发学习Day02——RAG知识库'
date: 2026-11-13 15:34:37
categories:
  - 技术
tags:
  - AI
  - 项目实践
---

大模型开发学习Day02——RAG知识库

首先进行包导入
```
# langchain 文档对象
from langchain_core.documents import Document
# 向量库包
from langchain_core.vectorstores import InMemoryVectorStore
# 文本切分器包
from langchain_text_splitters import RecursiveCharacterTextSplitter
# embedding模型（文字->数字向量）和聊天模型
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
```

构建 word.txt，内容随便写入

先读取文档
```
with open("word.txt", encoding="utf-8") as f:
	text = f.read()
```

接下来创建对象
```
docs = [
	Document(
		page_content=text,
		metadata={"source": "word.txt"}
	)
]
```

然后对文档内容进行切分
```
splitter = RecursiveCharacterTextSplitter(
	chunk_size=80,    # 每块的字符上限
	chunk_overlap=10, # 邻块重复的字符数
)
# 返回 list[Document] 对象
chunks = splitter.split_documents(docs)
```

建库
```
# 指定向量化模型
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
# 创建向量库
store = InMemoryVectorStore(embeddings)
# 添加文档
store.add_documents(chunks)
```

检索
```
# 创建检索器对象
retriever = store.as_retriever(search_kwargs={"k": 2}) # k表示取最相关的几项
question = "咖啡豆是怎么处理得到的"
found_docs = retriever.invoke(question)
# 把检索到的文字拼接起来
context = "\n".join(doc.page_content for doc in found_docs)
# `doc.page_content`指每个文档的文字。
```

最后让模型回答
```
MODEL = ChatOpenAI(
    model=MODEL_NAME,
    base_url=URL,
    api_key=API
)
answer = MODEL.invoke([
	("system", "只根据提供的论文片段回答；片段没有答案时明确说不知道。"),
	("human", f"论文片段：\n{context}\n\n问题：{question}"),
])
print(answer)
```


