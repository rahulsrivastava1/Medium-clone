const { DB_USERNAME, DB_PASSWORD } = process.env;

export const connection_string =
  "mongodb+srv://" +
  DB_USERNAME +
  ":" +
  DB_PASSWORD +
  "@cluster0.lvdlg9h.mongodb.net/blog?retryWrites=true&w=majority";
