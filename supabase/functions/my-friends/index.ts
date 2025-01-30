import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { MyFriend, friendImages, friendNames } from '../_shared/friends.ts';

const generateRandomNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Deno.serve(_ => {
  const tempNames = [...friendNames];
  const tempImages = [...friendImages];
  const numberOfFriends: number = generateRandomNumberBetween(1, 3);

  const myFriends: MyFriend[] = [];

  for (let i = 0; i < numberOfFriends; i++) {
    const nameIndex = generateRandomNumberBetween(0, tempNames.length - 1);
    const tempName = tempNames[nameIndex];
    tempNames.splice(nameIndex, 1);

    const imageIndex = generateRandomNumberBetween(0, tempImages.length - 1);
    const tempImage = tempImages[imageIndex];
    tempImages.splice(imageIndex, 1);

    myFriends.push(new MyFriend(tempName, tempImage));
  }

  return new Response(JSON.stringify({ friends: myFriends }), { headers: { 'Content-Type': 'application/json' } });
});
