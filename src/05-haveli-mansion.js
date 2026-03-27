/**
 * 🏰 Purani Haveli ka Security System - Encapsulation: Private Fields (#)
 */
export class HaveliSecurity {
  #passcode;
  #residents;
  #accessLog;
  #maxResidents;

  constructor(haveliName, passcode, maxResidents) {
    this.haveliName = haveliName;
    this.#passcode = passcode;
    this.#residents = [];
    this.#accessLog = [];
    this.#maxResidents = maxResidents;
  }

  addResident(name, role, passcode) {
    if (passcode !== this.#passcode)
      return { success: false, message: "Galat passcode!" };
    const validRoles = ["malik", "naukar", "mehmaan"];
    if (!validRoles.includes(role))
      return { success: false, message: "Invalid role!" };
    const exists = this.#residents.some((r) => r.name === name);
    if (exists) return { success: false, message: "Already a resident!" };
    if (this.#residents.length >= this.#maxResidents)
      return { success: false, message: "Haveli full hai!" };
    this.#residents.push({ name, role, addedAt: new Date().toISOString() });
    return { success: true, message: `${name} ab haveli ka ${role} hai!` };
  }

  removeResident(name, passcode) {
    if (passcode !== this.#passcode)
      return { success: false, message: "Galat passcode!" };
    const idx = this.#residents.findIndex((r) => r.name === name);
    if (idx === -1) return { success: false, message: "Resident nahi mila!" };
    this.#residents.splice(idx, 1);
    return { success: true, message: `${name} ko haveli se nikal diya!` };
  }

  verifyAccess(name) {
    const found = this.#residents.some((r) => r.name === name);
    const logEntry = { name, time: new Date().toISOString(), allowed: found };
    this.#accessLog.push(logEntry);
    if (found) {
      return { allowed: true, message: `Swagat hai ${name}!` };
    }
    return { allowed: false, message: "Aapka entry allowed nahi hai!" };
  }

  getAccessLog(passcode) {
    if (passcode !== this.#passcode) return null;
    return [...this.#accessLog];
  }

  changePasscode(oldPasscode, newPasscode) {
    if (oldPasscode !== this.#passcode)
      return { success: false, message: "Purana passcode galat hai!" };
    if (newPasscode.length < 4)
      return { success: false, message: "Naya passcode bahut chhota hai!" };
    this.#passcode = newPasscode;
    return { success: true, message: "Passcode badal diya!" };
  }

  getResidentCount() {
    return this.#residents.length;
  }

  isResident(name) {
    return this.#residents.some((r) => r.name === name);
  }
}
