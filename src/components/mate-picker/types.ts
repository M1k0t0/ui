/** A chosen person: one row with a role Select and a remove action. `note` is a short marker shown beside the name. */
export interface MatePickerRow {
  id: string
  label: string
  role: string
  note?: string
}

/** One option of the role Select. */
export interface MatePickerRole {
  value: string
  label: string
}

/** A search result. `hint` is quiet text on the right (an id tail, "already a member"), `note` a marker chip beside the name. */
export interface MatePickerCandidate {
  id: string
  label: string
  hint?: string
  note?: string
}
