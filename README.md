# Worona Dashboard Development

## Installation

Clone this repo or [download the zip file from Github](https://github.com/worona/worona/archive/master.zip).

```bash
git clone https://github.com/worona/worona.git
cd worona
```

----

[**Install Node**](https://nodejs.org/en/) if you haven't installed it yet. We recommend v4.

----

[**Install Meteor**](https://www.meteor.com/install) if you haven't installed it yet:

```bash
curl https://install.meteor.com/ | sh
```

----

Run `npm run install:all` to install all dependencies. It may take quite a while. Don't despair.

```bash
npm run install:all
```

## Development

Run the dashboard client.

```bash
cd dashboard/client
npm start
```

Open another terminal and run the tests watcher.

```bash
npm test
```

Open another terminal and run the dashboard server.

```bash
cd dahsboard/server
npm start
```

---
