import { Document, Types } from 'mongoose';

/**
 * User Interface - Base user properties
 */
export interface IUser  {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

/**
 * User Document Interface - Extends Mongoose Document
 * Fixed: _id should be Types.ObjectId, not string
 */
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

/**
 * Authentication Response Interface
 */
export interface IAuthResponse {
  user: IUserDocument;
  token: string;
}

/**
 * Registration Request Interface
 */
export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * Login Request Interface
 */
export interface ILoginRequest {
  email: string;
  password: string;
}