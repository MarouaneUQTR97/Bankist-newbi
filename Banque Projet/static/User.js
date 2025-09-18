export default class Client {
  id;
  _transctions = [];
  Status = "active";
  constructor(
    firstName,
    lasName,
    dateOfBirth,
    email,
    passwd,
    gender = "other"
  ) {
    this._firstName = this.checkName(firstName);
    this._lasName = this.checkName(lasName);
    this._dateOfBirth = this.checkDate(new Date(dateOfBirth));
    this._email = this.checkEmail(email);
    this._passwd = this.checkPasswd(passwd);
    this.gender = gender;
  }

  checkName = function (arg) {
    if (
      typeof arg !== "string" ||
      arg.match(/\s/) ||
      arg.length === 0 ||
      arg.match(/[0-9]/)
    ) {
      throw Error(`Entry ${arg} must be a valid name`);
    }
    return arg;
  };

  checkEmail = function (eml) {
    if (
      eml.match(/[@,.]/g)?.length === 2 &&
      Boolean(eml.match(/\s/)) === false
    ) {
      return (this._email = eml);
    }
    throw Error("Invalid Email");
  };

  checkPasswd = function (pwd) {
    if (Boolean(pwd.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g))) {
      return (this._passwd = pwd);
    }
    throw new Error(
      "Your password must include at least 8 characters and at least 1 number"
    );
  };

  checkDate = function (dob) {
    if (dob.getFullYear() > 2005) {
      throw Error("Must be over 18");
    }
    return (this._dateOfBirth = `${dob.getFullYear()}-${
      dob.getMonth() + 1
    }-${dob.getDate()}`);
  };

  get firstName() {
    return this._firstName;
  }

  get lasName() {
    return this._lasName;
  }

  get dateOfBirth() {
    return this._dateOfBirth;
  }

  get email() {
    return this._email;
  }

  get passwd() {
    return this._passwd;
  }
}
