import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export class Document<I extends FirebaseFirestoreTypes.DocumentData> {
  /**
   * Collection path
   */
  protected readonly path: string;

  /**
   * Document id
   */
  protected readonly id: string;

  /**
   * Document data
   */
  public data: I;

  /**
   * Public constructor
   * @param path Document path
   * @param id Document id
   */
  protected constructor(path: string, id: string, data: I) {
    this.path = path;
    this.id = id;
    this.data = data;
  }

  /**
   * Fetches the document data
   * @param path path of the document
   * @param id id of the document
   * @returns document's data
   */
  protected static async fetch<I extends FirebaseFirestoreTypes.DocumentData>(path: string, id: string): Promise<I> {
    const documentRef = firestore().collection<I>(path).doc(id);
    const documentData = (await documentRef.get()).data();
    if (!documentData) {
      throw new Error('Document data could not be retrieved');
    }
    return documentData;
  }

  /**
   * Updates document's data
   * @param data new document data
   */
  protected async update(data: Partial<FirebaseFirestoreTypes.SetValue<I>>): Promise<void> {
    const documentRef = firestore().collection<I>(this.path).doc(this.id);
    await documentRef.update(data);
    this.data = {
      ...this.data,
      ...data,
    };
  }

  /**
   * Adds a new document with the given data
   * @param id id of the document
   * @param data data of the document
   */
  protected static async add<I extends FirebaseFirestoreTypes.DocumentData>(
    path: string,
    id: string,
    data: I,
  ): Promise<void> {
    await firestore().collection(path).doc(id).set(data);
  }
}
