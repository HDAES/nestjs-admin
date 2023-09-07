export class CustomError extends Error {
  public code;
  constructor(message?: string, code?: number) {
    super(message);
    this.message = message;
    this.code = code;
    // 可以添加其他自定义属性
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setCode(code: number) {
    this.code = code;
    return this;
  }
}
