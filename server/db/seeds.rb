# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Account.destroy_all
Run.destroy_all
WordBank.destroy_all

account1 = Account.create(username: "Justin", email: "j@j.com")
account1.runs.create(score: 0, words_typed: "great, job, dad",  words_seen: "one, two, great, job, dad")

account2 = Account.create(username: "Ren", email: "r@r.com")
account2.runs.create(score: -1, words_typed: "great, job, dad",  words_seen: "mule, duck, great, woah, dad")

account3 = Account.create(username: "Krista", email: "k@k.com")
account3.runs.create(score: 3, words_typed: "great, job, dad",  words_seen: "paint, sky, blue, great, job, dad")

words = ["arc", "rig",  "dip", "ray", "tag", "win", "wet", "hot", "mow", "arm", "bio", "low", "dry", "fix", "ask", "pea", "ash", "sun", "pig", "own", "pod", "may", "sit", "old", "fan", "sit", "rue", "fox", "ace", "leg", "ram", "sap", "lee", "woe", "sky"]

words.each do |word|
  WordBank.create(word: word, length: word.length)
end
