export class PasswordGeneratorUtil {
  static generatePassword(): string {
    const randomString = Math.random().toString(36).slice(-8);
    const timestamp = Date.now().toString().slice(-4); // Lấy 4 số cuối của timestamp
    return `${randomString}${timestamp}`;
  }
}