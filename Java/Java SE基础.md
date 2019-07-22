# javas SE 基础

### 前世今生

1995年有Sun Micosystems公司推出

起源于Sum公司的绿色项目（Green Project）

oka ==> Java 

网络传输

### 应用范围

-  从桌面办公动数据库

- 从个人PC到移动平台

- 从Java小应用程序到架构庞大的JavaEE企业级解决方案

- NASA的大型太空项目

  

### 三大平台

- Java SE - Java platform STandard Edition
  - Java的基础
- Java EE - Java platform Enterprise Edition
  - 以Java SE为基础， 定义了一系列的服务， api，协议
  - 使用于分布式，以web为基础的应用程序
- java ME - Java platform Micor Edition
  - 主要用于开发消费性电子产品或嵌入式系统中的应用程序， 现在基本上不用了



### helloWord

```java
// HelloWord.java
public class HelloWord {
	public static void main (String[] args) {
		System.out.print("HelloWord!");
	}
}
```

```shell
$ javac HelloWord.java

$ java HelloWord
HelloWord!
```

## 面向对象



static 静态的，生命周期不一样，生命周期是全局的，是类属性，可以用类访问 `类名.静态方法 || 类名.静态属性`

静态方法中只能调用静态属性和静态方法, 单类模式



### 单类模式

- 将构造方法私有，以便实现外部无法使用new进行实例化的效果

```java

public class StaticHello {
    private static StaticHello me = null;
    private StaticHello () {
        me = this;
    }
    public static StaticHello getInstance () {
        if (me = null) {
            me = new StaticHello();
        } 
        return me;
    }
    
    // 静态属性 / 方法是先于类的实例存在的
    public static int static_number = 1;
}
```

## JAVA I/O 系统



###### java.io.File 类



 







