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
account1.runs.create(score: 12, words_typed: "great, job, dad",  words_seen: "one, two, great, job, dad")

account2 = Account.create(username: "Ren", email: "r@r.com")
account2.runs.create(score: -1, words_typed: "great, job, dad",  words_seen: "mule, duck, great, woah, dad")

account3 = Account.create(username: "Krista", email: "k@k.com")
account3.runs.create(score: 14, words_typed: "great, job, dad",  words_seen: "paint, sky, blue, great, job, dad")

def add_words_to_database(words_arr)
  words_arr.each do |item|
    WordBank.create(word: item['word'], length: item['word'].length)
  end
end

three_letter_words = JSON.parse(RestClient.get('https://api.datamuse.com/words/?sp=???&max=999'))
four_letter_words = JSON.parse(RestClient.get('https://api.datamuse.com/words/?sp=????&max=999'))
five_letter_words = JSON.parse(RestClient.get('https://api.datamuse.com/words/?sp=?????&max=999'))
six_letter_words = JSON.parse(RestClient.get('https://api.datamuse.com/words/?sp=??????&max=999'))
seven_letter_words = JSON.parse(RestClient.get('https://api.datamuse.com/words/?sp=???????&max=999'))

add_words_to_database(three_letter_words)
add_words_to_database(four_letter_words)
add_words_to_database(five_letter_words)
add_words_to_database(six_letter_words)
add_words_to_database(seven_letter_words)

