# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Account.destroy_all
Run.destroy_all

account1 = Account.create(username: "Justin", email: "j@j.com")
account1.runs.create(score: 0, words_typed: "great, job, dad",  words_seen: "one, two, great, job, dad")

words = ["arc", "rig",  "dip", "ray", "tag", "win", "wet", "hot", "mow", "arm", "bio", "low", "dry", "fix", "ask", "pea", "ash", "sun", "pig", "own", "pod", "may", "sit", "old", "fan", "sit", "rue", "fox", "ace", "leg", "ram", "sap", "lee", "woe", "sky"]

words.each do |word|
  WordList.create(word: word, length: word.length)
end
