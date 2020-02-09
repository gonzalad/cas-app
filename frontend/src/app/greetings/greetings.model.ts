export class Greetings {

  public message: string;

  constructor(greetings?: Greetings) {
    if (greetings) {
      Object.assign(this, greetings);
    }
  }
}
