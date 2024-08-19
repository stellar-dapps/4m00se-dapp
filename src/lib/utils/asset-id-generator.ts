const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const defaultLength = 12;
const defaultPrefix = '4m00se';

/** Util to generate "kinda" unique ids for Stellar assets
 *  TODO come up with something better */
export function generateRandomAssetId(
  length = defaultLength,
  characters = defaultCharacters,
  prefix = defaultPrefix
): string {
  let result = prefix;

  const charactersLength = characters.length;
  const resultingIdLength = length - prefix.length;

  for (let i = 0; i < resultingIdLength; i++) {
    result += `${characters.charAt(Math.floor(Math.random() * charactersLength))}`;
  }

  return result;
}
