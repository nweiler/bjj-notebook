// faux database

var entries = exports.entries = [];

entries.push({ name: 'Tobi', id: 0 });
entries.push({ name: 'Loki', id: 1 });
entries.push({ name: 'Jane', id: 2 });
entries.push({ name: 'Raul', id: 3 });

var users = exports.users = [];

users.push({ name: 'TJ', entries: [entries[0], entries[1], entries[2]], id: 0  });
users.push({ name: 'Guillermo', entries: [entries[3]], id: 1 });
users.push({ name: 'Nathan', entries: [], id: 2 });
