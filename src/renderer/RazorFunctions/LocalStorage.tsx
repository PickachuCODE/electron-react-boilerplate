import { LocalDataSchema } from "Schema/RazorDateSchema";

function GetSavedValue():LocalDataSchema {
    let savedValue: LocalDataSchema = JSON.parse(localStorage.getItem('RazorLocalStorage') || '{}');
    return savedValue;
}
function StoreData(dataInfo: {}): void {
    localStorage.setItem('RazorLocalStorage', JSON.stringify(dataInfo));
}
function objectIsEmpty(obj:any): Boolean {
  for (const property in obj) {
    return false;
  }
  return true;
}
export { StoreData, GetSavedValue, objectIsEmpty };
