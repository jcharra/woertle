import re
import sys
import json

length = int(sys.argv[1]) if len(sys.argv) > 1 else 5
words = []

with open("dict.txt") as f:
    pattern = re.compile("[a-z]{%s}" % length)
    for w in f.readlines():
        word = w.strip().lower()
        if len(word) == length and re.match(pattern, word):
            words.append(word)

with open(f"length_{length}.json", "w") as fout:
    json.dump(words, fout)
        