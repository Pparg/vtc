import argon2  from "argon2"

export async function hashPassword(password) {
  try {
    let hashedPassword = await argon2.hash(password)
    return hashedPassword
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe:', error)
    throw new Error('Erreur du hachage du mot de passe')
  }
}

export async function comparePassword(input, hashedPassword) {
  try {
    let match = await argon2.verify(hashedPassword, input)
    return match
  } catch (error) {
    console.error('Erreur lors de la comparaison du mot de passe:', error);
    throw new Error('Erreur lors de la comparaison du mot de passe');
  }
}
