// ==================== src/services/auth.service.ts ====================
import { User, IUser } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export class AuthService {
  async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ user: IUser; token: string }> {

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      name
    });

    const token = generateToken(user._id.toString());

    return { user, token };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id.toString());

    return { user, token };
  }

  async getProfile(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }
}