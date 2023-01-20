# Bankapp-server-nodejs-mongodb

## API 
### Authentication
| func | request url | type | body | params |
| --- | --- | --- | --- | --- | 
| checkUser | /api/v1/user | POST | - | - |
| signup | /api/v1/user/signup | POST | [name, email, password, account] | - |
| login | /api/v1/user/login | POST | [email, password] | - |
| logout | /api/v1/user/logout | POST | - | - |

### User
| func | request url | type | body | params |
| --- | --- | --- | --- | --- | 
| getAllUser | /api/v1/user/ | GET | - | - |
| getUserById | /api/v1/user/:id | GET | - | id |

### Transaction
| func | request url | type | body | params |
| --- | --- | --- | --- | --- | 
| deposit | /api/v1/transaction/deposit | PUT | [id, action, amount] | - |
| withdraw | /api/v1/transactoin/withdraw | PUT | [id, action, amount] | - |
| transfer | /api/v1/transactoin/transfer | PUT | [id, action, amount, email, to] | - |
| getRecieves | /api/v1/transactoin/recieves | POST | id | - |
| getTransfers | /api/v1/transactoin/transfer | POST | id | - |


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
