const words = require('./words');

class LevenshteinTrie {
  constructor() {
    this.root = {};
  }
  add(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = {};

      node = node[char];
    }
    node['$'] = word;
  }
  search(word, k) {
    const dfs = (node, i, e) => {
      if (e < 0) return [];

      const res = [];

      if (i === word.length) {
        if (node['$']) res.push(node['$']);
        if (e) {
          for (const [k, v] of Object.entries(node)) {
            if (k !== '$') res.push(...dfs(v, i, e - 1));
          }
        }
      } else {
        for (const [k, v] of Object.entries(node)) {
          if (k === word[i]) res.push(...dfs(v, i + 1, e));
          else {
            res.push(...dfs(v, i + 1, e - 1));
            res.push(...dfs(v, i, e - 1));
          }
        }
        res.push(...dfs(node, i + 1, e - 1));
      }
      return res;
    };
    return Array.from(new Set(dfs(this.root, 0, k)));
  }
}

const lev = new LevenshteinTrie();
for (const word of words) lev.add(word);
console.log(lev.search('anana', 2));
