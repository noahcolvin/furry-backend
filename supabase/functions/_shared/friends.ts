import 'https://deno.land/x/dotenv@v3.2.2/load.ts';

const storageUrl = Deno.env.get('STORAGE_URL') ?? '';

export class MyFriend {
  name: string;
  image: string;

  constructor(name: string, image: string) {
    this.name = name;
    this.image = image;
  }
}

export const friendImages: string[] = [
  storageUrl + '/furry-public/pets/pet1.jpg',
  storageUrl + '/furry-public/pets/pet2.jpg',
  storageUrl + '/furry-public/pets/pet3.jpg',
  storageUrl + '/furry-public/pets/pet4.jpg',
  storageUrl + '/furry-public/pets/pet5.jpg',
  storageUrl + '/furry-public/pets/pet6.jpg',
  storageUrl + '/furry-public/pets/pet7.jpg',
  storageUrl + '/furry-public/pets/pet8.jpg',
];

export const friendNames: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank'];
