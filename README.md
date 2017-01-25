# Worona Dashboard Development

## Installation

Clone this repo or [download the zip file from Github](https://github.com/worona/worona-dashboard/archive/master.zip).

```bash
git clone https://github.com/worona/worona-dashboard.git
cd worona-dashboard
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
npm install # do this first to install recuersive-install
npm run install:all
```

## Development

Run the dashboard client.

```bash
cd client
npm start
```

Open another terminal and run the tests watcher.

```bash
npm test
```

Open another terminal and run the dashboard server.

```bash
cd server
npm start
```

---


## Error tracking 

<a href="http://www.rollbar.com"><img alt="Error Tracking" src="https://d26gfdfi90p7cf.cloudfront.net/rollbar-badge.144534.o.png" width="108"></a>
