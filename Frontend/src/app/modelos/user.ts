export class User {
  id?: string;
  username: string;
  email: string;
  name: string;
  foto: string;

  constructor(id: string, username: string, email: string, name: string, foto: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.foto = foto;
  }
}
