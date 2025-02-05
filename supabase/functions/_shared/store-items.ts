import 'https://deno.land/x/dotenv@v3.2.2/load.ts';

const storageUrl = Deno.env.get('STORAGE_URL') ?? '';

export class StoreItem {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public rating: number,
    public image: string,
    public about: string[],
    public categories: string[] = []
  ) {}
}

export const storeItems: StoreItem[] = [
  new StoreItem(
    '1',
    'Flutter Bird Food',
    59.99,
    'All natural bird food made with the finest seeds and nuts.',
    4.5,
    storageUrl + '/furry-public/store-items/bird_food.jpg',
    ['Safe for all bird types', 'No artificial flavors', 'No preservatives'],
    ['bird', 'food']
  ),
  new StoreItem(
    '2',
    'Meow Master Cat Food',
    19.99,
    'All natural cat food made with exclusive fish and vegetables.',
    3.2,
    storageUrl + '/furry-public/store-items/cat_food_can.jpg',
    ['Made in the UK', 'No mice bits', 'Mother approved'],
    ['cat', 'food']
  ),
  new StoreItem(
    '3',
    'Cities Cat Tower',
    74.99,
    'A cat tower that is perfect for any cat to play and sleep on.',
    5,
    storageUrl + '/furry-public/store-items/cat_tower.jpg',
    ['Real carpet', 'No assembly required', 'Made in China'],
    ['cat', 'toy']
  ),
  new StoreItem(
    '4',
    'Mr Mouse Cat Toy',
    9.99,
    'Realistic mouse toy that will keep your cat entertained for hours.',
    2.7,
    storageUrl + '/furry-public/store-items/cat_toy.jpg',
    ['Catnip sold separately', 'No real mice', 'No batteries required'],
    ['cat', 'toy']
  ),
  new StoreItem(
    '5',
    'Bluz Dog Toy',
    14.99,
    'A chew toy that is perfect for any dog to play and chew on.',
    4.5,
    storageUrl + '/furry-public/store-items/dog_chew_toy.jpg',
    ['Made for all dog sizes', 'For tough chewers', 'Made in China'],
    ['dog', 'toy']
  ),
  new StoreItem(
    '6',
    "Sam's Natural Dog Food",
    24.99,
    'Made with real chicken and vegetables, this dog food is perfect for any dog.',
    4.2,
    storageUrl + '/furry-public/store-items/dog_food_can.jpg',
    ['Made in the USA', 'No artificial flavors', 'No preservatives'],
    ['dog', 'food']
  ),
  new StoreItem(
    '7',
    'Good Boy Dog Food',
    59.99,
    'All-natural dog food made with the finest chicken and vegetables.',
    4.5,
    storageUrl + '/furry-public/store-items/dog_food.jpg',
    ['Made in the USA', 'No artificial flavors', 'No preservatives'],
    ['dog', 'food']
  ),
  new StoreItem(
    '8',
    'Right Stufz Dog Toy',
    13.99,
    'Stuffed toy that is perfect for any dog to play and chew.',
    4.0,
    storageUrl + '/furry-public/store-items/dog_stuffed_toy.jpg',
    ['Made for all dog sizes', 'Squeaker', 'Made in Mexico'],
    ['dog', 'toy']
  ),
  new StoreItem(
    '9',
    'Deep Sea Fish Tank',
    129.99,
    '50-gallon fish tank that is perfect for any fish to swim in.',
    3.5,
    storageUrl + '/furry-public/store-items/fish_tank.jpg',
    ['Made in Canada', 'No fish included', 'No water included'],
    ['fish', 'toy']
  ),
  new StoreItem(
    '10',
    'Ballz Hamster Toy',
    19.99,
    'A ball that is perfect for any hamster to play and run in.',
    2.5,
    storageUrl + '/furry-public/store-items/hamster_ball.jpg',
    ['Made for all hamster sizes', 'No real hamsters', 'Do not use in water'],
    ['hamster', 'toy']
  ),
  new StoreItem(
    '11',
    'Munchie Hamster Food',
    19.99,
    'All natural hamster food made with the finest seeds and nuts.',
    4.1,
    storageUrl + '/furry-public/store-items/hamster_food.jpg',
    ['Safe for all hamster types', 'No artificial flavors', 'No preservatives'],
    ['hamster', 'food']
  ),
];
