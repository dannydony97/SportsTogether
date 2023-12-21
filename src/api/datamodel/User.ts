import {IUserDocument} from './types';
import {Document} from './Document';

export class UserDocument extends Document<IUserDocument> {
  /**
   * Path to the users collection
   */
  private static readonly collectionPath = 'users';

  /**
   * Private constructor
   * @param uid user UID
   */
  private constructor(uid: string, data: IUserDocument) {
    super(UserDocument.collectionPath, uid, data);
  }

  /**
   * Retrieves an {@link UserDocument} instance
   * @param uid uid of an user
   * @returns {@link UserDocument} instance
   */
  public static async get(uid: string): Promise<UserDocument> {
    const data = await Document.fetch<IUserDocument>(UserDocument.collectionPath, uid);
    const userDocument = new UserDocument(uid, data);
    return userDocument;
  }

  /**
   * Creates a new user document with its given uid
   * @param uid identifier of the authentificated user
   */
  public static async create(uid: string, data: IUserDocument): Promise<void> {
    await Document.add(UserDocument.collectionPath, uid, data);
  }
}
