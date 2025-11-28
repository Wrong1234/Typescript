import { User } from './auth.model';
import { 
  IAuthResponse, 
  IRegisterRequest, 
  ILoginRequest,
  IUserDocument 
} from './auth.interface';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/appError';

/**
 * Authentication Service
 * Handles all authentication business logic
 */
export class AuthService {
  
  /**
   * Register a new user
   * @param data - Registration data (email, password, name)
   * @returns User object and JWT token
   * @throws AppError if email already exists
   */
  async register(data: IRegisterRequest): Promise<IAuthResponse> {
    const { email, password, name } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name
    });

    // Generate JWT token
    const token = generateToken(user._id.toString());

    return { user, token };
  }

  /**
   * Login existing user
   * @param data - Login credentials (email, password)
   * @returns User object and JWT token
   * @throws AppError if credentials are invalid
   */
  async login(data: ILoginRequest): Promise<IAuthResponse> {
    const { email, password } = data;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    // Validate user and password
    if (!user || !(await comparePassword(password, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Remove password from response
    user.password = undefined as any;

    return { user, token };
  }

  /**
   * Get user profile by ID
   * @param userId - User ID
   * @returns User document
   * @throws AppError if user not found
   */
  async getProfile(userId: string): Promise<IUserDocument> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user profile
   * @param userId - User ID
   * @param updates - Fields to update
   * @returns Updated user document
   */
  async updateProfile(
    userId: string, 
    updates: Partial<Pick<IUserDocument, 'name' | 'email'>>
  ): Promise<IUserDocument> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Delete user account
   * @param userId - User ID
   */
  async deleteAccount(userId: string): Promise<void> {
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      throw new AppError('User not found', 404);
    }
  }
}