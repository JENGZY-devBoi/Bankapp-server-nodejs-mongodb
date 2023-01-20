# Bankapp-server-nodejs-mongodb

## documents in MongoDB
| field | type value |
| --- | --- |
| name | String |
| email | String |
| password | String |
| account | Object |
| account.accountId | String |
| account.balance | Number |
| account.transaction | Array |
| account.transaction.datetime | Date |
| account.transaction.action | String ["deposit", "withdraw", "transfer", "recieve"] |
| account.transaction.from | String [email] |
| account.transaction.to | String [email] |
| account.transaction.amount | Number |
| account.transaction.remain | Number |
