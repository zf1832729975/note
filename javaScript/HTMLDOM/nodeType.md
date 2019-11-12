# nodeType

## Node Types

文档、元素、属性以及 HTML 或 XML 文档的其他方面拥有不同的节点类型。

存在 12 种不同的节点类型，其中可能会有不同节点类型的子节点：

| 节点类型 | 描述                  | 子节点                                              |                                                              |
| :------- | :-------------------- | :-------------------------------------------------- | ------------------------------------------------------------ |
| 1        | Element               | 代表元素                                            | Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference |
| 2        | Attr                  | 代表属性                                            | Text, EntityReference                                        |
| 3        | Text                  | 代表元素或属性中的文本内容。                        | None                                                         |
| 4        | CDATASection          | 代表文档中的 CDATA 部分（不会由解析器解析的文本）。 | None                                                         |
| 5        | EntityReference       | 代表实体引用。                                      | Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference |
| 6        | Entity                | 代表实体。                                          | Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference |
| 7        | ProcessingInstruction | 代表处理指令。                                      | None                                                         |
| 8        | Comment               | 代表注释。                                          | None                                                         |
| 9        | Document              | 代表整个文档（DOM 树的根节点）。                    | Element, ProcessingInstruction, Comment, DocumentType        |
| 10       | DocumentType          | 向为文档定义的实体提供接口                          | None                                                         |
| 11       | DocumentFragment      | 代表轻量级的 Document 对象，能够容纳文档的某个部分  | Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference |
| 12       | Notation              | 代表 DTD 中声明的符号。                             | None                                                         |