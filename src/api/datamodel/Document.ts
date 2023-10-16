import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export abstract class Document<I extends FirebaseFirestoreTypes.DocumentData> {
  /**
   * Collection path
   */
  protected readonly path: string;

  /**
   * Document id
   */
  protected readonly id: string;

  /**
   * Public constructor
   * @param path Document path
   * @param id Document id
   */
  public constructor(path: string, id: string) {
    this.path = path;
    this.id = id;
  }

  /**
   * Retrieves the document reference object
   */
  private get documentRef(): FirebaseFirestoreTypes.DocumentReference<I> {
    return firestore().collection<I>(this.path).doc(this.id);
  }

  /**
   * Retrieves the document's data
   */
  public async data(): Promise<I | undefined> {
    return (await this.documentRef.get()).data();
  }

  /**
   * Updates document's data
   * @param data new document data
   */
  public async update(data: Partial<FirebaseFirestoreTypes.SetValue<I>>): Promise<void> {
    this.documentRef.update(data);
  }
}
