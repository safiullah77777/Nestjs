import * as bcrypt from 'bcrypt';
export async function hashPassword(password: string): Promise<any> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
