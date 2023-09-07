export class MyCustomError extends Error {
  public code;
  constructor(message: string, code: number) {
    super(message);
    this.name = '自定义输出消息';
    this.code = code;
    // 可以添加其他自定义属性
  }
}
