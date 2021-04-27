import { Company } from "./Company";

/* Formation that will be used in the User class */
type Tfm =
  | {
    inst: string /* Institution */;
    area: string | undefined;
    degree: string | undefined;
  }
  | undefined;

// /* Set of Technologies that will be user in the User class */
type Ttech = Array<{
  name: string;
  layer: Array<string>;
  mexp: number /* Months of Experience */;
  committed: boolean;
}>;

// /* Set of Social Networks that will be user in the User class */
// type Tsn = Array<{
//   uid: string;
//   date: Date
// }>;

export interface User extends Company {
  name: string;
  isCompany: Boolean;
  email: string;
  uid: string;
  profileImgUrl: string;
  bio: string;
  location: string;
  latitude: number;
  longitude: number;
  profession: string;
  coverUrl: string;
  password: string /* Password */;
  formation: Tfm;
  techs: Ttech;
  connections: any[];
}
