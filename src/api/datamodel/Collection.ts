import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export class Collection<I extends FirebaseFirestoreTypes.DocumentData> {
  /**
   * Path of the collection
   */
  private readonly path: string;

  /**
   * Protected constructor
   * @param path path of the collection
   */
  protected constructor(path: string) {
    this.path = path;
  }

  /**
   * Retrieves data of a document from this collection with a specified identifier
   * @param id document identifier
   */
  public async getDataById(id: string): Promise<I> {
    const documentRef = firestore().collection<I>(this.path).doc(id);
    const documentData = (await documentRef.get()).data();
    if (!documentData) {
      throw new Error('Document data could not be retrieved');
    }
    return documentData;
  }

  /**
   * Retrieves all documents data of this collection
   * @returns all documents data of this collection
   */
  public async getData(): Promise<I[]> {
    const collectionRef = firestore().collection<I>(this.path);
    const querySnapshot = await collectionRef.get();
    return querySnapshot.docs.map(doc => doc.data());
  }

  /**
   * Adds a new document with specified data
   * @param data data of the document to be added
   */
  public async addData(data: I, id?: string): Promise<string> {
    if (!id) {
      const {id: identifier} = await firestore().collection(this.path).add(data);
      return identifier;
    } else {
      await firestore().collection(this.path).doc(id).set(data);
      return id;
    }
  }
}
