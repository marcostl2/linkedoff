/* Formation that will be used in the User class */
type Tfm =
  | {
      inst: string /* Institution */;
      area: string | undefined;
      degree: string | undefined;
    }
  | undefined;

// /* Set of Languages that will be user in the User class */
// type Tlang =
//   | Array<{
//       name: string;
//       level: string;
//     }>
//   | undefined;

// /* Set of Experiences that will be user in the User class */
// type Texp =
//   | Array<{
//       position: string;
//       company: string;
//       sd: Date /* Start Date */;
//       ed: Date /* End Date */;
//       present: boolean;
//     }>
//   | undefined;

// /* Set of Technologies that will be user in the User class */
type Ttech = Array<{
  name: string;
  layer: Array<string>;
  mexp: number /* Months of Experience */;
  committed: boolean;
}>;

// /* Set of Social Networks that will be user in the User class */
type Tsn = Array<{
  name: string;
  url: string;
}>;

export interface User {
  name: string;
  email: string;
  uid: string;
  profileImgUrl: string;
  bio: string;
  location: string;
  latitude: Number,
  longitude: Number,
  profession: string;
  coverUrl: string;
  password: string /* Password */;
  formation: Array<Tfm>;
  techs: Array<Ttech>;
  connections: Array<Tsn>;
}
